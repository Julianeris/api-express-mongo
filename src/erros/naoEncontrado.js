const ErroBase = require("./erroBase.js");

class NaoEncontrado extends ErroBase {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem, 404);
  }
}

module.exports = NaoEncontrado;