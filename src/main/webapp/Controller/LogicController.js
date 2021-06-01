// const request = require("request");
// var SEND_BANCO = process.env.SEND_BANCO || "http://localhost:8080/"

// var relatores = [
//     "patrick",
//     "Ederson",
//     "bido bosta",
//     "Pitt Mestre",
//     "Roberto Marinho"
// ]

// relatores.forEach( (item) =>{
//     $('#reporter').append('<option>'+item+'</option>');
// })

// relatores.forEach( (item) =>{
//     $('#responsible').append('<option>'+item+'</option>');
// })


async function sendToLogin() {
    var user = document.querySelector('#name').value
    var password = document.querySelector('#pass').value


    const formData = new FormData();
    formData.append('username',user);
    formData.append('password',password);
    
    // const data = new URLSearchParams();
    // for(const pair of new formData(formElement)){
    //     data.append(pa)
    // }
    
    await fetch(`http://localhost:8080/TicketManagament2.0/rest/loginValidation/`,{
        method: 'post',
        headers:{'Content-Type':' application/x-www-form-urlencoded'},        
        body:`username=${user}&password=${password}`
    })

    .then((response) => {
		response.json().then((data)=>{
			console.log(data)
		})
        
    })
    .catch((erro) =>{
        return console.log(erro);
    })

	//var resphtml = true
	
    //resphtml == true ? window.location.href = "./home.html"
    //    : window.location.href = "./fail.html"
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

    fetch('http://localhost:8080/',{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(informations),
    })
    .then((response) => {
        return response.blob();
    })
    .catch((erro) =>{
        return console.log(erro);
    })

    BancoResultRegister = true

    BancoResultRegister == true ? window.location.href = "./home.html"
    : alert("Erro no Cadastro, Tente Novamente")
}
function cancelIssue(event){
    event.preventDefault()

    var responsible = document.querySelector('#responsible').value;
    var description = document.querySelector('#description').value;
    var status = document.querySelector('#status').value;
    var reporter = document.querySelector('#reporter').value;
    var priority = document.querySelector('#priority').value;
    var impact = document.querySelector('#impact').value;
    var date = document.querySelector('#dateBox').value;
    var informationsComplete = false
    
    if(responsible == null || description == 'N/A' || status == 'N/A' || reporter == 'N/A' || priority == 'N/A' || impact == 'N/A' || date == '' ){
        alert("Ncessario preencimento de todos os campos")
        informationsComplete = false
    } else {
        informationsComplete = true
    }


    if(informationsComplete == true){

        var informations = {
            responsible,
            description,
            status,
            reporter,
            priority,
            impact,
            date
        }
    
        fetch('http://localhost:8080/',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(informations),
        })
        .then((response) => {
            return response.blob();
        })
        .catch((erro) =>{
            return console.log(erro);
        })
    }


}