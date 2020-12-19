'use strict'
let obj = new UserForm();
obj.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        if (response.success) { 
            location.reload()
        } else {
            obj.setLoginErrorMessage(response.error);
        }    
    })  
}

obj.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if (response.success) { 
            location.reload()
        } else {    
            obj.setRegisterErrorMessage(response.error);
        }
    })
}

