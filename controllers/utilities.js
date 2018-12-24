exports.utilitiesModel = require('../models/utilitiesModel');

exports.sendResponse = function (obj) {
    console.log("got here 1")
    let response = {};
    var status = "error";
    switch (obj.type) {
        case 'function not found':
            response.headerCode = 400;
            response.fileName = 'error';
            response.status = status;
            response.message = ' not found on server';
            response.data = obj.data;
            break;

        case 'not found':
            response.headerCode = 404;
            // response.fileName = 'error';
            response.status = status;
            response.message = ' not found on server';
            response.data = obj.data;
            break;

        case 'request failed':
            // response.fileName = 'error';
            response.headerCode = 400;            
            response.status = status;
            response.message = "Request Failed";
            response.data =  obj.data;
            break;
        case 'request succesful':
            
            // response.fileName = 'error';
            response.headerCode = 200;
            response.status = 'success'
            /* if (obj.message) {
                response.message = obj.message;
            } else {
                response.message = "Your request was succesful";
            } */
            response.message = "Request Failed";
            response.data = obj.data;
            break;
        case '500':
            response.headerCode = 500;
            // response.fileName = 'error';
            //if (obj)
            response.status = status;
            response.message = message;
            response.data = obj.data;
            break;
        case '409':
            response.headerCode = 409;
            // response.fileName = 'error';
            response.status = status;
            response.message = message;
            response.data = obj.data;
            break;
        case '401':
            response.headerCode = 401;
            // response.fileName = 'error';
            response.status = status;
            response.message = message;
            response.data = obj.data;
            break;

        default:
            break;
    }

   return response;
}

// 