import { useEffect, useState } from "react"

function App() {

  const [pedidos, setPedidos] = useState([])

  const [formData, setFormData] = useState({
    nome: "",
    produto: "",
    quantidade: ""
  });
  
  async function carregarPedidos() {

    try {

      const pedidosReq = await fetch("http://localhost:3000/pedidos", {
        method: "GET"
      })

      const pedidos = await pedidosReq.json()
      setPedidos(pedidos)

    } catch (error) {

      console.error("Erro ao buscar pedidos: ", error)

    }
  
  }

  async function enviarPedido(e) {
    e.preventDefault();
    console.log(formData)

    try {
      
      const response = await fetch(
        "http://localhost:3000/pedido", {
          method: "POST",    
          headers: {
            "Content-Type": "application/json"
          },
          body:  JSON.stringify(formData)
        }
      )

      if(!response.ok){
        throw new Error("Erro ao enviar pedido")
      }

      setFormData({
        nome: "",
        produto: "",
        quantidade: ""
      })

      const novoPedido = await response.json()

      setPedidos((prev) => [...prev, novoPedido]);

    } catch (error) {

      console.log("erro ao enviar pedido")

    }

  }

  useEffect(() => {

    carregarPedidos()
  }, []) 


  return (
    <>
      <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
        
        <h1>Lista de Pedidos</h1>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {pedidos.map((pedido, index) => (
            <li
              key={pedido.id}
              style={{
                padding: "10px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "6px"
              }}
            >
              {JSON.stringify(pedido)}
            </li>
          ))}
        </ul>

        <hr style={{ margin: "30px 0" }} />

        <h2>Cadastrar Novo Pedido</h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}

        onSubmit={enviarPedido}
        >
          
          <div>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite o nome"
              style={{ width: "100%", padding: "6px" }}
              value={formData.nome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nome: e.target.value
                })
              }
            />
          </div>

          <div>
            <label>Produto</label>
            <input
              type="text"
              placeholder="Digite o produto"
              style={{ width: "100%", padding: "6px" }}
              value={formData.produto}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  produto: e.target.value
                })
              }
            />
          </div>

          <div>
            <label>Quantidade</label>
            <input
              type="number"
              placeholder="Quantidade"
              style={{ width: "100%", padding: "6px" }}
              value={formData.quantidade}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantidade: e.target.value
                })
              }
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cadastrar
          </button>

        </form>

      </div>
    </>

  )
}

export default App
