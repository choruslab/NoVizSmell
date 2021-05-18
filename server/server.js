const http     = require('http');
const express  = require('express');
const app      = express();
const server   = http.createServer(app);
const osc      = require('osc-min');
const dgram    = require('dgram');

const PORT     = 3000;

app.use(express.json());

// Look inside /routes/index.js for requests handling code
app.use('/', require("./routes/index"));

app.locals.udp_server = dgram.createSocket('udp4', function(msg, rinfo) {
 
  let osc_message;
  
  try {
    osc_message = osc.fromBuffer(msg);

  } catch(err) {
    console.log('Could not decode OSC message');
  }

  if(osc_message.address != '/server') {
    console.log('Invalid OSC address');
  }
  
  app.locals.remote_osc_ip = rinfo.address;
});

/******************* Port bindings *******************/
server.timeout = 3600
server.listen(PORT, err=>{ 
  if (err) {
    console.log(err)
  } else{
    console.log(`=====Express Server listening on port ${PORT}======`)
  }
});

app.locals.udp_server.bind(9998);
console.log(`=====UDP Server listening on port 9998=====`);
/****************************************************/