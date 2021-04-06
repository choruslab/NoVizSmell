const routes = require('express').Router();

routes.get('/:id', displayInformation);

function displayInformation(req, res) {
    if (req.app.locals.breaches !== undefined) {
        res.render("information", req.app.locals.breaches[req.params.id]);
    } else {
        res.status(404).send("Entry does not exist!");
    }
}

module.exports = routes;