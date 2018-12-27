utilities = require('./utilities');
let firebase = utilities.firebase;
require("firebase/database");
require("firebase/auth");   

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
           
        }catch(ex){
            // data validation failed
        }
        firebase.auth().createUserWithEmailAndPassword(userModel.email, userModel.password)
        .then(function(result){
            
            response = {
                status:'success',
                message:'Registration Successful',
                data:result['user']['providerData']
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
            switch (errorCode){
                case 'auth/weak-password':
                    message = 'The password is too weak.';
                    break;
                case 'auth/email-already-in-use':
                    message = 'User already exist on the system.';
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid email address.';
                    break;
                case 'auth/operation-not-allowed':
                    message = ' email/password accounts are not enabled.';
                    break;
                default:
                    message="An error occured during registration"
                    break;
            }
            response = {
                'status':'error',
                'message':error.message,
                'data':data
            }
            reject(response);
        });
        
        
    });

}


//api.richoutfoundation.com/user/register


