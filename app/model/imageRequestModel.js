class Request {
  constructor(id, name, status, imageBuffer, numFaces, date, user) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.imageBuffer = imageBuffer;
    this.numFaces = numFaces;
    this.date = date;
    this.user = user
  }

  static create(id, name, status, imageBuffer, numFaces, date, user) {
    const request = new Request(id, name, status, imageBuffer, numFaces, date, user);
    requests.push(request);
    return request;
  }

  static getAllRequests() {
    return requests;
  }
}

module.exports = Request;
