import express from "express";
import connectDB from "./database/database.js";
import Pedido from "./models/pedido.js";

const app = express()
const port = 3000
app.use(express.json())

connectDB();

// rotas / funções

app.post('/pedido', async (req, res) => {
  try {
    const novoPedido = await Pedido.create(req.body);
    res.json(novoPedido)
  } catch (error) {
    res.json({ error: error })
  }
})

app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedido.find()
    res.json(pedidos)
  } catch (error) {
    res.json({ error: error })
  }
})

app.put("/pedido/:id", async (req, res) => {
  try {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(pedidoAtualizado)
  } catch (error) {
    res.json({ error: error })
  }
})

app.delete("/pedido/:id", async (req, res) => {
  try {
    const pedidoExcluido = await Pedido.findByIdAndDelete(
      req.params.id
    );
    res.json(pedidoExcluido)
  } catch (error) {
    res.json({ error: error })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//executar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
