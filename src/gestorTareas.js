import * as gestor from './app.js';




//gestor.algo
const tarea_elem = document.querySelector("#tarea");
const fecha_elem = document.querySelector("#fecha");
const descripcion_elem = document.querySelector("#descripcion");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const categoria_elem = document.querySelector("#select-categoria");
const mostrarTareas_elem = document.querySelector("#mostrar-tareas");


//Completar
const boton_completar = document.querySelector("#completar-tarea");

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
const etiquetas_filtro = document.querySelector("#etiquetas-filtro");

const boton_filtro_dia = document.querySelector("#filtro-dia");
const dia_filtro = document.querySelector("#dia-filtro");

const boton_filtro_descripcion = document.querySelector("#filtro-descripcion");
const descripcion_filtro = document.querySelector("#descripcion-filtro");

const boton_filtro_tareas_completadas = document.querySelector("#filtro-tareas-completadas");
const boton_filtro_completadas_categorias = document.querySelector("#filtro-completadas-por-categoria");
const categoria_completadas_filtro = document.querySelector("#categoria-completadas-filtro");

const dia_Inicio_filtro = document.querySelector("#dia-completada-filtroInicio");
const dia_Final_filtro = document.querySelector("#dia-completada-filtroFinal");
const boton_filtro_completadas_fechas = document.querySelector("#filtro-completadas-por-fechas");
var id = 0;

gestor.inicializarListas();

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
}

boton_elem.addEventListener("click", (event) => {
  let validacionFecha = gestor.validarFechaLimite(fecha_elem.value);
  let etiquetas = getSelectedCheckboxValues('etiqueta');
  if(etiquetas.length > 5){
    alert("No se pudo crear la tarea, DEMASIADAS ETIQUETAS.")
    limpiarCampos();
  }else{
    if(validacionFecha == "No se pudo crear la tarea, FECHA INVALIDA."){
      alert("No se pudo crear la tarea, FECHA INVALIDA.")
      limpiarCampos();
    }else{
      if(tarea_elem.value == ""){
        alert("No se pudo crear la tarea, TITULO INVALIDO.")
        limpiarCampos();
      }else{
          etiquetas = gestor.verificarCampoVacio(etiquetas);
          descripcion_elem.value = gestor.verificarCampoVacio(descripcion_elem.value);
          let tarea = gestor.classTarea(id, tarea_elem.value, validacionFecha, categoria_elem.value, descripcion_elem.value, etiquetas, false);
          gestor.añadirAListaTarea(tarea);
          id++;
          var aux = lista_elem.innerHTML;
          lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tarea.titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tarea.etiquetas + "</li>" +"</div>"+ "</div>"+ "<button class=" + "bloque" + " id=" + "completar-tarea" + ">Completar" + "</" + "button>" + "</ul>" + "</li>"  + aux;
          // lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tarea.titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tarea.etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>"  + aux;
          
          limpiarCampos();

          // Ver de refactorizar las siguientes lineas
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
  let etiquetas = getSelectedCheckboxValues("filtro-etiqueta");
  let tareasFiltradas = gestor.getListaTareasPorEtiqueta(etiquetas);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Etiqueta:' " + etiquetas + "' en la lista de tareas")
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

boton_alertar.addEventListener("click", (event) => {
  let pendientes = gestor.revisarFechasLimites();
  alert("Hay "+ pendientes +" Tareas para mañana");
});

boton_nueva_etiqueta.addEventListener("click", (event) => {
  let listaEtiquetas = gestor.getListaEtiquetas();
  let nuevaEtiqueta = nueva_etiqueta.value;
  let etiquetas = form_etiquetas.innerHTML;
  let etiqueta_nueva = "<input type='checkbox' id='etiqueta' name='etiqueta' value='"+ nuevaEtiqueta + "' /><label for='etiqueta3'>" + nuevaEtiqueta + "</label><br />";
  form_etiquetas.innerHTML = etiquetas + etiqueta_nueva;
  listaEtiquetas = gestor.crearNuevaEtiqueta(nuevaEtiqueta);
  
});

boton_filtro_tareas_completadas.addEventListener("click", (event) => {
  gestor.crearTareaCompletaT("Septima Tarea v2","Descrito","2022-11-19","otros","Guitarra",true);
  gestor.crearTareaCompletaT("Octava Tarea v2","Descrito","2022-11-12","familia","Guitarra",true);
  let Informe = gestor.getNumTareasCompletadasPorCategoria();
  let labelInforme = "<label>" + "Tareas completadas: " + "Trabajo:" + Informe[0] + " Familia:" + Informe[1] + " Personal:" + Informe[2] + " Otros:" + Informe[3] +  "</label>";
  let tareasFiltradas = gestor.getListaCompletadasTareas();
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea completa");
  }
  lista_elem.innerHTML = labelInforme;
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_completadas_categorias.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasCompletasPorCategoria(categoria_completadas_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna coincidencia de Categoria:' " + categoria_completadas_filtro.value + "' en la lista de tareas")
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});

boton_filtro_completadas_fechas.addEventListener("click", (event) => {
  let tareasFiltradas = gestor.getListaTareasPorRangoFechas(dia_Inicio_filtro.value, dia_Final_filtro.value);
  if(tareasFiltradas == ""){
    alert("No se pudo encontrar ninguna tarea completada entre:' " + dia_Inicio_filtro.value + " y " + dia_Final_filtro.value);
  }
  lista_elem.innerHTML = "";
  for(var i = tareasFiltradas.length - 1; i >= 0 ; i--){
    lista_elem.innerHTML = lista_elem.innerHTML + "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tareasFiltradas[i].titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tareasFiltradas[i].categoria +"</li>"+ "<li>" + "Descripcion: " + tareasFiltradas[i].descripcion + "</li>" + "<li>" + "Fecha Limite: " + tareasFiltradas[i].fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tareasFiltradas[i].etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
  }
});


//var nueva etiqueta = "<input type='checkbox' id="etiqueta" name="etiqueta" value="NuevaEtiqueta" /><label for="etiqueta3"> NuevaEtiqueta</label><br /><br />""

//var aux = lista_elem.innerHTML;
//lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tarea.titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tarea.etiquetas + "</li>" +"</div>"+ "</div>"+ "<button class=" + "bloque" + " id=" + "completar-tarea" + ">Completar" + "</" + "button>" + "</ul>" + "</li>"  + aux;