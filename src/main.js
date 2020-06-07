import Render from './modules/render'
import getInformations from './modules/getInformations'

import './styles/style.css'

class App {
  constructor() {
    this.get = new getInformations();
    this.render = new Render();
    this.inProcess = false
    this.startListerner()
  }

  startListerner() {
    document.querySelector('#button-addon2').addEventListener('click', event => this.preVerify(event))
  }


  preVerify(event) {
    var cep = document.querySelector('.form-control').value

    if (event.type == "click" && this.inProcess === false) {
      
      this.inProcess = true
    
      // Se uma tabela já estiver renderizada, exclua. 
      if (!!document.querySelector('.table')) {
        document.querySelector('.body-container').innerText = ''
        document.querySelector('.table').remove()
      }

      // Se o campo CEP não conter 8 digitos, não processe. 
      if (cep.length === 8) {
        this.informationsProcess(cep).then(() => this.inProcess = false)
      }
    }
  }


  async informationsProcess(cep) {
    this.render.loading('.body-container')
    var Informations = await this.get.getData(cep)
    
    if (!!Informations.Local && !!Informations.BuildAddress || !!Informations.BuildInformations) {
      this.render.table('table', '.input-container', Informations.LocalAddress)
      this.render.card('.build-address', '.body-container', Informations.BuildAddress)
      this.render.card('.build-informations', '.body-container', Informations.BuildInformations)
    } else {
      alert('Não foi possível encontrar as informações necessárias, tente novamente.')
    }
  
    this.render.loading('.body-container', false)
  
  }
}

new App