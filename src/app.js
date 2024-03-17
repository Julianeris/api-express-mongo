const express = require("express");
const conectaNaDatabase = require ("./config/dbConnect");
const routes = require ("./routes/index.js");
const mapinuladorDeErros = require("./middlewares/mainupadorDeErros.js");
const manipulador404 = require("./middlewares/manipulador404.js");

async function inicializaApp() {
  try {
    const conexao = await conectaNaDatabase();
    conexao.on("error", (erro) => {
      console.error("Erro de conexão", erro);
    });
  
    conexao.once("open", () => {
      console.log("conexão feita com sucesso");
    });
    
  } catch (error) {
    console.error("Erro ao inicializar o aplicativo", error);
  }
}
  
inicializaApp();

const app = express();
routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(mapinuladorDeErros);

module.exports = app;