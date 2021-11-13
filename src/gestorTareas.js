import * as gestor from './app.js';

const tarea_elem = document.querySelector("#tarea");
const fecha_elem = document.querySelector("#fecha");
const descripcion_elem = document.querySelector("#descripcion");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const categoria_elem = document.querySelector("#select-categoria");
const mostrarTareas_elem = document.querySelector("#mostrar-tareas");

//FILTROS
const boton_filtro = document.querySelector("#filtro-titulo");
const titulo_filtro = document.querySelector("#titulo-filtro");

var id = 0;

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}

boton_elem.addEventListener("click", (event) => {
  let validacionFecha = gestor.validarFechaLimite(fecha_elem.value);
  let etiquetas = getSelectedCheckboxValues('etiqueta');
  console.log(etiquetas);
  if(etiquetas.length > 5){
    alert("No se pudo crear la tarea, DEMASIADAS ETIQUETAS.")
    tarea_elem.value = "";
    fecha_elem.value = "";
    descripcion_elem.value = "";
  }else{
    if(validacionFecha == "No se pudo crear la tarea, FECHA INVALIDA."){
      alert("No se pudo crear la tarea, FECHA INVALIDA.")
      tarea_elem.value = "";
      fecha_elem.value = "";
      descripcion_elem.value = "";
    }else{
      if(tarea_elem.value == ""){
        alert("No se pudo crear la tarea, TITULO INVALIDO.")
        descripcion_elem.value = "";
        fecha_elem.value = "";
      }else{
          if(etiquetas == ""){
            etiquetas = "n/a";
          }
          if(descripcion_elem.value == ""){
            descripcion_elem.value = "n/a";
          }
          let tarea = gestor.classTarea(id, tarea_elem.value, validacionFecha, categoria_elem.value, descripcion_elem.value, etiquetas);
          gestor.añadirAListaTarea(tarea);
          id++;
          var aux = lista_elem.innerHTML;
          lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tarea.titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tarea.etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>"  + aux;
          tarea_elem.value = "";
          fecha_elem.value = "";
          descripcion_elem.value = "";

          var elements = document.getElementsByName("etiqueta");
          for(var i = 0; i < elements.length; i++){
            elements[i].checked = false;
          }
          alert("Tarea Creada!");
      }
    }
  }
});

mostrarTareas_elem.addEventListener("click", (event) => {
  let lista = gestor.getListaTareas();
  lista_elem.innerHTML = "";
  for(var i = 0; i < lista.length; i++){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +lista[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + lista[i].categoria +"</li>"+ "<li>" + "Descripcion: " + lista[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + lista[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + lista[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorTituloT(titulo_filtro.value);
  lista_elem.innerHTML = "";
  var aux = lista_elem.innerHTML;
  for(var i = 0; i < tareasFiltradas.length; i++){
    lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>"  + aux;
  }
});

