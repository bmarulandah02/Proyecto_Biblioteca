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