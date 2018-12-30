let utilities = require('../controllers/utilities');
require("../models/firebase");
let firebase = utilities.firebase;

exports.register = function(data){
    
    return new Promise (function(resolve,reject){
        let userModel =  require('../models/userModel');
        userModel = userModel.user;
        let response = new Object();
        try{
            
            userModel.fullName = data.fullName;
            userModel.password = data.password;
            userModel.email = data.email;
            userModel.phoneNumber = data.phoneNumber;
            userModel.accountType = data.accountType;
           
        }catch(ex){
            // data validation failed
        }
        firebase.auth().createUserWithEmailAndPassword(userModel.email, userModel.password)
        .then(function(result){
            firebase.database().ref(`/userProfile/` + result.user.uid).set(userModel).then(() => {
                firebase.auth().currentUser.sendEmailVerification();
                //Email sent
            });
         
            response = {
                status:'success',
                message:'Registration Successful',
                data:{
                    uid : result.user.uid,
                    fullName : userModel.fullName,
                    phoneNumber :userModel.phoneNumber,
                    email :userModel.email,
                    accountType :userModel.accountType
                }   
            }
            
            resolve(response);
            
           // var database = firebase.database();
            //firebase.database().ref('users/' + userModel.email).set(userModel);
        })
        .catch(function(error) {
            // Handle Errors here.
            var message = "";
            var errorCode = error.code;
            var errorMessage = error.message;
           
            response = {
                'status':'error',
                'message':error.message,
                'data':data
            }
            reject(response);
        });
        
        
    });

}

exports.login = function(data){
    
    return new Promise (function(resolve,reject){
        let userModel =  require('../models/userModel');
        userModel = userModel.user;
        let response = new Object();
        try{
            
            userModel.password = data.password;
            userModel.email = data.email;
           
        }catch(ex){
            // data validation failed
            console.log('login:data validation failed')
        }
        firebase.auth().signInWithEmailAndPassword(userModel.email, userModel.password)
        .then(function(result){
            firebase.database().ref(`/userProfile/` + result.user.uid).once('value').then(function(snapshot) {
                uData = snapshot.val();
                delete uData['password'];
                uData['uid']= snapshot.key;
                response = {
                    status:'success',
                    message:'Login Successful',
                    data:uData
                }
                resolve(response);
                
                //Email sent
            });
            
            
            
           // var database = firebase.database();
            //firebase.database().ref('users/' + userModel.email).set(userModel);
        })
        .catch(function(error) {
            // Handle Errors here.
            var message = "";
            var errorCode = error.code;
            var errorMessage = error.message;
            
            response = {
                'status':'error',
                'message':error.message,
                'data':data
            }
            reject(response);
        });
        
        
    });

}


exports.fetchUserById = function(data){
    
    return new Promise (function(resolve,reject){
        let userModel =  require('../models/userModel');
        userModel = userModel.user;
        let response = new Object();
        try{
            
            userModel.uid = data.uid;
           
        }catch(ex){
            // data validation failed
            console.log('fetchUserById:data validation failed')
        }
       
        firebase.database().ref(`/userProfile/` + data.uid).once('value').then(function(snapshot) {
           console.log('got here')
            uData = snapshot.val();
           //console.log(uData)
            
            delete uData['password'];
            response = {
                status:'success',
                message:'data retrieved successfully',
                data:uData
            }
            resolve(response);
            
            //Email sent
        }).catch(function(error) {
        // Handle Errors here.
        var message = "";
        var errorCode = error.code;
        var errorMessage = error.message;
        response = {
            'status':'error',
            'message':'Invalid user id',
            'data':data
        }
        reject(response);
    });
        
        
    });

}


//api.richoutfoundation.com/user/register


