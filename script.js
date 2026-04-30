document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("menu-container");

  categorias.forEach((cat, catIndex) => {
    const seccion = document.createElement("div");
    seccion.className = "categoria";

    const titulo = document.createElement("h3");
    titulo.textContent = cat.nombre;

    const grid = document.createElement("div");
    grid.className = "grid";

    cat.items.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-info">
          <h4>${p.nombre}</h4>
          <p>$${p.precio}</p>
        </div>
        <button onclick="agregar(${catIndex}, ${index})">Agregar</button>
      `;

      grid.appendChild(card);
    });

    seccion.appendChild(titulo);
    seccion.appendChild(grid);
    contenedor.appendChild(seccion);
  });

  const carrito = document.querySelector(".carrito");

  document.querySelector(".carrito-icono").addEventListener("click", () => {
    carrito.classList.toggle("abierto");
  });

  document.querySelector(".btn-cerrar").addEventListener("click", () => {
    carrito.classList.remove("abierto");
  });
});