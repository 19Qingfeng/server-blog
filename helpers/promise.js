const handlePromise = (promise) => {
  return promise
    .then((res) => {
      return [null, res];
    })
    .catch((error) => {
      return [error, null];
    });
};

module.exports = {
  handlePromise,
};
