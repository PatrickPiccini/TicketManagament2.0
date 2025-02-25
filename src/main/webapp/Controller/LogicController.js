async function Logout(){
    console.log('aaaquiiiiiiiiiiiiiiii');
    localStorage.removeItem('idTec');
    window.location.href = "/TicketManagament2.0/HTML/index.html"
    location.reload()
    return false
}

async function loadTecnicos() {

    await fetch(`http://localhost:8080/TicketManagament2.0/rest/getTecnico/`, {
        method: 'post',
        headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
    })

        .then((response) => {
            response.json().then((data) => {
                data.nomes.forEach((item) => {
                    $('#reporter').append('<option>' + item + '</option>');
                })

                data.nomes.forEach((item) => {
                    $('#responsible').append('<option>' + item + '</option>');
                })
            })
        })
        .catch((erro) => {
            return console.log(erro);
        })
}

async function sendToLogin() {
    var user = document.querySelector('#name').value
    var password = document.querySelector('#pass').value

    await fetch(`http://localhost:8080/TicketManagament2.0/rest/loginValidation/`, {
        method: 'post',
        headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
        body: `username=${user}&password=${password}`
    })
        .then((response) => {
            response.json().then((data) => {
                // console.log(data)

                localStorage.setItem('idTec', data.idtec)
                data.existresp == true ? window.location.href = "/TicketManagament2.0/HTML/home.html"
                    : window.location.href = "/TicketManagament2.0/HTML/fail.html"
            })
        })
        .catch((erro) => {
            return console.log(erro);
        })
}

async function sendToCadastro() {
    var username = document.querySelector('#usuario').value
    var name = document.querySelector('#name').value
    var last_name = document.querySelector('#sobrenome').value
    var email = document.querySelector('#email').value
    var email_verify = document.querySelector('#verifyemail').value
    var password = document.querySelector('#senha').value
    var password_verify = document.querySelector('#pass').value

    var stap = true
    while (stap == true) {
        if (email == email_verify && password == password_verify) {
            stap = false
        } else {
            alert('SENHA OU EMAIL INVÁLIDO')
                (password_verify && password && email_verify && email).value = ''
            stap = true
        }
    }

    await fetch(`http://localhost:8080/TicketManagament2.0/rest/createTecnico/`, {
        method: 'post',
        headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
        body: `usuario=${username}&nome=${name}&sobrenome=${last_name}&email=${email}&senha=${password}`
    })

        .then((response) => {
            response.json().then((data) => {
                // console.log(data.idTecnico)
                if (data.idTecnico == 'null') {
                    alert('Este usuário ja existe, Usuário! Crie um novo Usuário...')
                        (username, neme, last_name, email_verify, email, password, password_verify).value = ''
                } else {
                    localStorage.removeItem('idTec')
                    localStorage.setItem('idTec', data.idTecnico)
                    window.location.href = "/TicketManagament2.0/HTML/home.html"
                }
            })
                .catch((erro) => {
                    return console.log(erro);
                })
        })
}

async function createIssue(event) {
    event.preventDefault()
    var title = document.querySelector('#tituloh3').innerText;
    var responsible = document.querySelector('#responsible').value;
    var description = document.querySelector('#description').value;
    var status = document.querySelector('#status').value;
    var reporter = document.querySelector('#reporter').value;
    var priority = document.querySelector('#priority').value;
    var impact = document.querySelector('#impact').value;
    var date = document.querySelector('#dateBox').value;
    var informationsComplete = false
    var idresp = responsible.split(',')
    var idrel = reporter.split(',')

    if (responsible == null || description == 'N/A' || status == 'N/A' || reporter == 'N/A' || priority == 'N/A' || impact == 'N/A' || date == '') {
        alert("Ncessario preencimento de todos os campos")
        informationsComplete = false
    } else {
        informationsComplete = true
    }

    if (informationsComplete == true) {

        await fetch(`http://localhost:8080/TicketManagament2.0/rest/createChamado/`, {
            method: 'post',
            headers: {
                'Content-Type': ' application/x-www-form-urlencoded',
                'Content-Length': 16
            },
            body: `responsavel=${idresp[0]}
            &relator=${idrel[0]}
            &titulo=${title}
            &status=${status}
            &descricao=${description}
            &prioridade=${priority}
            &impacto=${impact}
            &dtinicio=${date}`
        })

            .then((response) => {
                response.json().then((createSusseful) => {
                    var newId = createSusseful.idChamado

                    createSusseful.idChamado != null && alert(`Chamado numero "${newId}" criado com Sucesso`)
                    window.location.href = "/TicketManagament2.0/HTML/home.html"
                })
            })
            .catch((erro) => {
                return console.log(erro);
            })
    }
}

