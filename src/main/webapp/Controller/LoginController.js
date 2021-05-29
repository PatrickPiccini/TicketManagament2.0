const request = require("request");

var SEND_BANCO = process.env.SEND_BANCO || "coloque a url do caminho do banco"

function sendToLogin() {
    var user = document.querySelector('#name').value
    var password = document.querySelector('#pass').value

    var credentials = {
        Usuario: user,
        Senha: password
    }
    console.log(credentials);

    // var BancoResult = () => {
    //     request(`${SEND_BANCO}/`, credentials, (error,response) => {
    //     if(error) throw(error)
    //     return response
    // })}
    BancoResult = false

    BancoResult == true ? window.location.href = "file:///D:/Usu%C3%A1rios/Documentos/@Codigos/WorkSpace-POOA/TicketManagament2.0/src/main/webapp/home.html"
        : window.location.href = "file:///D:/Usu%C3%A1rios/Documentos/@Codigos/WorkSpace-POOA/TicketManagament2.0/src/main/webapp/fail.html"
}

function sendToCadastro() {
    var name = document.querySelector('#name').value
    var last_name = document.querySelector('#sobrenome').value
    var email = document.querySelector('#email').value
    var email_verify = document.querySelector('#verifyemail').value
    var password = document.querySelector('#senha').value
    var password_verify = document.querySelector('#pass').value

    var stap = true
    while (stap == true)
        if (email == email_verify && password == password_verify) {
            alert('deu certo!!!!!!!!!')
            stap = false
        } else {
            alert('SENHA OU EMAIL INVÁLIDO')
                (password_verify && password && email_verify && email).value = ''
            stap = true
        }

    
    var credentials = {
        name,
        last_name,
        email,
        email_verify,
        password,
        password_verify
    }

    // var BancoResultRegister = () => {
    //     request(`${SEND_BANCO}/`, credentials, (error,response) => {
    //     if(error) throw(error)
    //     return response
    // })}

    BancoResultRegister = true

    BancoResultRegister == true ? window.location.href = "file:///D:/Usu%C3%A1rios/Documentos/@Codigos/WorkSpace-POOA/TicketManagament2.0/src/main/webapp/home.html"
    : alert("Erro no Cadastro, Tente Novamente")
}
