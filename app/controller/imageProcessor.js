const crypto = require('crypto');
const Request = require('../model/imageRequestModel');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

var requests = []; // Store requests in memory


async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('model/face-detection-models'); // Specify the path to your models directory
  await faceapi.nets.faceLandmark68Net.loadFromDisk('model/face-detection-models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('model/face-detection-models');
}


const createRequest = async (req, res) => {
  try {
    // Call the loadModels function to load the models when the application starts
    await loadModels();

    const { name } = req.body;

    if (!req.file) {
      return res.status(400).send('Please upload an image.');
    } else {
      const uniqueId = crypto.randomBytes(16).toString('hex');
      const request = new Request(uniqueId, name, 'enqueued', req.file.buffer, 0, 10);

      requests.push(request);

      res.status(200).send({success:true, requests: requests });


      const input = await canvas.loadImage(req.file.buffer);

      setInterval(() => {
        if (request.status === 'progress') {
          if (request.progress < 70) {
            request.progress += 10;
          }else{
            clearInterval();
          }
        }
      }, 1000);

      const detections = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
      const numFaces = detections.length;

      request.status = 'ready';
      request.numFaces = numFaces;
      request.progress = 100;

      const requestToUpdate = requests.find((u) => u.id === uniqueId);

      if (requestToUpdate) {
        // Create a new object with the updated data
        requests = requests.map(request =>
          request.id === requestToUpdate ? { ...request, ...requests } : request
        );
        console.log(requests);
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
  try{
    console.log(requests);
    res.status(200).send({success:true, requestList : requests });
  } catch (error) {
    console.error(error);
    res.status(400).send('An error occurred.');
  }
};

module.exports = { createRequest, listRequests };

