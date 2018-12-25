

exports.register = new Promise (function(resolve,reject){
    var data = {};
    data.data = {"me":"you"};
    data.status = "success";
    data.message = "something is not right"

    resolve(data);
 });




//api.richoutfoundation.com/user/register


