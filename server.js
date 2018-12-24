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
  var file = '';
  var controller = '';

  var progress = 'default';
  try{
    if(file = require('./controllers/'+String(url[1]))){
      progress = "found controller";
      
      var result = file[url[2]]({"randomData":"random"});

      progress = "found function";
      
      if(result.status == 'success'){
        responseObject.type = 'request succesful';
        
      }else{
        responseObject.type = 500;
      }
     
      
      responseObject.data = result.data;
      responseObject.message = result.message;
    
    }
    
  }catch(ex){
    console.log(ex);
    if(progress == "default"){
      responseObject.type = 'not found';
      
    }else if(progress == "found controller"){
      responseObject.type = 'function not found';
    }
    
    
  };
  
  try{response = utilities.sendResponse(responseObject.type)}
  catch(ex){
    console.log(ex);
    //res.write(responseObject.type);
    res.write(String(ex));
  }
  
      
// res.write(response)
  //res.write(JSON.stringify(response));
  //res.write(JSON.stringify(utilities.sendResponse(responseObject)));
  //res.write(JSON.stringify(utilities.utilitiesModel.headers));

  //res.writeHead(response.headerCode,utilities.utilitiesModel.headers);
  utilities.sendResponse(responseObject.type)
  console.log(responseObject)
  res.write(JSON.stringify(responseObject));
  res.end();
  return 0;
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});