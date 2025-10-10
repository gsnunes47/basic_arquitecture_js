import express from "express";
import connectDB from database;
import Pedido from "./models/Pedido.js";

const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//executar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
