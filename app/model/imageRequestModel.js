let requests = []; // Store requests in memory

class Request {
  constructor(id, name, status, imageBuffer, numFaces) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.imageBuffer = imageBuffer;
    this.numFaces = numFaces;
  }

  static create(id, name, status, imageBuffer, numFaces) {
    const request = new Request(id, name, status, imageBuffer, numFaces);
    requests.push(request);
    return request;
  }

  static getAllRequests() {
    return requests;
  }
}

module.exports = Request;
