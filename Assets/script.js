// ================== VARIABLES ==================
let libros = [];
const form = document.getElementById("formLibro");
const tabla = document.querySelector("#tablaLibros tbody");
// ================== Limpiar Campos ==================
function limpiarCampos() {
  document.getElementById("codigo").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("categoria").selectedIndex = 0; 
  document.getElementById("Año").value = "";
  document.getElementById("estado").selectedIndex = 0;
}
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
  limpiarCampos();
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
// ================== EDITAR Y ELIMINAR ==================
function editarLibro(index) {
    const libro =libros[index];
    document.querySelector("#codigo").value = libro.codigo;
    document.querySelector("#titulo").value = libro.titulo;
    document.querySelector("#autor").value = libro.autor;
    document.querySelector("#categoria").value = libro.categoria;
    document.querySelector("#Año").value = libro.Año;
    document.querySelector("#estado").value = libro.estado;
    libros.splice(index, 1);
    mostrarLibros();
    actualizarEstadisticas();
    actualizarCategorias();
}
function eliminarLibro(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
        libros.splice(index, 1);
        mostrarLibros();
        actualizarEstadisticas();
        actualizarCategorias();
         limpiarCampos();
    }
}