
async function loadTecnicos() {

    await fetch(`http://localhost:8080/TicketManagament2.0/rest/getTecnico/`, {
        method: 'post',
        headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
    })

        .then((response) => {
            response.json().then((data) => {
                // console.log(data.nomes)

                // for (var i = 0; i <= data.nomes.length(); i ++) {
                //     console.log(i);
                // }

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

async function loadIssues() {
    var idTec = localStorage.getItem('idTec')

    // console.log(data.chamados[1].relator)
    // console.log(data.chamados[1].idChamado)
    // console.log(data.chamados[1].prioridade)
    // console.log(data.chamados[1].dtinclusao)
    // console.log(data.chamados[1].titulo)

    await fetch(`http://localhost:8080/TicketManagament2.0/rest/getChamados/`, {
        method: 'post',
        headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
        body: `idResp=${idTec}`
    })

        .then((response) => {
            response.json().then((data) => {
                console.log(data);

                for (var i = 0; i < data.chamados.length; i++) {

                    var main = document.querySelector('.infosMain')

                    // var centralinfos = document.createElement('form')
                    // centralinfos.className = "centralinfos"

                    var chamado = document.createElement('div')
                    chamado.className = "chamado"

                    var titleID = document.createElement('h3')
                    titleID.className = "titleID"

                    var titleIssue = document.createElement('h3')
                    titleIssue.className = "titleIssue"

                    var div2 = document.createElement('div')
                    div2.className = "div2"

                    var divleft = document.createElement('div')
                    divleft.className = "divleft"

                    var titleDesc = document.createElement('label')
                    titleDesc.className = "titleDesc"

                    var selectBox = document.createElement('p')
                    selectBox.className = "selectBox"

                    var divright = document.createElement('div')
                    divright.className = "divright"

                    var div1 = document.createElement('div')
                    div1.className = "div1"

                    var divright = document.createElement('div')
                    divright.className = "divright"

                    var lateralRight = document.createElement('label')
                    lateralRight.className = "lateralRight"

                    //------------criação dos filhos

                    -----divright
                    divright.appendChild(selectBox.innerHTML = data.chamados[i].dtinclusao, lateralRight.innerHTML = 'Data de Inicio')
                    divright.appendChild(selectBox.innerHTML = data.chamados[i].impacto, lateralRight.innerHTML = 'Impacto')
                    divright.appendChild(selectBox.innerHTML = data.chamados[i].prioridade, lateralRight.innerHTML = 'prioridade')
                    divright.appendChild(selectBox.innerHTML = data.chamados[i].relator, lateralRight.innerHTML = 'Relator')

                    //------divleft
                    divleft.appendChild(selectBox.innerHTML = data.chamados[i].descricao, titleDesc.innerHTML = 'Descrição')

                    //-----div1
                    div1.appendChild(divright, divleft)

                    //------divright
                    divright.appendChild(selectBox.innerHTML = data.chamados[i].status, titleDesc.innerHTML = 'Status')

                    //------divleft
                    divleft.appendChild(selectBox.innerHTML = data.chamados[i].responsavel, titleDesc.innerHTML = 'Responsável')

                    //------div2
                    div2.appendChild(divright, divleft)

                    //------titleIssue
                    titleIssue.innerHTML = data.chamados[i].titulo

                    //------titleID
                    titleID.innerHTML = data.chamados[i].idchamado

                    //------chamado
                    chamado.appendChild(div2, titleIssue, titleID)

                    //------centralinfos
                    centralinfos.appendChild(chamado)

                    //------infosMain
                    main.appendChild(centralinfos)
                }
            })
        })
        .catch((erro) => {
            return console.log(erro);
        })
}
