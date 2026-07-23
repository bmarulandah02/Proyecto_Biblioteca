// ================== VARIABLES ==================
let libros = [];
const form = document.getElementById("formLibro");
const tabla = document.querySelector("#tablaLibros tbody");
// ================== EVENTO GUARDAR ==================
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const libro = {
    codigo: document.querySelector("#codigo").value,
    titulo: document.querySelector("#titulo").value,
    autor: document.querySelector("#autor").value,
    categoria: document.querySelector("#categoria").value,
    Año: document.querySelector("#Año").value,
    estado: document.querySelector("#estado").value
  };

  libros.push(libro);
  mostrarLibros();
  actualizarEstadisticas();
  actualizarCategorias();
  form.reset();
});
// ================== MOSTRAR LIBROS ==================
function mostrarLibros() {
  tabla.innerHTML = "";
  libros.forEach((libro, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${libro.codigo}</td>
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.categoria}</td>
      <td>${libro.Año}</td>
      <td>${libro.estado}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarLibro(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarLibro(${index})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}