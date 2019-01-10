const express = require('./node_modules/richout/node_modules/express');
var cors = require('cors');
const utilities = require('./controllers/utilities');
var fs = require('file-system');
var basicAuth = require('basic-auth');


let responseObj = utilities.models.responseObj;
let response = ''
let port = "";
let hostname = "";


if (utilities.models.appConfig.appState == 'live') {
  hostname = utilities.models.appConfig.liveHostName;
  port = utilities.models.appConfig.livePort;
  // var express = require('./express')
  console.log('live')
} else {
  hostname = utilities.models.appConfig.testHostName;
  port = utilities.models.appConfig.testPort;
  // var express = require('./node_modules/richout/node_modules/express');
  console.log('test')
}
const app = express();
app.use(cors());
app.use(require('body-parser').json());
utilities.firebase.initializeApp(utilities.models.firebaseConfig);



app.get('/uploads/*', function (req, res) {
  // var filepath = req.protocol + '://' + req.get('host') + req.originalUrl;
  filepath = './'+req.url
  console.log('request url: ' + req.url);
  console.log(filepath)
  // var filepath = './'+req.url;

  res.sendFile(__dirname+req.url);
 
});

app.post('/*', utilities.validateAuth, function (req, res) {
  global.serverURL = req.headers.host;
  data = req.body;
  console.log('request url: ' + req.url);
  var url = req.url.split('/');
  console.log(url)

  try {
    console.log('./controllers/' + url[1])
    var module = require(String('./controllers/' + url[1]));
    module[url[2]](data)
      .then(
        function (result) {
          responseObj.data = result['data'];
          responseObj.status = result['status'];
          responseObj.message = result.message;
          responseObj.headerCode = utilities.models.resCodes.request_succesful.code;

          res.json(responseObj);
        },
        function (error) {
          responseObj['data'] = error['data'];
          responseObj['status'] = error['status'];
          responseObj.message = error.message;
          responseObj.headerCode = utilities.models.resCodes.request_failed.code;

          // res.writeHead(responseObj.headerCode,utilities.models.headers);
          res.status(responseObj.headerCode, utilities.models.headers).json(responseObj);
        })
    console.log('successful');
  } catch (ex) {
    console.log(ex)
    responseObj['status'] = 'error';
    responseObj.message = utilities.models.resCodes.route_not_found.message + ' ' + req.url;
    responseObj.headerCode = utilities.models.resCodes.route_not_found.code;
    res.json(responseObj)
  }

});
app.listen(process.env.PORT || port,hostname,() => {
  console.log(`Server running at http://${hostname}:${port}/`);
});