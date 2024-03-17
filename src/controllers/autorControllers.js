const NaoEncontrado = require("../erros/naoEncontrado.js");
const  { autor } =  require ("../models/autorModels.js");

class AutorController {
  static listarAutores = async(req, res) => {
    try{
      const listarAutores = await autor.find();

      res.status(200).json(listarAutores);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });    
    }        
  };

  static listarAutorPorId = async(req, res, next) => {
    try{
      const id = req.params.id;

      const autorEncontrado = await autor.findById(id);
      res.status(200).send(autorEncontrado);
      if (!autorEncontrado){
        next(new NaoEncontrado)("Autor não encontrado.");
      } 
    } catch (error) {
      next(error);
    }        
  };

  static async cadastrarAutor(req, res){
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message:"Criado com sucesso", autor: novoAutor });
    } catch (erro) {
      res.status(500).json({message:`${erro.message} - Falha ao cadastrar autor`});
    }
  }

  static atualizarAutor = async(req, res, next) => {
    try{
      const id = req.params.id;

      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "Autor atualizado" });
      if(!id){
        next(new NaoEncontrado)("Autor não encontrado!");
      }
    } catch (error) {
      next(error);
    }        
  };
    
  static excluirAutorPorId = async(req, res, next) => {
    try{
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({message: "Autor excluído com sucesso"});
      if(!id){
        next(new NaoEncontrado)("Autor não encontrado!");
      }
    } catch (error) {
      next(error);
    }        
  };
}

module.exports = AutorController;