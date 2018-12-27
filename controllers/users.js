var firebase = require("firebase/app");

exports.register = function(data){
    return new Promise (function(resolve,reject){
        var oldData = data;
        data = {};
        data.data = {"me":"you","old":oldData};
        data.status = "success";
        data.message = "something is not right";
        resolve(data);
    });

}


//api.richoutfoundation.com/user/register


