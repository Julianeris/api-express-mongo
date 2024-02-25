const express = require ('express');
const livros = require ('./livroRoutes.js');
const autores = require('./autorRoutes.js');

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Curso de Node.js'));

    app.use(express.json(), livros, autores); //aqui adiciono todas as rotas (livros/editores e etc)
};

module.exports = routes;