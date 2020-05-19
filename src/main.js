import Render from './modules/render'
import getInformations from './modules/getInformations'


class App {
  constructor() {
    this.get = new getInformations();
    this.render = new Render();
    this.start()


  }

  start() {
    document.querySelector('#button-addon2').addEventListener('click', async () => {
      if (document.querySelector('.table') !== null) {
        document.querySelector('.body-container').innerText = ''
        document.querySelector('.table').remove()
      }

      let cep = document.querySelector('.form-control').value

      this.render.loadingRender('.body-container')
      
      try {
        var Informations = await this.get.getData(cep)
      } 
      catch (error) {
        alert('Ocorreu um erro ao carregar as informações, verifique o CEP ou tente novamente mais tarde')
        location.reload()
      }

      this.render.tableRender('table', '.input-container', Informations.LocalAddress)
      this.render.cardRender('.build-address', '.body-container', Informations.BuildAddress)
      this.render.cardRender('.build-informations', '.body-container', Informations.BuildInformations)
      this.render.loadingRender('.body-container', false)

    })
  }
}

new App