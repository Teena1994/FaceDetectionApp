const crypto = require('crypto');
const Request = require('../model/imageRequestModel');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

var requests = []; // Store image upload requests in memory


async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('model/face-detection-models'); // Specify the path to your models directory
  await faceapi.nets.faceLandmark68Net.loadFromDisk('model/face-detection-models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('model/face-detection-models');
}

const createRequest = async (req, res) => {
  try {
    // Call the loadModels function to load the models when the application starts
    await loadModels();

    const { name, user } = req.body;

    if (!req.file) {
      return res.status(400).send('Please upload an image.');
    } else {

      //Image id to store in memory
      const uniqueId = crypto.randomBytes(16).toString('hex');

      //Create a new image upload request 
      const request = new Request(uniqueId, name, 'enqueued', req.file.buffer, 0, new Date(), user);

      requests.push(request);

      res.status(200).send({ success: true, requests: requests });


      const input = await canvas.loadImage(req.file.buffer);

      //Call api to count the number of faces
      const detections = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
      const numOfFaces = detections.length;

      request.status = 'ready';
      request.numFaces = numOfFaces;

      const requestToUpdate = requests.find((u) => u.id === uniqueId);

      if (requestToUpdate) {
        // Create a new object with the updated data
        requests = requests.map(request =>
          request.id === requestToUpdate ? { ...request, ...requests } : request
        );

      } else {
        console.log('User not found');
      }

    }
  } catch (error) {
    console.error(error);
    res.status(400).send('An error occurred.');
  }
};

const listRequests = (req, res) => {
  try {
    const { email } = req.query;
    if (email === process.env.ADMIN_EMAIL) {
      console.log('Admin User!');
      res.status(200).send({ 'success': true, 'requestList': requests });
    } else {
      const requestList = requests.filter((request) => (request.user === email));
      res.status(200).send({ 'success': true, 'requestList': requestList });
    }

  } catch (error) {
    console.error(error);
    res.status(400).send('An error occurred.');
  }
};

module.exports = { createRequest, listRequests };

