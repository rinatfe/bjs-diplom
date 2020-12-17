'use strict'
let obj = new UserForm();
obj.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        if (response.success === true) 
            location.reload()

        if (response.success === false)   
            obj.loginErrorMessageBox.innerHTML = response.error;
    })  
}

obj.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if (response.success === true) 
            location.reload()

        if (response.success === false)    
            obj.registerErrorMessageBox.innerHTML = response.error;
        }
    )
}


///