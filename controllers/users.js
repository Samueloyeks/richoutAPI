let utilities = require('../controllers/utilities');
require("../models/firebase");
let firebase = utilities.firebase;

/// modules

let register = function(data){
   
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
                //firebase.auth().currentUser.sendEmailVerification();
                //Email sent
            });
            
            response = {
                status:'success',
                message:'Registration Successful',
                data:{
                    uid : result.user.uid,
                    fullName : userModel.fullName,
                    phoneNumber : userModel.phoneNumber,
                    email : userModel.email,
                    accountType : userModel.accountType,
                    lastSeen : Date(result.user.lastLoginAt),
                    dateCreated : Date(result.user.createdAt),
                    verified : result.user.emailVerified

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

let login = function(data){
    
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
                uData.lastSeen = Date(result.user.lastLoginAt);
                uData.dateCreated = Date(result.user.createdAt);
                uData.verified = result.user.emailVerified;
                if(uData.verified){
                    response = {
                        status:'success',
                        message:'Login Successful',
                        data:uData
                    }
                    resolve(response);
                }else{
                    response = {
                        status:'error',
                        message:'Kindly Verify your email address to continue using RichOut.',
                        data:uData
                    }
                    reject(response);
                }
                
                
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


let fetchUserById = function(data){
    
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
       
        firebase.database().ref(`/userProfile/` + userModel.uid).once('value').then(function(snapshot) {
           //console.log('got here::fetchUserById')
            uData = snapshot.val();
            //uData.lastSeen = Date(result.user.lastLoginAt);
            //uData.dateCreated = Date(result.user.createdAt);
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

let update = function(data){
    
    return new Promise (function(resolve,reject){
        let userModel =  require('../models/userModel');
        userModel = userModel.user;
        let response = new Object();
        try{
            
            userModel.uid = data.uid;
            userModel.fullName = data.fullName;
            userModel.email = data.email;
            userModel.phoneNumber = data.phoneNumber;
           
        }catch(ex){
            // data validation failed
        }
        fetchUserById(userModel).then(function(result){
            firebase.database().ref(`/userProfile/` + userModel.uid).update(userModel).then((result) => {
                response = {
                    status:'success',
                    message:'data updated successfully',
                    data:result
                }
                resolve(response);
                
            })
        },function(error){
            reject(error);
        })
        /* ;
        firebase.auth().createUserWithEmailAndPassword(userModel.email, userModel.password)
        .then(function(result){
            delete uData['password'];
            response = {
                status:'success',
                message:'data retrieved successfully',
                data:uData
            }
            resolve(response);
         
            
            
           // var database = firebase.database();
            //firebase.database().ref('users/' + userModel.email).set(userModel);
        }) */
        /* .catch(function(error) {
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
         */
        
    });

}

let forgotPassword = function(data){
    
    return new Promise (function(resolve,reject){
        let userModel =  require('../models/userModel');
        userModel = userModel.user;
        let response = new Object();
        try{
            
            userModel.email = data.email;
           
        }catch(ex){
            // data validation failed
            console.log('forgot password:data validation failed')
        }
        firebase.auth().sendPasswordResetEmail(userModel.email);
  
       
        response = {
            status:'success',
            message:'password reset mail has been sent to '+userModel.email,
            data:userModel
        }
        resolve(response);
            
        
    });
        
        


}

let forgotPassword = function(data){
    
    return new Promise (function(resolve,reject){
        let userModel =  require('../models/userModel');
        userModel = userModel.user;
        let response = new Object();
        try{
            
            userModel.email = data.email;
            userModel.oldPassword = data.oldPassword;
            userModel.newPassword = data.newPassword;
           
        }catch(ex){
            // data validation failed
            console.log('forgot password:data validation failed')
        }
        firebase.auth.EmailAuthProvider.credential(userModel.email);
  
       
        response = {
            status:'success',
            message:'password reset mail has been sent to '+userModel.email,
            data:userModel
        }
        resolve(response);
            
        
    });
        
        


}

module.exports = {
    fetchUserById,
    update,
    register,
    login,
    forgotPassword
}