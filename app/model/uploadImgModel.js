const uploads = [];

module.exports = {
  getAllUploads: () => uploads,
  addUpload: (name, status, faces) => {
    uploads.push({ name, status, faces });
  }
};
