const routes = require('express').Router();

routes.get('/:id', displayInformation);

function displayInformation(req, res) {
    console.log(req.params.id);
    res.status(200).send("OKAY! BUT NOT YET SUPPORTED");
}

module.exports = routes;