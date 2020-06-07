import axios from 'axios'


export default class getInformations {
  constructor() {
    this.URL = 'https://cors-anywhere.herokuapp.com/https://www.tjsp.jus.br'
  }


  async getData(cep) {
    // Coleta a informação princial e retira pesquisa o código do prédio dentro do HTML retornado para a proxima pesquisa.
    try {
      var local = await axios.get(`${this.URL}/APP/CompetenciaTerritorial/Home/ListarCompetencias/?busca=${cep}&tipoBusca=1`)
      var LocalAddress = $(local.data).find('tbody').eq(1).html()
      var buildCode = this.getBuildCode(local.data)
    }
    catch (err) {
      var err = true
      return { errMSG: "Não foi possível coletar as informações necessárias." }
    }

    if (!err) {
      // Cole as informações adjacentes no pagina do TJ.
      try {
        var locationInfo = await axios.get(`${this.URL}/ListaTelefonica/RetornarResultadoBusca/?parmsEntrada=${buildCode}&codigoTipoBusca=2`)
        var BuildAddress = $(locationInfo.data).find(".lista-dados").eq(0).html()
        var BuildInformations = $(locationInfo.data).find(".lista-dados").eq(2).html()

        return {
          LocalAddress,
          BuildAddress,
          BuildInformations
        }
      }
      catch (error) {
        return { LocalAddress },
          console.warn('Não foi possílve carregar as informações adjacentes.')
      }
    }
  }

  getBuildCode(data) {
    var id = $(data).find("script").text()
    return id.substring(id.search((/"[1-9][0-9]{0,2}"/))).substring(1, 4)
  }

}