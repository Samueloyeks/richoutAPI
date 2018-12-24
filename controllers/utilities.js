exports.utilitiesModel = require('../models/utilitiesModel');

exports.sendResponse = function (obj) {
    let response = {};
    utilitiesModel.status = 'error';
    switch (obj.type) {
        case 'function not found':
            response.headerCode = 400;
            response.fileName = 'error';
            response.status = utilitiesModel.status;
            response.message = ' not found on server';
            response.data = obj.data;
            break;

        case 'not found':
            response.headerCode = 404;
            // response.fileName = 'error';
            response.status = utilitiesModel.status;
            response.message = ' not found on server';
            response.data = obj.data;
            break;

        case 'request failed':
            //header;
            // response.fileName = 'error';
            response.status = utilitiesModel.status;
            response.message = utilitiesModel.message;
            response.data = utilitiesModel.obj;
            break;
        case 'request succesful':
            //header;
            // response.fileName = 'error';
            response.status = 'Successful'
            if (obj.msg) {
                response.message = utilitiesModel.message;
            } else {
                response.message = "Your request was succesful";
            }
            response.data = utilitiesModel.obj;
            break;
        case '500':
            //header;
            // response.fileName = 'error';
            if (obj)
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
            break;

        default:
            break;
    }

    return response;
}

// 