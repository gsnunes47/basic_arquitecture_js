import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    numero: { type: String, required: true }
})

const itemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
})

const pedidoSchema = new mongoose.Schema({
    cliente: clienteSchema,
    items: [ itemSchema ],
    endereco: { type: String, required: true },
    estado: { type: Boolean, default: false }
})

export default mongoose.model("Pedido", pedidoSchema);
