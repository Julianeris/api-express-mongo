const { autor } =  require ("../models/autorModels.js");
const { livro } = require ("../models/livroModels.js");
const NaoEncontrado = require("../erros/naoEncontrado.js");

class LivroController {
    
  static listarLivros = async(req, res, next) => {
    try{
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }        
  };

  static listarLivroPorId = async(req, res, next) => {
    try{
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
      if(!livroEncontrado){
        next(new NaoEncontrado)("Livro não encontrado");
      }
    } catch (error) {
      next(error);
    }        
  };

  static cadastrarLivro = async(req, res, next) => {
    const novoLivro = req.body;
    try{
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: {... autorEncontrado._doc }};
      await livro.create(livroCompleto);
      res.status(201).json({ message:"Criado com sucesso", livro: novoLivro });
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async(req, res, next) => {
    try{
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "Livro atualizado" });
      if(!id){
        next(new NaoEncontrado)("Livro não encontrado");
      }
    } catch (error) {
      next(error);
    }        
  };
    
  static excluirLivroPorId = async(req, res, next) => {
    try{
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({message: "Livro excluído com sucesso"});
      if(!id){
        next(new NaoEncontrado)("Livro não encontrado!");
      }
    } catch (error) {
      next(error);
    }        
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await livro
          .find(busca)
          .populate("autor");

        res.status(200).send(livrosResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // lte = Less Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autor.findOne({ nome: nomeAutor }); 

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      // Retornar um objeto vazio em vez de null
      return {};
    }
  }

  return busca;
}

module.exports = LivroController;