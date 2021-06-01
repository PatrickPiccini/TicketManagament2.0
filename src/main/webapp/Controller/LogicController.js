

async function loadTecnicos(){

    await fetch(`https://38c0caa2bce8.ngrok.io/TicketManagament2.0/rest/getTecnicoNomes`,{
        method: 'post',
        headers:{'Content-Type':' application/x-www-form-urlencoded'},        
        body:`username=${user}&password=${password}`
    })
    
    .then((response) => {
		response.json().then((data)=>{
			console.log(data)

            var listTecnicos = data.split()
            console.log(listTecnicos);

            listTecnicos.forEach( (item) =>{
                $('#reporter').append('<option>'+item+'</option>');
            })
            
            listTecnicos.forEach( (item) =>{
                $('#responsible').append('<option>'+item+'</option>');
            })

		})
        
    })
    .catch((erro) =>{
        return console.log(erro);
    })

}


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
    
    await fetch(`https://38c0caa2bce8.ngrok.io/TicketManagament2.0/rest/loginValidation/`,{
        method: 'post',
        headers:{'Content-Type':' application/x-www-form-urlencoded'},        
        body:`username=${user}&password=${password}`
    })
    
    .then((response) => {
		response.json().then((data)=>{
			console.log(data)

            data.existresp == true ? window.location.href = "./home.html"
            : window.location.href = "./fail.html"
		})
        
    })
    .catch((erro) =>{
        return console.log(erro);
    })
}

async function sendToCadastro() {
    var name = document.querySelector('#name').value
    var last_name = document.querySelector('#sobrenome').value
    var email = document.querySelector('#email').value
    var email_verify = document.querySelector('#verifyemail').value
    var password = document.querySelector('#senha').value
    var password_verify = document.querySelector('#pass').value

    var stap = true
    while (stap == true)
        if (email == email_verify && password == password_verify) {
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

    await fetch(`https://38c0caa2bce8.ngrok.io/TicketManagament2.0/rest/createTecnico/`,{
        method: 'post',
        headers:{'Content-Type':' application/x-www-form-urlencoded'},        
        body:`name=${name}&sobrenome=${last_name}&email=${email}&senha=${password}&nascimento=sysdate`
    })

    .then((response) => {
		response.json().then((data)=>{
			console.log(data.idTecnico)

            window.location.href = "./home.html"
    
		})
        
    })
    .catch((erro) =>{
        return console.log(erro);
    })

}
async function cancelIssue(event){
    event.preventDefault()
    var title = documen.querySelector('.titleIssue').value
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

        await fetch(`https://38c0caa2bce8.ngrok.io/TicketManagament2.0/rest/createChamado/`,{
            method: 'post',
            headers:{'Content-Type':' application/x-www-form-urlencoded'},        
            body:`responsavel=${responsible}&relator=${reporter}&titulo=${title}&status=${status}&descricao=${description}&prioridade=${priority}&impacto=${impact}&dtinicio=${date}`
        })
    
        .then((response) => {
            response.json().then((data)=>{
                console.log(data)
                
                createSusseful != null && alert(`Chamado numeor ${data} Criado com Sucesso`)
                window.location.href = "./home.html"
        
            })
            
        })
        .catch((erro) =>{
            return console.log(erro);
        })
    }


}