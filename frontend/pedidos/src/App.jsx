import { useEffect, useState } from "react"

function App() {

  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
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

    carregarPedidos()
  }, []) //const -> toda vez que mudar esta const 


  return (
    <>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>{JSON.stringify(pedido)}</li>
        ))}
      </ul>
    </>
  )
}

export default App
