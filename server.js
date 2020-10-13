var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, () => { console.log('Server listening at port %d', port); });
//app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: ['application/json','text/plain'}));
app.post('/', (req, res) => {
  console.log("<--REQ-->");
  console.log(req);
  console.log("<--BODY-->");
  console.log(req.body);
  res.end();
})
