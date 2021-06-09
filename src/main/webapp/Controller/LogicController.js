
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

async function loadIssues() {
    var idTec = localStorage.getItem('idTec')
    await fetch(`http://localhost:8080/TicketManagament2.0/rest/getChamados/`, {
        method: 'post',
        headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
        body: `idResp=${idTec}`
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data);

                for (var i = 0; i < data.chamados.length; i++) {

                    //----Criação de Elemenotos para criação de form de cada chamado
                    var centralinfos = document.createElement('form')
                    centralinfos.className = "centralinfos"

                    var chamado = document.createElement('div')
                    chamado.className = "chamado"

                    var titleID = document.createElement('h3')
                    titleID.className = "titleID"

                    var titleIssue = document.createElement('h3')
                    titleIssue.className = "titleIssue"

                    var div2 = document.createElement('div')
                    div2.className = "div2"

                    var div1 = document.createElement('div')
                    div1.className = "div1"

                    //----Left
                    var divleft = document.createElement('div')
                    divleft.className = "divleft"
                    var divleft2 = document.createElement('div')
                    divleft2.className = "divleft"

                    //----Titles
                    var titleDesc = document.createElement('label')
                    titleDesc.className = "titleDesc"
                    var titleDesc2 = document.createElement('label')
                    titleDesc2.className = "titleDesc"
                    var titleDesc3 = document.createElement('label')
                    titleDesc3.className = "titleDesc"

                    //----Selects
                    var selectBox = document.createElement('p')
                    selectBox.className = "selectBox"
                    var selectBox2 = document.createElement('p')
                    selectBox2.className = "selectBox"
                    var selectBox3 = document.createElement('p')
                    selectBox3.className = "selectBoxDesc"
                    var selectBox4 = document.createElement('p')
                    selectBox4.className = "selectBox"
                    var selectBox5 = document.createElement('p')
                    selectBox5.className = "selectBox"
                    var selectBox6 = document.createElement('p')
                    selectBox6.className = "selectBox"
                    var selectBox7 = document.createElement('p')
                    selectBox7.className = "selectBox"

                    //----Right
                    var divright = document.createElement('div')
                    divright.className = "divright"
                    var divright2 = document.createElement('div')
                    divright2.className = "divright"

                    //----lateralRight
                    var lateralRight4 = document.createElement('label')
                    lateralRight4.className = "lateralRight"
                    var lateralRight5 = document.createElement('label')
                    lateralRight5.className = "lateralRight"
                    var lateralRight6 = document.createElement('label')
                    lateralRight6.className = "lateralRight"
                    var lateralRight7 = document.createElement('label')
                    lateralRight7.className = "lateralRight"

                    var main = document.querySelector('.infosMain')

                    //-----Conversão das informações adquiridas do Banco de dados
                    var status;
                    var prioridade;
                    var impacto;
                    var dtinclusao;

                    if (data.chamados[i].status == "A") {
                        status = "Aguardando Terceiros"
                    } else if (data.chamados[i].status == "F") {
                        status = "Concluído"
                    } else if (data.chamados[i].status == "P") {
                        status = "Em Progresso"
                    } else if (data.chamados[i].status == "C") {
                        status = "Cancelado"
                    }


                    if (data.chamados[i].prioridade == "1") {
                        prioridade = "Prioridade 1"
                    } else if (data.chamados[i].prioridade == "2") {
                        prioridade = "Prioridade 2"
                    } else if (data.chamados[i].prioridade == "3") {
                        prioridade = "Prioridade 3"
                    } else if (data.chamados[i].prioridade == "4") {
                        prioridade = "Prioridade 4"
                    }


                    if (data.chamados[i].impacto == "C") {
                        impacto = "Crítico"
                    } else if (data.chamados[i].impacto == "A") {
                        impacto = "Alto"
                    } else if (data.chamados[i].impacto == "M") {
                        impacto = "Médio"
                    } else if (data.chamados[i].impacto == "B") {
                        impacto = "Baixo"
                    }

                    //----Conversão de Tada para Brasileira
                    var hourDate = data.chamados[i].dtinclusao
                    var newhora = '';
                    for (var j = 0; j <= 9; j++) {
                        newhora += hourDate[j]
                    }
                    var dtinclusao = newhora.split('-').reverse().join('/')                    


                    //-----Adição dos elementos ao Fron-End
                    main.appendChild(centralinfos)
                    centralinfos.appendChild(chamado)
                    chamado.appendChild(titleID)
                    titleID.appendChild(document.createTextNode(data.chamados[i].idchamado))
                    chamado.appendChild(titleIssue)
                    titleIssue.appendChild(document.createTextNode(data.chamados[i].titulo))

                    //--div2
                    chamado.appendChild(div2)
                    div2.appendChild(divleft)
                    divleft.appendChild(titleDesc)
                    titleDesc.appendChild(document.createTextNode('Responsável'))
                    divleft.appendChild(selectBox)
                    selectBox.appendChild(document.createTextNode(data.chamados[i].responsavel))

                    div2.appendChild(divright)
                    divright.appendChild(titleDesc)
                    titleDesc2.appendChild(document.createTextNode('Status'))
                    divright.appendChild(selectBox2)
                    selectBox2.appendChild(document.createTextNode(status))

                    //--div1
                    chamado.appendChild(div1)
                    div1.appendChild(divleft2)
                    divleft2.appendChild(titleDesc3)
                    titleDesc3.appendChild(document.createTextNode('Descrição'))
                    divleft2.appendChild(selectBox3)
                    selectBox3.appendChild(document.createTextNode(data.chamados[i].descricao))

                    div1.appendChild(divright2)
                    divright2.appendChild(lateralRight4)
                    lateralRight4.appendChild(document.createTextNode('Relator'))
                    divright2.appendChild(selectBox4)
                    selectBox4.appendChild(document.createTextNode(data.chamados[i].relator))

                    divright2.appendChild(lateralRight5)
                    lateralRight5.appendChild(document.createTextNode('Prioridade'))
                    divright2.appendChild(selectBox5)
                    selectBox5.appendChild(document.createTextNode(prioridade))

                    divright2.appendChild(lateralRight6)
                    lateralRight6.appendChild(document.createTextNode('Impacto'))
                    divright2.appendChild(selectBox6)
                    selectBox6.appendChild(document.createTextNode(impacto))

                    divright2.appendChild(lateralRight7)
                    lateralRight7.appendChild(document.createTextNode('Data de Inicio'))
                    divright2.appendChild(selectBox7)
                    selectBox7.appendChild(document.createTextNode(dtinclusao))

                }
            })
        })
        .catch((erro) => {
            return console.log(erro);
        })
}

window.addEventListener('load', loadIssues)