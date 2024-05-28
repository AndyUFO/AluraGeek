import { getProductos, agregarProducto, eliminarProducto } from "./conexion.js";

const btnEnviar = document.getElementById("btn-enviar");
const btnLimpiar = document.getElementById("btn-limpiar");

const nombre = document.querySelector("[data-nombre]");
const precio = document.querySelector("[data-precio]");
const url = document.querySelector("[data-url]");
let botonesEliminar = document.querySelectorAll("[data-borrar]");

async function showProductos() {
  const productos = await getProductos();
  productos.forEach((producto) => {
    let html = `
    <div class="card card-compact w-44 h-fit bg-base-300 shadow-xl">
              <figure>
                <img
                  class="w-auto object-center"
                  src="${producto.imagen}"
                  alt="Shoes"
                />
              </figure>
              <div class="card-body" content-between>
                <h2 class="card-title">${producto.nombre}</h2>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary" id="${producto.id}" data-borrar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>`;

    document.querySelector("[data-productos]").innerHTML += html;
  });
  botonesEliminar = document.querySelectorAll("[data-borrar]");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async () => {
      const id = boton.getAttribute("id");
      console.log("Borrando producto con id: " + id);
      await borrarElemento(id);
    });
  });
}

function limpiaProductos() {
  document.querySelector("[data-productos]").innerHTML = "";
}

btnEnviar.addEventListener("click", async () => {
  btnEnviar.preventDefault;
  if (!validarFormulario()) {
    return;
  } else {
    const producto = {
      nombre: nombre.value,
      precio: precio.value,
      imagen: url.value,
    };
    console.log("Enviando formulario " + JSON.stringify(producto));
    const status = await agregarProducto(producto);
    console.log(status);
  }
});

btnLimpiar.addEventListener("click", () => {
  btnLimpiar.preventDefault;
  console.log("Limpiando formulario");
  nombre.value = "";
  precio.value = "";
  url.value = "";
});

async function borrarElemento(id) {
  const status = await eliminarProducto(id);
  console.log(status);
}

function validarFormulario() {
  if (nombre.value === "" || precio.value === "" || url.value === "") {
    alert("Por favor llena todos los campos");
    return false;
  }

  return true;
}

limpiaProductos();
showProductos();
