export default class getInformations {
    async getData(cep) {
      var local = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.tjsp.jus.br/APP/CompetenciaTerritorial/Home/ListarCompetencias/?busca=${cep}&tipoBusca=1`)
      var buildCode = this.getBuildCode(local.data)
      var locationInfo = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.tjsp.jus.br/ListaTelefonica/RetornarResultadoBusca/?parmsEntrada=${buildCode}&codigoTipoBusca=2`)
  
  
      let LocalAddress = $(local.data).find('tbody').eq(1).html()
      let BuildAddress = $(locationInfo.data).find(".lista-dados").eq(0).html()
      let BuildInformations = $(locationInfo.data).find(".lista-dados").eq(2).html()
  
      return {
        LocalAddress,
        BuildAddress,
        BuildInformations
      }
    }
  
  
    getBuildCode(data) {
      let id = $(data).find("script").text()
      return id.substring(id.search((/"[1-9][0-9]{0,2}"/))).substring(1, 4)
    }
  }