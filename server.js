var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, () => { console.log('Server listening at port %d', port); });
app.use(express.json({type: ['application/json','text/plain']}));
app.post('/', (req, res) => {  
  if (req.body.Token != null)   console.log("SNS Subscription Token: " + req.body.Token);
  if (req.body.Message != null) console.log("SNS Message: " + req.body.Message);
  res.end();
})
