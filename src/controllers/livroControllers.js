const livro =  require ('../models/livroModels.js');
const { autor } = require ('../models/autorModels.js');

class LivroController {
    
    static async listarLivros(req, res) {
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na requisição`});    
        }        
    };

    static async listarLivroPorId(req, res) {
        try{
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na requisição`});    
        }        
    };

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: {... autorEncontrado._doc }}
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message:'Criado com sucesso', livro: novoLivro });
        } catch (erro) {
            res.status(500).json({message:`${erro.message} - Falha ao cadastrar livro`});
        }
    };

    static async atualizarLivro(req, res) {
        try{
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: 'Livro atualizado' });
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na atualização do livro`});    
        }        
    };
    
    static async excluirLivroPorId(req, res) {
        try{
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: 'Livro excluído com sucesso'});
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na exclusão do livro`});    
        }        
    };

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora
        try{
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (error){
            res.status(500).json({message:`${erro.message} - Falha na busca`});    
        }
    }
};

module.exports = LivroController