import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// 🔥 Banco fake em memória
let pedidos = [
  {
    id: 1,
    nome: "Gustavo",
    produto: "Notebook",
    quantidade: 1,
    status: "pendente"
  },
  {
    id: 2,
    nome: "Maria",
    produto: "Mouse",
    quantidade: 2,
    status: "enviado"
  },
  {
    id: 3,
    nome: "João",
    produto: "Teclado",
    quantidade: 1,
    status: "cancelado"
  }
];

let currentId = 4;


// -------------------
// POST - Criar pedido
// -------------------
app.post("/pedido", async (req, res) => {
  try {
    if (!req.body || !req.body.nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const novoPedido = {
      id: currentId++,
      ...req.body
    };

    pedidos.push(novoPedido);

    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
});

// -------------------
// GET - Listar pedidos
// -------------------
app.get("/pedidos", async (req, res) => {
  try {
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
});

// -------------------
// PUT - Atualizar pedido
// -------------------
app.put("/pedido/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = pedidos.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    pedidos[index] = {
      ...pedidos[index],
      ...req.body
    };

    res.json(pedidos[index]);

  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
});

// -------------------
// DELETE - Remover pedido
// -------------------
app.delete("/pedido/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pedidoExiste = pedidos.some(p => p.id === id);

    if (!pedidoExiste) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    pedidos = pedidos.filter(p => p.id !== id);

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
});

// -------------------
app.get("/", (req, res) => {
  res.send("API mock rodando 🚀");
});

// -------------------
app.listen(port, () => {
  console.log(`Servidor mock rodando na porta ${port}`);
});
