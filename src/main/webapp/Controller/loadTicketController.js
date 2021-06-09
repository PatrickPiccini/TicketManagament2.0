
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

                for (var i = 0; i < data.chamados.length; i++) {

                    var main = document.querySelector('.infosMain')
                    
                    //------------criação dos filhos

                    //-----divright
                    document.divright.appendChild(selectBox.innerHTML = data.chamados[i].dtinclusao, lateralRight.innerHTML = 'Data de Inicio')
                    document.divright.appendChild(selectBox.innerHTML = data.chamados[i].impacto, lateralRight.innerHTML = 'Impacto')
                    document.divright.appendChild(selectBox.innerHTML = data.chamados[i].prioridade, lateralRight.innerHTML = 'prioridade')
                    document.divright.appendChild(selectBox.innerHTML = data.chamados[i].relator, lateralRight.innerHTML = 'Relator')

                    //------divleft
                    document.divleft.appendChild(selectBox.innerHTML = data.chamados[i].descricao, titleDesc.innerHTML = 'Descrição')

                    //-----div1
                    document.div1.appendChild(divright, divleft)

                    //------divright
                    document.divright.appendChild(selectBox.innerHTML = data.chamados[i].status, titleDesc.innerHTML = 'Status')

                    //------divleft
                    document.divleft.appendChild(selectBox.innerHTML = data.chamados[i].responsavel, titleDesc.innerHTML = 'Responsável')

                    //------div2
                    document.div2.appendChild(divright, divleft)

                    //------titleIssue
                    document.titleIssue.innerHTML = data.chamados[i].titulo

                    //------titleID
                    document.titleID.innerHTML = data.chamados[i].idchamado

                    //------chamado
                    document.chamado.appendChild(div2, titleIssue, titleID)

                    //------centralinfos
                    document.centralinfos.appendChild(chamado)

                    //------infosMain
                    document.main.appendChild(centralinfos)
                }
            })
        })
        .catch((erro) => {
            return console.log(erro);
        })
}

document.addEventListener("DOMContentLoaded", loadIssues);