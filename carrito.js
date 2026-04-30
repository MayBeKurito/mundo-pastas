let pedido = [];

function agregar(catIndex, index) {
  const estabaVacio = pedido.length === 0;
  const producto = categorias[catIndex].items[index];
  const categoria = categorias[catIndex].nombre;

  const existente = pedido.find(
    p => p.id === producto.id && p.categoria === categoria
  );

  if (existente) {
    existente.cantidad++;
  } else {
    pedido.push({ ...producto, categoria, cantidad: 1 });
  }

  if (estabaVacio) {
    document.querySelector(".carrito").classList.add("abierto");
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
        <span class="texto-item">
          •${p.nombre} x${p.cantidad} ($${subtotal})
        </span>
        <button class="btn-eliminar" onclick="eliminar(${index})">✕</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: $" + total;
  document.getElementById("lista-pedido").innerHTML = lista;

  const mensaje = document.getElementById("mensaje-vacio");

  if (pedido.length === 0) {
    mensaje.style.display = "block";
    document.querySelector(".carrito").classList.remove("abierto");
  } else {
    mensaje.style.display = "none";
  }
}

function eliminar(index) {
  pedido.splice(index, 1);
  actualizarTotal();
}

function enviarWhatsApp() {
  if (pedido.length === 0) return alert("Agregá algo");

  let mensaje = "Hola, quiero pedir:%0A";

  pedido.forEach(p => {
    mensaje += `- ${p.nombre}(x${p.cantidad})%0A`;
  });

  let total = pedido.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  mensaje += `%0ATotal: $${total}`;

 window.open(`https://wa.me/5491135598809?text=${encodeURIComponent(mensaje)}`);
}