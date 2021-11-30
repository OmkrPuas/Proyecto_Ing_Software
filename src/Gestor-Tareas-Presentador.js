import * as gestor from './Tarea-logica-negocios.js';
import * as listas from './Listas-logica-negocios.js';
import * as validaciones from './Validaciones-logica-negocios.js';
import {Tarea} from './Tarea-logica-negocios.js';

//gestor.algo
const tarea_elem = document.querySelector("#tarea");
const fecha_elem = document.querySelector("#fecha");
const descripcion_elem = document.querySelector("#descripcion");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const categoria_elem = document.querySelector("#select-categoria");
const mostrarTareas_elem = document.querySelector("#mostrar-tareas");

//Alertar Fecha Limite 
const boton_alertar = document.querySelector("#revisar-fechas");

//Añadir etiqueta
const boton_nueva_etiqueta = document.querySelector("#añadir-etiqueta");
const nueva_etiqueta = document.querySelector("#nueva-etiqueta");
const form_etiquetas = document.querySelector("#form-etiquetas");

//FILTROS
const boton_filtro = document.querySelector("#filtro-titulo");
const titulo_filtro = document.querySelector("#titulo-filtro");

const boton_filtro_categoria = document.querySelector("#filtro-categoria");
const categoria_filtro = document.querySelector("#categoria-filtro");

const boton_filtro_etiquetas = document.querySelector("#filtro-etiquetas");
const etiquetas_filtros2 = document.getElementById("etiquetas-filtro-2");

const boton_filtro_dia = document.querySelector("#filtro-dia");
const dia_filtro = document.querySelector("#dia-filtro");

const boton_filtro_descripcion = document.querySelector("#filtro-descripcion");
const descripcion_filtro = document.querySelector("#descripcion-filtro");

//Tareas Completadas
const boton_filtro_tareas_completadas = document.querySelector("#filtro-tareas-completadas");
const boton_filtro_completadas_categorias = document.querySelector("#filtro-completadas-por-categoria");
const categoria_completadas_filtro = document.querySelector("#categoria-completadas-filtro");

const dia_Inicio_filtro = document.querySelector("#dia-completada-filtroInicio");
const dia_Final_filtro = document.querySelector("#dia-completada-filtroFinal");
const boton_filtro_completadas_fechas = document.querySelector("#filtro-completadas-por-fechas");

var id = 0;

// gestor.inicializarListas();

window.completarTarea = function completarTarea(id) {
  gestor.completarTareaPendiente(id);
  alert("Tarea Terminada con el id:"+ id);
  mostrarTareas_elem.click();
  document.getElementById("visualizar-filtros-tareas-completadas").style="visibility: visible;";
}

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  // console.log(values);
  return values;
}

function limpiarCampos(){
  tarea_elem.value = "";
  fecha_elem.value = "";
  descripcion_elem.value = "";
  titulo_filtro.value = "";
  descripcion_filtro.value = "";
  dia_filtro.value = "";

  var elements = document.getElementsByName("etiqueta");
  for(var i = 0; i < elements.length; i++){
    elements[i].checked = false;
  }

  var elements = document.getElementsByName("filtro-etiqueta");
  for(var i = 0; i < elements.length; i++){
    elements[i].checked = false;
  }
}

function validarTarea(titulo, fecha, etiquetas){
  let error = false;
  if(etiquetas > 5){
    alert("No se pudo crear la tarea, DEMASIADAS ETIQUETAS.");
  }else{
    if(fecha == "No se pudo crear la tarea, FECHA INVALIDA."){
      alert("No se pudo crear la tarea, FECHA INVALIDA.");
    }else{
      if(titulo == ""){
        alert("No se pudo crear la tarea, TITULO INVALIDO.");
      }else{
        error = true;
      }
    }
  }
  return error;
}

boton_elem.addEventListener("click", (event) => {
  let validacionFecha = validaciones.validarFechaLimite(fecha_elem.value);
  let etiquetas = getSelectedCheckboxValues('etiqueta');
  
  if(validarTarea(tarea_elem.value, validacionFecha, etiquetas.length)){
    etiquetas = validaciones.verificarCampoVacio(etiquetas);
    descripcion_elem.value = validaciones.verificarCampoVacio(descripcion_elem.value);
    //objetoTarea
    let tarea = new Tarea(id, tarea_elem.value, validacionFecha, categoria_elem.value, descripcion_elem.value, etiquetas, false);
    listas.añadirAListaTarea(tarea);
    lista_elem.innerHTML = "";
    id++;
    let lista = listas.getListaTareas();
    for(var i = lista.length - 1; i >= 0 ; i--){
      let boton_prueba = "<button  id='completar-" + lista[i].id + "' onclick='completarTarea("+lista[i].id+");'>Completar</button>";
      lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +lista[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + lista[i].categoria +"</li>"+ "<li>" + "Descripcion: " + lista[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + lista[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + lista[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>" + boton_prueba;
    }
    alert("Tarea Creada!");
    document.getElementById("visualizar-filtros-tareas-pendientes").style="visibility: visible;";
  }
  limpiarCampos();
});

mostrarTareas_elem.addEventListener("click", (event) => {
  let lista = listas.getListaTareas();
  lista_elem.innerHTML = "";
  for(var i = lista.length - 1; i >= 0 ; i--){
    let boton_prueba = "<button onclick='completarTarea("+lista[i].id+")'>Completar</button>";
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +lista[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + lista[i].categoria +"</li>"+ "<li>" + "Descripcion: " + lista[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + lista[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + lista[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>" + boton_prueba;
  }
  limpiarCampos();

});

boton_filtro.addEventListener("click", (event) => {
  let tareasFiltradas = listas.getListaTareasPorTituloT(titulo_filtro.value);
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
  let tareasFiltradas = listas.getListaTareasPorCategoria(categoria_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Categoria:' " + categoria_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_etiquetas.addEventListener("click", (event) => {
  let tareasFiltradas = listas.getListaTareasPorEtiqueta(etiquetas_filtros2.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Etiqueta:'" + etiquetas_filtros2.value +"' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
  limpiarCampos();
});

boton_filtro_dia.addEventListener("click", (event) => {
  let tareasFiltradas = listas.getListaTareasPorDia(dia_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea para el dia:' " + dia_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_descripcion.addEventListener("click", (event) => {
  let tareasFiltradas = listas.getListaTareasPorDescripcion(descripcion_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea para la descripcion:' " + descripcion_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_alertar.addEventListener("click", (event) => {
  let pendientes = gestor.revisarFechasLimites();
  const urgentes = document.querySelector("#urgentes");
  urgentes.value = pendientes;
  alert("Hay "+ pendientes +" Tareas para mañana");
});

boton_nueva_etiqueta.addEventListener("click", (event) => {
  let nuevaEtiqueta = nueva_etiqueta.value;
  let etiquetas = form_etiquetas.innerHTML;
  let etiqueta_nueva2 = "<option value='"+nuevaEtiqueta+"'>"+nuevaEtiqueta+"</option>";
  let etiqueta_nueva = "<input type='checkbox' id='etiqueta' name='etiqueta' value='"+ nuevaEtiqueta + "' /><label for='etiqueta3'>" + nuevaEtiqueta + "</label><br />";
  //let etiqueta_nueva_filtro = "<input type='checkbox' id='etiqueta' name='filtro-etiqueta' value='"+ nuevaEtiqueta + "' /><label for='etiqueta3'>" + nuevaEtiqueta + "</label><br />";
  form_etiquetas.innerHTML = etiquetas + etiqueta_nueva;

  let vara = etiquetas_filtros2.innerHTML;
  etiquetas_filtros2.innerHTML = vara + etiqueta_nueva2;


  gestor.crearNuevaEtiqueta(nuevaEtiqueta);
});

boton_filtro_tareas_completadas.addEventListener("click", (event) => {  


  let Informe = listas.getNumTareasCompletadasPorCategoria();
  let totalCompletadas = listas.getListaCompletadasTareas().length;
  let totalPendientes = listas.getListaTareas().length;
  let porcentaje = 0;
  if(totalPendientes > 0 || totalCompletadas > 0){
    porcentaje = (totalCompletadas / (totalCompletadas + totalPendientes)) * 100; 
  }
  let labelInforme = "<label>" + "Tareas completadas por categoria: " + "Trabajo:" + Informe["trabajo"] + " Familia:" + Informe["familia"] + " Personal:" + Informe["personal"] + " Otros:" + Informe["otros"] +  "</label>" + "<br> <label> Porcentaje de tareas Completadas: " + porcentaje.toFixed(2) + " % </label>";

  let tareasFiltradas = listas.getListaCompletadasTareas();
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea completa");
  }
  lista_elem.innerHTML = labelInforme;
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_completadas_categorias.addEventListener("click", (event) => {
  let tareasFiltradas = listas.getListaTareasCompletasPorCategoria(categoria_completadas_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Categoria:' " + categoria_completadas_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_completadas_fechas.addEventListener("click", (event) => {
  let tareasFiltradas = listas.getListaTareasPorRangoFechas(dia_Inicio_filtro.value, dia_Final_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea completada entre:' " + dia_Inicio_filtro.value + " y " + dia_Final_filtro.value);
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});
