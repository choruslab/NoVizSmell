const routes = require('express').Router();

routes.use("/smell", require("./smell"));

module.exports = routes;