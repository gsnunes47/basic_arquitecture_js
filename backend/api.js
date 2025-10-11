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

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//executar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
