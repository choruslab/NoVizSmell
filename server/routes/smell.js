const routes = require('express').Router();
const osc    = require('osc-min');

const axios = require('axios').default;

routes.post('/', smellInterpreter, messageArduino);

/* This function process the received information to 
 * determine what code to send to the Arduino
 */
function smellInterpreter(req, res, next) {
    req.app.locals.breaches = req.body.Data;
    req.app.locals.generator = req.body.generator;
    
    if (req.app.locals.breaches.length > 0) {
        req.app.locals.code = 1;
    } else {
        req.app.locals.code = 0;
    }

    next();
}

/* This function sends a message to Processing,
 * which communicates this message to Arduino
 */
function messageArduino(req, res) {
    try {

        console.log("From: " + req.app.locals.generator + ", Code: " + req.app.locals.code);

        if(!req.app.locals.remote_osc_ip) {
            console.log("Error :(");
            return;
        }
    
        if (req.app.locals.code == 0 || req.app.locals.code == 1) {
            console.log("Code okay...")
            // Prepare the message to send 
            let osc_msg = osc.toBuffer({
                oscType: 'message',
                address: '/server',
                args:[{ 
                  type: 'integer',
                  value: parseInt(req.app.locals.code) || 0
                }]
            });
        
            // Send message to processing
            res.app.locals.udp_server.send(osc_msg, 0, osc_msg.length, 9999, req.app.locals.remote_osc_ip);
            console.log('Sent OSC message (%s) to %s:9999', req.app.locals.code, req.app.locals.remote_osc_ip);

            res.status(200).send("OKAY");

            return;

        }
    } catch (err) {
        console.log("MESSAGE: " + err);
    }

    res.status(500).send("ERROR");
}

module.exports = routes;