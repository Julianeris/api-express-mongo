const express = require('express');
const conectaNaDatabase = require ('./config/dbConnect');
const routes = require ('./routes/index.js');

async function inicializaApp() {
    try {
      const conexao = await conectaNaDatabase();
      conexao.on('error', (erro) => {
        console.error('Erro de conexão', erro);
      });
  
      conexao.once('open', () => {
        console.log('conexão feita com sucesso');
      });
    
    } catch (error) {
      console.error('Erro ao inicializar o aplicativo', error);
    }
}
  
inicializaApp();

const app = express();
routes(app);

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send('Livro deletado')
})

module.exports = app;