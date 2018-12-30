exports.responseObj = {
    "headerCode":null,
    "status":null,
    "message":null,
    "data":null
}

exports.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',  
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST'
}

exports.firebaseConfig = {
    apiKey: "AIzaSyA1yiQ3hn5sJjva5DPLzCNcD3JkGEyI9Dk",
    authDomain: "rich-out.firebaseapp.com",
    databaseURL: "https://rich-out.firebaseio.com",
    projectId: "rich-out",
    storageBucket: "rich-out.appspot.com",
    messagingSenderId: "550404557767"
};

exports.resCodes = {
    'function_not_found': {
        "code":400,
        "message":"Unable to load specified path"
    },
    'module_not_found':{
        "code":404,
        "message":"sub route does not exist"
    },
    'request_failed':{
        "code":400,     
        "message":"An error occured while performing request"  
    },
    'invalid_data':{
        "code":400,     
        "message":"Invalid data format"  
    },
    'request_succesful':{
        "code":200,
        "message":"Request Successful"
    },
    'route_not_found':{
        "code":500,
        "message":"Cannot find route"
    },
    '500': {
        "code":500,
        "message":""
    },
    '409':{
        "code":409,  
        "message":""
    },
    '401': {
        "code":401,
        "message":"API Authentication Failed"
    }
}

exports.appConfig={
    appState:'test',
    liveHostName:'0.0.0.0',
    livePort:3000,
    testHostName:'127.0.0.1',
    testPort:3000,
    apiUser:"am9objpzbWl0aA==",
    apiPass:"JiZAQEFBMTE6NjcmOCMh"

}
// 
