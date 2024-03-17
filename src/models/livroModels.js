const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O título do livro é obrigatório"] 
  },
  editora:  { 
    type: String, 
    required: [true, "A editora é obrigatória"],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido"
    }
  },
  preco: { type: Number },
  paginas: { 
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de página deve estar entre 10 e 5000"
    }
  },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "autor" },
});

const livro = mongoose.model("livros", livroSchema);

module.exports = {
  livro, 
  livroSchema
};