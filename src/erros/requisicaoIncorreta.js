const  ErroBase = require("./erroBase.js");

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

module.exports = RequisicaoIncorreta;