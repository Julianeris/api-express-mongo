const express = require('express');
const LivroController = require('../controllers/livroControllers.js');

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);
routes.get('/livros/busca', LivroController.listarLivrosPorEditora);
routes.get('/livros/:id', LivroController.listarLivroPorId);
routes.post('/livros', LivroController.cadastrarLivro);
routes.put('/livros/:id', LivroController.atualizarLivro);
routes.delete('/livros/:id', LivroController.excluirLivroPorId);

module.exports = routes