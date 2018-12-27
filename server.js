const http = require('http');
const utilities = require('./controllers/utilities');


// allow after authentication


let responseObj = utilities.models.responseObj;
let response = '';
const hostname = '127.0.0.1';
const port = 3000;


utilities.firebase.initializeApp(utilities.models.firebaseConfig);

let file= Array();

const app = http.createServer((req, res) => {

  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  });
  req.on('end', () => {
    try{
     
      data = JSON.parse(data)
      
    }catch(ex){
      //responseObj['data'] = data;
      responseObj['status'] = 'error';
      responseObj.message = utilities.models.resCodes.invalid_data.message;
      responseObj.headerCode = utilities.models.resCodes.invalid_data.code;
      endRequest();
    }
    processRequest(data);      
    
  })
  
  function processRequest(data){
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    var url = req.url.split('/');
    //var fileName = '../controllers/'+String(url[1])
    var fileName = './controllers'+req.url

    var controller = '';
    
    try{ 
      file = require('./controllers/'+String(url[1]));
      // call the function using dynamic function name and dynamic module name
      //res.write('first succeed');
    }catch(ex){
      console.log(ex);
      res.write('first failed?!'+String(ex))
      endRequest();
      
    };


    try{
      //res.write(file[url[2]]());
      var functionName = url[2];

      // pass data to dynamic promise function # module.function(data).then....
      file[functionName](data).then(function(result){
        responseObj['data'] = result['data'];
        responseObj['status'] = result['status'];
        responseObj.message = result.message;
        responseObj.headerCode = utilities.models.resCodes.request_succesful.code;
        
        endRequest();
      },
    function(error){
      responseObj['data'] = error['data'];
      responseObj['status'] = error['status'];
      responseObj.message = error.message;
      responseObj.headerCode = utilities.models.resCodes.request_failed.code;
        
      endRequest();
    })
  }catch(ex){
    console.log(ex);
    res.write('first failed?!'+String(ex)+String(file[url[2]]))
    endRequest  ();
    
  };

  }

  function endRequest(){
    res.writeHead(responseObj.headerCode,utilities.models.headers);
    res.write(JSON.stringify(responseObj));
    res.end();
    return false;
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});