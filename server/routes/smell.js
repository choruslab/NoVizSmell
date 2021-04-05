const routes = require('express').Router();
const osc    = require('osc-min');

routes.post('/', messageArduino);

/* This function sends a message to Processing,
 * which communicates this message to Arduino
 */
function messageArduino(req, res) {
    try {

        if(! req.app.locals.remote_osc_ip) {
            return;
        }
    
        // Arduino does not yet handle Domain validated certificates (which are represented by number 3)
        if (req.body.code !== 3) {
            // Prepare the message to send 
            let osc_msg = osc.toBuffer({
                oscType: 'message',
                address: '/server',
                args:[{ 
                  type: 'integer',
                  value: parseInt(req.body.code) || 0
                }]
            });
        
            // Send message to processing
            res.app.locals.udp_server.send(osc_msg, 0, osc_msg.length, 9999, req.app.locals.remote_osc_ip);
            console.log('Sent OSC message to %s:9999', req.app.locals.remote_osc_ip);

        }
    } catch (err) {
        console.log("MESSAGE: " + err);
    }
}

module.exports = routes;