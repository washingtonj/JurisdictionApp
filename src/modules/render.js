import 'bootstrap'

export default class Render {
    table(classid, query, data) {
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
  
    card(classid, query, data) {
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
  
    loading(query, loading = true) {
      if (loading === true) {
        let div = document.createElement('div')
        let span = document.createElement('span')
        div.setAttribute('class', 'spinner-border')
        div.setAttribute('role', 'status')
        div.appendChild(span)
        document.querySelector(query).appendChild(div)
      }
      else {
        document.querySelector('.spinner-border').remove()
      }
    }
  }
