const routes = require('express').Router();

routes.use("/smell", require("./smell"));

routes.use("/displayInformation", require("./displayInformation"))

module.exports = routes;