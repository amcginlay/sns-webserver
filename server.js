var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, () => { console.log('Server listening at port %d', port); });
app.use(express.json({type: ['application/json','text/plain']}));
app.all('/', (req, res) => {
  if (req.method === "POST") {
    console.log("SNS Subscription Token: " + req.body.Token);
  } else {
    console.log("SNS Publication Received: " + req.body);
  }
  res.end();
})
