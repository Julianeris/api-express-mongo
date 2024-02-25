const express = require('express');
const AutorController = require('../controllers/autorControllers.js');

const routes = express.Router();

routes.get('/autores', AutorController.listarAutores);
routes.get('/autores/:id', AutorController.listarAutorPorId);
routes.post('/autores', AutorController.cadastrarAutor);
routes.put('/autores/:id', AutorController.atualizarAutor);
routes.delete('/autores/:id', AutorController.excluirAutorPorId);

module.exports = routes