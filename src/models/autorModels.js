const mongoose = require ('mongoose');

const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    nacionalidade:  { type: String }
}, { versionKey: false});

const autor = mongoose.model('autores', autorSchema);

module.exports = {
    autor, 
    autorSchema
};