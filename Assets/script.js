// ================== VARIABLES ==================
let libros = [];
const form = document.getElementById('formLibro');
const tabla = document.querySelector('#tablaLibros tbody');
// ================== Limpiar Campos ==================
function limpiarCampos() {
	document.querySelector('#codigo').value = '';
	document.querySelector('#titulo').value = '';
	document.querySelector('#autor').value = '';
	document.querySelector('#categoria').selectedIndex = 0;
	document.querySelector('#Año').value = '';
	document.querySelector('#estado').selectedIndex = 0;
}
// ================== EVENTO GUARDAR ==================
form.addEventListener('submit', function (e) {
	e.preventDefault();

	const libro = {
		codigo: document.querySelector('#codigo').value,
		titulo: document.querySelector('#titulo').value,
		autor: document.querySelector('#autor').value,
		categoria: document.querySelector('#categoria').value,
		Año: document.querySelector('#Año').value,
		estado: document.querySelector('#estado').value,
	};
	limpiarCampos();
	libros.push(libro);
	mostrarLibros();
	actualizarEstadisticas();
	actualizarCategorias();
});

// ================== MOSTRAR LIBROS ==================
function mostrarLibros() {
	tabla.innerHTML = '';
	libros.forEach((libro, index) => {
		const fila = document.createElement('tr');
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
	const libro = libros[index];
	document.querySelector('#codigo').value = libro.codigo;
	document.querySelector('#titulo').value = libro.titulo;
	document.querySelector('#autor').value = libro.autor;
	document.querySelector('#categoria').value = libro.categoria;
	document.querySelector('#Año').value = libro.Año;
	document.querySelector('#estado').value = libro.estado;
	libros.splice(index, 1);
	mostrarLibros();
	actualizarEstadisticas();
	actualizarCategorias();
}
let libroAEditar = null; // variable temporal

function editarLibro(index) {
	libroAEditar = index; // guardamos el índice
	const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
	modal.show(); // mostramos el modal
}

document
	.querySelector('#btnConfirmarEditar')
	.addEventListener('click', function () {
		if (libroAEditar !== null) {
			// obtener instancia del modal
			const modal = bootstrap.Modal.getInstance(
				document.querySelector('#modalEditar'),
			);
			modal.hide(); // cerrar modal

			const confirmar = confirm('¿Seguro que quieres editar este libro?');
			if (confirmar) {
				// cargar datos del libro en el formulario
				const libro = libros[libroAEditar];
				document.querySelector('#codigo').value = libro.codigo;
				document.querySelector('#titulo').value = libro.titulo;
				document.querySelector('#autor').value = libro.autor;
				document.querySelector('#categoria').value = libro.categoria;
				document.querySelector('#Año').value = libro.Año;
				document.querySelector('#estado').value = libro.estado;

				// eliminar el libro de la lista para que se reemplace al guardar
				libros.splice(libroAEditar, 1);
			}

			// resetear variable
			libroAEditar = null;
		}
	});
// ==================
let libroAEliminar = null; // variable temporal

function eliminarLibro(index) {
	libroAEliminar = index; // guardamos el índice
	const modal = new bootstrap.Modal(document.querySelector('#modalEliminar'));
	modal.show(); // mostramos el modal
}

document
	.querySelector('#btnConfirmarEliminar')
	.addEventListener('click', function () {
		if (libroAEliminar !== null) {
			// obtener instancia del modal
			const modal = bootstrap.Modal.getInstance(
				document.querySelector('#modalEliminar'),
			);
			// cerrar el modal ANTES de lanzar confirm()
			modal.hide();
			// segunda confirmación con alert clásico
			const confirmar = confirm('¿Seguro que quieres eliminar este libro?');
			if (confirmar) {
				// eliminar del arreglo
				libros.splice(libroAEliminar, 1);
				// refrescar tabla y estadísticas
				mostrarLibros();
				actualizarEstadisticas();
				actualizarCategorias();
			}
			// resetear variable
			libroAEliminar = null;
		}
	});
// ================== ESTADÍSTICAS ==================
function actualizarEstadisticas() {
	document.querySelector('#total').textContent = libros.length;
	document.querySelector('#disponibles').textContent = libros.filter(
		(l) => l.estado === 'Disponible',
	).length;
	document.querySelector('#prestados').textContent = libros.filter(
		(l) => l.estado === 'Prestado',
	).length;
	const categorias = [...new Set(libros.map((l) => l.categoria))];
	document.querySelector('#categorias').textContent = categorias.length;
}
// ================== BÚSQUEDA ==================
document.querySelector('#buscar').addEventListener('input', function () {
	const texto = this.value.toLowerCase();
	const filtrados = libros.filter(
		(l) =>
			l.codigo.toLowerCase().includes(texto) ||
			l.titulo.toLowerCase().includes(texto) ||
			l.autor.toLowerCase().includes(texto),
	);
	mostrarFiltrados(filtrados);
});

function mostrarFiltrados(lista) {
	tabla.innerHTML = '';
	lista.forEach((libro, index) => {
		const fila = document.createElement('tr');
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
// ================== FILTROS Y ORDENAMIENTO ==================
document.querySelector('#filtroEstado').addEventListener('change', function () {
	const estado = this.value;
	const filtrados = estado ? libros.filter((l) => l.estado === estado) : libros;
	mostrarFiltrados(filtrados);
});

document.querySelector('#ordenarTitulo').addEventListener('click', function () {
	libros.sort((a, b) => a.titulo.localeCompare(b.titulo));
	mostrarLibros();
});

document.querySelector('#ordenarAño').addEventListener('click', function () {
	libros.sort((a, b) => a.Año - b.Año);
	mostrarLibros();
});
// Escuchar cambios en el filtro de categoría
document
	.querySelector('#filtroCategoria')
	.addEventListener('change', function () {
		mostrarLibros(); // refrescar la tabla aplicando el filtro
	});

function mostrarLibros() {
	const tbody = document.querySelector('#tablaLibros tbody');
	tbody.innerHTML = '';

	// obtener valor del filtro
	const filtroCategoria = document.querySelector('#filtroCategoria').value;

	libros.forEach((libro, index) => {
		// aplicar filtro
		if (filtroCategoria === '' || libro.categoria === filtroCategoria) {
			const fila = document.createElement('tr');
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
			tbody.appendChild(fila);
		}
	});
}
