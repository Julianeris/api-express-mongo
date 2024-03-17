const mongoose  = require("mongoose");
const ErroBase = require("../erros/erroBase.js");
const RequisicaoIncorreta = require("../erros/requisicaoIncorreta.js");
const ErroValidacao = require("../erros/erroValidacao.js");
const NaoEncontrado = require("../erros/naoEncontrado.js");

// eslint-disable-next-line no-unused-vars
function mapinuladorDeErros (erro, req, res, next) {
  if(erro instanceof mongoose.Error.CastError){
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado){
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

module.exports = mapinuladorDeErros;