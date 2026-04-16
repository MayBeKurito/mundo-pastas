
const categorias = [
  {
    nombre: "Fideos",
    items: [
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Fideos Fusiles", precio: 5500 },
      { nombre: "Spaghetti", precio: 5200 }
    ]
  },
  {
    nombre: "Ravioles",
    items: [
      
        { nombre: "Ravioles Ricota", precio: 2700 },
        { nombre: "Ravioles Ricota", precio: 2700 },
        { nombre: "Ravioles Ricota", precio: 2700 },
        { nombre: "Ravioles Ricota", precio: 2700 },
        { nombre: "Ravioles Ricota", precio: 2700 },
        { nombre: "Ravioles Ricota", precio: 2700 },
        { nombre: "Ravioles Ricota", precio: 2700 },
      { nombre: "Ravioles Verdura", precio: 3000 }
    ]
  },
  {
    nombre: "Salsas",
    items: [
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Roja", precio: 1500 },
      { nombre: "Salsa Blanca", precio: 1800 }
    ]
  }
];

let pedido = [];

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("menu-container");

  categorias.forEach((cat, catIndex) => {

    // 🔥 contenedor de categoría
    const seccion = document.createElement("div");
    seccion.className = "categoria";

    // título
    const titulo = document.createElement("h3");
    titulo.textContent = cat.nombre;

    // grid
    const grid = document.createElement("div");
    grid.className = "grid";

    cat.items.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h4>${p.nombre}</h4>
        <p>$${p.precio}</p>
        <button onclick="agregar(${catIndex}, ${index})">Agregar</button>
      `;

      grid.appendChild(card);
    });

    // 🔥 armamos la estructura correcta
    seccion.appendChild(titulo);
    seccion.appendChild(grid);

    contenedor.appendChild(seccion);
  });
});

function agregar(catIndex, index) {
  const producto = categorias[catIndex].items[index];

  const existente = pedido.find(p => p.nombre === producto.nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    pedido.push({ ...producto, cantidad: 1 });
  }

  actualizarTotal();
}

function actualizarTotal() {
  let total = 0;
  let lista = "";

  pedido.forEach((p, index) => {
    let subtotal = p.precio * p.cantidad;
    total += subtotal;

    lista += `
      <div class="item-pedido">
        <span class="texto-item">•${p.nombre} x${p.cantidad} ($${subtotal})</span>
        <button class="btn-eliminar" onclick="eliminar(${index})">✕</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: $" + total;
  document.getElementById("lista-pedido").innerHTML = lista;
}

function eliminar(index) {
  pedido.splice(index, 1);
  actualizarTotal();
}



function enviarWhatsApp() {
  if (pedido.length === 0) return alert("Agregá algo");

  let mensaje = "Hola, quiero pedir:%0A";

  pedido.forEach(p => {
    mensaje += `- ${p.nombre} ($${p.precio})%0A`;
  });

  let total = pedido.reduce((acc, p) => acc + p.precio, 0);
  mensaje += `%0ATotal: $${total}`;

  window.open(`https://wa.me/5491135598809?text=${mensaje}`);
}