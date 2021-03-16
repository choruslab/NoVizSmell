const http     = require('http');
const express  = require('express');
const app      = express();
const server   = http.createServer(app);

const PORT     = 3000;

app.use(express.json());

app.post("/", (req, res) => {
    console.log(req.body);
});


server.listen(PORT, err=>{ 
    if (err) {
      console.log(err)
    } else{
      console.log(`=====Express Server listening on port ${PORT}======`)
    }
  });