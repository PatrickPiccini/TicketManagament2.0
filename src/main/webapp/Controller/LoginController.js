const request = require("request");

async function sendToLogin(request, respose){
    var user = document.getElementsByName("username").values
    var password = document.getElementsByName("password").values

    var credentials = {
        Usuario:user,
        Senha:password
    }
    console.log(credentials.body);
 
}


