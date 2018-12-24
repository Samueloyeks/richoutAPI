exports.utilitiesModel = require('../models/utilitiesModel');

exports.sendResponse = function (obj) {
    let response = {};
    
    switch (obj.type) {
        case 'function not found':
            response.headerCode = 400;
            response.status = 'error';
            response.message = ' not found on server';
            response.data = obj.data;
            break;
 
        case 'not found':
            response.headerCode = 404;
            // response.fileName = 'error';
            response.status = 'error'
            response.message = ' not found on server';
            response.data = obj.data;
            break;
           
        case 'request failed':
            response.headerCode = 404;
            
            //response.fileName = 'error';
            response.status = "error";
            response.message = utilitiesModel.message;
            response.data = utilitiesModel.obj;
            break;
         /*
        case 'request succesful':
            //header;
            // response.fileName = 'error';
            response.status = utilitiesModel.status;
            // if obj.msg
            response.message = obj.message;
            //else 
            response.data = utilitiesModel.obj;
            break;
        case '500':
            //header;
            // response.fileName = 'error';
            response.status = utilitiesModel.status;
            response.message = utilitiesModel.message;
            response.data = utilitiesModel.obj;
            break;
        case '409':
            //header;
            // response.fileName = 'error';
            response.status = utilitiesModel.status;
            response.message = utilitiesModel.message;
            response.data = utilitiesModel.obj;
            break;
        case '401':
            //header;
            // response.fileName = 'error';
            response.status = utilitiesModel.status;
            response.message = utilitiesModel.message;
            response.data = utilitiesModel.obj;
            break; */

        default:
            break;
    }

    return response;
}