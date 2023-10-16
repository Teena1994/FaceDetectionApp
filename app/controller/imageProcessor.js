const crypto = require('crypto');
const Request = require('../model/imageRequestModel');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

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
      const request = new Request(uniqueId, name, 'enqueued', req.file.buffer, 0);

      const input = await canvas.loadImage(req.file.buffer);
      const detections = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
      const numFaces = detections.length;

      request.status = 'ready';
      request.numFaces = numFaces;

      res.status(200).send({success:true, count: numFaces });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
};

const listRequests = (req, res) => {
  const requests = Request.getAllRequests();
  res.render('request-list', { requests });
};

module.exports = createRequest;