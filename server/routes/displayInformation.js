const routes = require('express').Router();

routes.post('/', displayInformation);

function displayInformation(req, res) {
    console.log("DISPLAY: ");
    console.log(req.body);
}

module.exports = routes;