// API helper functions

const generateResponse = (status, message, data) => {
  return {status, message, data};
};

const to = (promise) => {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports = {
  generateResponse,
  to
};