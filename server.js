const http = require('http');


const hostname = '127.0.0.1';
const port = 3000;

let file= '';

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  var url = req.url.split('/');
  //var fileName = '../controllers/'+String(url[1])
  var fileName = './controllers'+req.url

  var controller = '';
 
  try{ 
    file = require('./controllers/'+String(url[1]));
    // call the function using dynamic function name and dynamic module name
    res.write('first succeed');
  }catch(ex){
    console.log(ex);
    res.write('first failed?!')
  };


  try{
    res.write(file[url[2]]());
  }catch(ex){
    console.log(ex);
    res.write('second failed?!')
  };

/*   var file = require(fileNmae);
 */

  /* try {
      file.statSync('path/to/file');
      console.log('file or directory exists');
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  } */
  res.write(fileName)
  
  res.end();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


/// changes for zino branch