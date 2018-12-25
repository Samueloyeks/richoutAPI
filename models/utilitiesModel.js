exports.responseObj = {
    "headerCode":null,
    "status":null,
    "message":null,
    "data":null
}

exports.headers = {'Content-Type': 'application/json'}

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
    'request_succesful':{
        "code":200,
        "message":"Request Successful"
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
        "message":""
    }
}

// 