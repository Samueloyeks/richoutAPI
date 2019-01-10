exports.models = require('../models/utilitiesModel');

exports.firebase = require("firebase/app");


exports.validateAuth = function (req,res,next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    };
    var isValid = false;
    var auth = require('basic-auth')
    var credentials = auth(req)
    var compare = require('tsscmp')
    var module = require('../models/utilitiesModel')
    var appConfig = module.appConfig;
    if (!credentials || !credentials.name || !credentials.pass) {
        // credentials not provided
        return unauthorized(res);
        console.log('credentials not provided')
    } else {
        // Simple method to prevent short-circut and use timing-safe compare
        if (compare(credentials.name, appConfig.apiUser) && compare(credentials.pass,appConfig.apiPass)) {
            // isValid = true;
            return next();
        } else {
            // wrong credentials
            console.log('wrong credentials')
            return unauthorized(res);
        }
    }
    return isValid;
}

// var auth = function (req, res, next) {
//     function unauthorized(res) {
//         res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//         return res.send(401);
//     };

//     var user = basicAuth(req);

//     if (!user || !user.name || !user.pass) {
//         return unauthorized(res);
//     };

//     if (user.name === 'foo' && user.pass === 'bar') {
//         return next();
//     } else {
//         return unauthorized(res);
//     };
// };
