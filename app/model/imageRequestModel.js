// class imageRequestModel {
//     constructor(id, imageName, status, facesDetected, additionalInfo) {
//       this.id = id;
//       this.imageName = imageName;
//       this.status = status;
//       this.facesDetected = facesDetected;
//       this.additionalInfo = additionalInfo;
//     }
//   }
  
//   // In-memory storage for images processed
//   const imageRequests = [];
  
//   module.exports = { imageRequests, imageRequestModel };
  
// models/Request.js

let requests = []; // Store requests in memory

class Request {
  constructor(name, status, imageBuffer, numFaces) {
    this.name = name;
    this.status = status;
    this.imageBuffer = imageBuffer;
    this.numFaces = numFaces;
  }

  static create(name, status, imageBuffer, numFaces) {
    const request = new Request(name, status, imageBuffer, numFaces);
    requests.push(request);
    return request;
  }

  static getAllRequests() {
    return requests;
  }
}

module.exports = Request;
