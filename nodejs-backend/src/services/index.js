const sample = require("./sample/sample.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(sample);
    // ~cb-add-configure-service-name~
};
