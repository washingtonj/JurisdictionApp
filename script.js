class App {
  constructor() {
    this.get = new getInformations();
    this.render = new Render();
    this.start()


  }

  start() {
    document.querySelector('#button-addon2').addEventListener('click', async () => {
      if(document.querySelector('.table') !== null){
        document.querySelector('.body-container').innerText = ''
        document.querySelector('.table').innerText = ''
      }

      let cep = document.querySelector('.form-control').value

      this.render.loadingRender('.body-container')
      var Informations = await this.get.getData(cep)
      this.render.tableRender('table', '.input-container', Informations.LocalAddress)
      this.render.cardRender('.build-address', '.body-container', Informations.BuildAddress)
      this.render.cardRender('.build-informations', '.body-container', Informations.BuildInformations) 
      document.querySelector('.spinner-border').remove()

    })
  }
}


class getInformations {
  async getData(cep) {
    let location = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.tjsp.jus.br/APP/CompetenciaTerritorial/Home/ListarCompetencias/?busca=${cep}&tipoBusca=1`)
    let buildCode = this.getBuildCode(location.data)
    let locationInfo = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.tjsp.jus.br/ListaTelefonica/RetornarResultadoBusca/?parmsEntrada=${buildCode}&codigoTipoBusca=2`)
    
    let LocalAddress = $(location.data).find('tbody').eq(1).html()
    let BuildAddress = $(locationInfo.data).find(".lista-dados").eq(0).html()
    let BuildInformations = $(locationInfo.data).find(".lista-dados").eq(2).html()

    let objects = {
      LocalAddress,
      BuildAddress,
      BuildInformations
    }
    
    return objects
  }


  getBuildCode(data) {
    let id = $(data).find("script").text()
    return id.substring(id.search((/"[1-9][0-9]{0,2}"/))).substring(1, 4)
  }
}



class Render {
  tableRender(classid, query, data) {
    let thContent = ['CEP', 'LOGRADOURO', 'BAIRRO', 'FORUM']

    let div = document.createElement('div')
    div.setAttribute('class', classid)
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    tbody.innerHTML = data
    thContent.forEach(value => {
      let th = document.createElement('th')
      th.innerText = value
      thead.appendChild(th)
    })

    table.appendChild(thead)
    table.appendChild(tbody)
    div.appendChild(table)

    document.querySelector(query).appendChild(div)
  }

  cardRender(classid, query, data) {
    let CardDiv = document.createElement('div')
    CardDiv.setAttribute('class', 'card')
    let CardBody = document.createElement('div')
    CardBody.setAttribute('class', 'card-body')
    let insideDiv = document.createElement('div')
    insideDiv.setAttribute('class', classid)
    insideDiv.innerHTML = data


    CardDiv.appendChild(CardBody)
    CardBody.appendChild(insideDiv)

    document.querySelector(query).appendChild(CardDiv)
  }

  loadingRender(query) {
    let div = document.createElement('div')
    let span = document.createElement('span')
    div.setAttribute('class', 'spinner-border')
    div.setAttribute('role', 'status')
    div.appendChild(span)

    document.querySelector(query).appendChild(div)
  }
}


new App