const http = require('http');
const utilities = require('./controllers/utilities');
//var cors = require('cors');

/* var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} */


let responseObj = utilities.models.responseObj;
let response = '';
let port = "";
let hostname = "";
///application state (live/test)
if(utilities.models.appConfig.appState == 'live'){
  hostname = utilities.models.appConfig.liveHostName;
  port = utilities.models.appConfig.livePort;
  console.log('live')
}else{
  hostname = utilities.models.appConfig.testHostName;
  port = utilities.models.appConfig.testPort;
  console.log('test')
}



utilities.firebase.initializeApp(utilities.models.firebaseConfig);

let file= Array();

const app = http.createServer((req, res) => {

// handle cors options
if (req.method === 'OPTIONS') {
  responseObj['status'] = 'error';
  responseObj.message = utilities.models.resCodes['204'].message;
  responseObj.headerCode = utilities.models.resCodes['204'].code;
  endRequest();
}

// allow access after api authentication is successful
if(utilities.validateAuth(req,utilities.models.appConfig)){
  // validation succesful
  console.log('validation successful')
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
}else{
  //validation failed
  responseObj['status'] = 'error';
  responseObj.message = utilities.models.resCodes['401'].message;
  responseObj.headerCode = utilities.models.resCodes['401'].code;
  endRequest();
}

  

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
      responseObj['status'] = 'error';
      responseObj.message = utilities.models.resCodes.route_not_found.message+' '+req.url;
      responseObj.headerCode = utilities.models.resCodes.route_not_found.code;
      endRequest();
      
    };


    try{
      //res.write(file[url[2]]());
      var functionName = url[2];

      // pass data to dynamic promise function # module.function(data).then....
      file[functionName](data).then(function(result){
        responseObj.data = result['data'];
        responseObj.status  = result['status'];
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
    responseObj['status'] = 'error';
    responseObj.message = utilities.models.resCodes.route_not_found.message+' '+req.url;
    responseObj.headerCode = utilities.models.resCodes.route_not_found.code;
    endRequest();
    
  };

  }

  function endRequest(){
    console.log("\nNew write about to happen")
    res.writeHead(responseObj.headerCode,utilities.models.headers);
   
/*     res.write(JSON.stringify(responseObj),function(success){},function(error){res.end();
    });
     */
    res.end(JSON.stringify(responseObj));
    return false;
    /* console.log("\nApplication Ended")
    
    return false;
    console.log('suprise me!') */
  }
});
//app.use(cors(corsOptions));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

////////