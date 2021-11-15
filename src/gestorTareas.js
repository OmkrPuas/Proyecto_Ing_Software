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

const boton_filtro_categoria = document.querySelector("#filtro-categoria");
const categoria_filtro = document.querySelector("#categoria-filtro");

const boton_filtro_etiquetas = document.querySelector("#filtro-etiquetas");
const etiquetas_filtro = document.querySelector("#etiquetas-filtro");

const boton_filtro_dia = document.querySelector("#filtro-dia");
const dia_filtro = document.querySelector("#dia-filtro");

const boton_filtro_descripcion = document.querySelector("#filtro-descripcion");
const descripcion_filtro = document.querySelector("#descripcion-filtro");
var id = 0;

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  // console.log(values);
  return values;
  
}

boton_elem.addEventListener("click", (event) => {
  let validacionFecha = gestor.validarFechaLimite(fecha_elem.value);
  let etiquetas = getSelectedCheckboxValues('etiqueta');
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
  for(var i = lista.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +lista[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + lista[i].categoria +"</li>"+ "<li>" + "Descripcion: " + lista[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + lista[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + lista[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorTituloT(titulo_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Titulo:' " + titulo_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  // var aux = lista_elem.innerHTML;
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_categoria.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorCategoria(categoria_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Categoria:' " + categoria_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_etiquetas.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorEtiqueta(etiquetas_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Etiqueta:' " + etiquetas_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});
boton_filtro_dia.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorDia(dia_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea para el dia:' " + dia_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_descripcion.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorDescripcion(descripcion_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea para la descripcion:' " + descripcion_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});
