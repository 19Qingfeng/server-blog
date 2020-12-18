const normazilerHeader = (headers, normazilerName) => {
  if (!headers) return headers;
  Object.keys(headers).forEach((header) => {
    if (
      header !== normazilerName &&
      header.toLowerCase() === normazilerName.toLowerCase()
    ) {
      const value = headers[header];
      delete headers[header];
      headers[normazilerName] = value;
    }
  });
};

const isPlainObject = (value) => {
  return Object.prototype.toString(value) === "[object Object]";
};

module.exports = {
  normazilerHeader,
  isPlainObject,
};
