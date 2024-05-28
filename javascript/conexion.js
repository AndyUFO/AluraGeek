export async function getProductos() {
  const productos = await fetch("http://localhost:3000/productos", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const productosJson = await productos.json();
  return productosJson;
}

export async function agregarProducto(producto) {
  const data = await fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  return data.status;
}

export async function eliminarProducto(id) {
  const data = await fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  return data.status;
} 
