const http = require('http');
const utilities = require('./controllers/utilities');

let responseObject = utilities.utilitiesModel.sendResponseObj;
let response = '';
const hostname = '127.0.0.1';
const port = 3000;

const app = http.createServer((req, res) => {


  var url = req.url.split('/');
  //var fileName = '../controllers/'+String(url[1])
  var fileName = './controllers'+req.url

  var controller = '';

  var progress = 'default';
  try{
    if(file = require('./controllers/'+String(url[1]))){
      progress = "found controller";
      if(file[url[2]]()){
        progress = "found function";
      }
    }

  }catch(ex){
    console.log(ex);
    if(progress == "default"){
      responseObject.type = 'not found';
      response = utilities.sendResponse(responseObject);  
    }else{
      responseObject.type = 'function not found';
      response = utilities.sendResponse(responseObject);
    }
    
    
  };


  res.writeHead(response.headerCode,utilities.utilitiesModel.headers);
  res.write(JSON.stringify(response));
  res.end();
  return 0;
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});