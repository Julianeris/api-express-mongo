const  { autor } =  require ('../models/autorModels.js')

class AutorController {
    
    static async listarAutores(req, res) {
        try{
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na requisição`});    
        }        
    };

    static async listarAutorPorId(req, res) {
        try{
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na requisição`});    
        }        
    };

    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message:'Criado com sucesso', autor: novoAutor });
        } catch (erro) {
            res.status(500).json({message:`${erro.message} - Falha ao cadastrar autor`});
        }
    };

    static async atualizarAutor(req, res) {
        try{
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: 'Autor atualizado' });
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na atualização do autor`});    
        }        
    };
    
    static async excluirAutorPorId(req, res) {
        try{
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: 'Autor excluído com sucesso'});
        } catch (error) {
            res.status(500).json({message:`${erro.message} - Falha na exclusão do autor`});    
        }        
    };
};

module.exports = AutorController