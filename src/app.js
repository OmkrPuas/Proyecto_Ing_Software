var id = 0;
const listaTareasPendientes = new Array();
const listaCategorias = new Array();
const listaTareasCompletadas = new Array();
const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const anio = fechaActual.getFullYear();

class Tarea {
  constructor(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.etiquetas = etiquetas;
    this.completada = completada;
  }
}

export function classTarea(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada){
  let tmp = new Tarea(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada);
  return tmp;
}

function unirFechaActual(){
  return anio + "-" + mes + "-" + dia;
}

function esMañana(){
  return anio + "-" + mes + "-" + (dia+1);
}

export function revisarFechasLimites(){
  var mañana = esMañana();
  var tareas = 0;
  for(var i = 0; i < listaTareasPendientes.length; i++){
    if(listaTareasPendientes[i].fechaLimite == mañana){
      tareas++;
    }else{
      if(listaTareasPendientes[i].fechaLimite == unirFechaActual()){
        tareas++;
      }
    }
  }
  return tareas;
}

export function validarFechaLimite(fecha){
  if( fecha < unirFechaActual()){
    if(fecha == ""){
      return "Ilimitado";
    }
    return "No se pudo crear la tarea, FECHA INVALIDA.";
  }else{
    return fecha;
  }
}

export function mostrarLaListaTareas(){
    var cadena = "";
    for (let index = listaTareasPendientes.length-1; index >= 0; index--) {
      cadena += "\n" + listaTareasPendientes[index].titulo;
    }
    return cadena;
  }

export function crearTarea(NombreTarea, completada){
  if(NombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,NombreTarea, "", "", "","", completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo;
  }
}

export function crearFechaLimite(fechaLimite){
  return validarFechaLimite(fechaLimite);
}

export function crearTareaConFechaLimite(nombreTarea, fechaLimite, completada){
  if(validarFechaLimite(fechaLimite) != "No se pudo crear la tarea, FECHA INVALIDA."){
    let tarea = new Tarea(id,nombreTarea, fechaLimite, "", "","", completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nFecha Limite: " + tarea.fechaLimite;
  }else{
      return "No se pudo crear la tarea, FECHA INVALIDA.";
  }
}

export function getListaCategorias(){
    return listaCategorias;
}

export function getListaTareas(){
  return listaTareasPendientes;
}

export function getListaTareasPendientes(){
  var cadena = "";
  for (let index = 0; index < listaTareasPendientes.length; index++) {
    var tarea = listaTareasPendientes[index];
    cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria + ",Etiquetas: " + tarea.etiquetas + ",Completada:" + tarea.completada + "]";
  }   
  return cadena;
}

export function getListaTareasEspecificas(lista){
  let cadena = "";
  for (var index = 0; index < lista.length; index++) {
    let tarea = lista[index];
    cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria + ",Etiquetas: " + tarea.etiquetas + "]";
  }   
  return cadena;
}


export function crearCategoria(categoria){
  listaCategorias.push(categoria);
  return listaCategorias.includes(categoria);
}


export function mostrarLaListaCategorias(){
    var cadena = "";
    for (var index = 0; index < listaCategorias.length; index++) {
        cadena += "\n" + listaCategorias[index];
    }
    return cadena;
  }

export function crearTareaConCategoria(nombreTarea, categoria, completada){
  //console.log(id);
  let tarea = new Tarea(id,nombreTarea, "", categoria, "","", completada);
  listaTareasPendientes.push(tarea);
  id++;
  return tarea.titulo + "\nCategoria: " + tarea.categoria;
}

export function crearDescripcion(descripcion){
  if(descripcion == ""){
    return "No Descripcionado";
  }
  return descripcion;
}

export function crearEtiqueta(etiqueta){
  if(etiqueta == ""){
    return "No Etiquetado";
  }
  return etiqueta;
}


export function crearTareaConDescripcion(nombreTarea, descripcion, completada){
  //console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. DESCRIPCION INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", descripcion,"", completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion;
  }
}

export function crearTareaConEtiqueta(nombreTarea, etiqueta, completada){
  //console.log(id);
  // if(descripcion == ""){
  //   return "No se creo la tarea. ETIQUETA INVALIDA"
  // }else{
    let tarea = new Tarea(id,nombreTarea, "", "", "", etiqueta, completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nEtiquetas: " + tarea.etiquetas;
  // }
}

export function crearTareaCompleta(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion+ "\nFecha Limite: " + tarea.fechaLimite+ "\nCategoria: " + tarea.categoria + "\nEtiquetas: " + tarea.etiquetas + "\nCompletada: " + tarea.completada;
  }
}

export function añadirAListaTarea(tarea){
  //console.log(id);
  listaTareasPendientes.push(tarea);
  id++;
  return tarea;
}

export function getElementoDeLista(lista, elemento){
  var encontrado = "";
  for(var i = 0; i < lista.length; i++){
    if(lista[i] == elemento){
      encontrado = lista[i];
    }
  }
  if(encontrado == ""){
    encontrado = "No encontrado";
  }
  return encontrado;
}

export function getListaTareasPorTitulo(titulo){
  var encontrado = [];
  for(var i = 0; i < listaTareasPendientes.length; i++){
    if(listaTareasPendientes[i].titulo == titulo){
      var guardado = "[Titulo:" + listaTareasPendientes[i].titulo + ",Descripcion:" + listaTareasPendientes[i].descripcion +",Fecha Limite: " + listaTareasPendientes[i].fechaLimite + ",Categoria: " + listaTareasPendientes[i].categoria + ",Etiquetas: " + listaTareasPendientes[i].etiquetas + "]";
      //
      encontrado.push(guardado);
    }
  }
  return encontrado;
}

export function mostrarTareas(){
  let lista = [];
  for(var i = 0; i < listaTareasPendientes.length; i++){
    if(listaTareasPendientes[i].titulo == titulo){
      lista = "\n[Titulo:" + listaTareasPendientes[i].titulo + ",Descripcion:" + listaTareasPendientes[i].descripcion +",Fecha Limite: " + listaTareasPendientes[i].fechaLimite + ",Categoria: " + listaTareasPendientes[i].categoria + ",Etiquetas: " + listaTareasPendientes[i].etiquetas + "]";
    }
  }
  return lista;
}

export function getListaTareasPorTituloT(titulo){
  if(titulo == ""){
    return [];
  }
  let encontrado = [];
  for(let i = 0; i < listaTareasPendientes.length; i++){ 
    var re = new RegExp(titulo, "g");
    if(listaTareasPendientes[i].titulo.match(re)){
      encontrado.push(listaTareasPendientes[i]);
    }
  }
  return encontrado;
}
export function getListaTareasPorCategoria(categoria){
  if(categoria == ""){
    return [];
  }
  let encontrado = [];
  for(let i = 0; i < listaTareasPendientes.length; i++){
    if(listaTareasPendientes[i].categoria === categoria){
      encontrado.push(listaTareasPendientes[i]);
    }
  }
  return encontrado;
}

export function getListaTareasPorEtiqueta(etiquetas){
  if(etiquetas == ""){
    return [];
  }
  let encontrado = [];
  for(let i = 0; i < listaTareasPendientes.length; i++){ 
    let re = new RegExp(etiquetas, "g");
    // if(listaTareasPendientes[i].etiquetas.match(re)){
    if(listaTareasPendientes[i].etiquetas.includes(etiquetas)){
      encontrado.push(listaTareasPendientes[i]);
    }
  }
  return encontrado;
}

export function getListaTareasPorDia(dia){
  if(dia == ""){
    return [];
  }
  let encontrado = [];
  for(let i = 0; i < listaTareasPendientes.length; i++){
    if(listaTareasPendientes[i].fechaLimite === dia){
      encontrado.push(listaTareasPendientes[i]);
    }
  }
  return encontrado;
}

export function getListaTareasPorDescripcion(descripcion){
  if(descripcion == ""){
    return [];
  }
  let encontrado = [];
  for(let i = 0; i < listaTareasPendientes.length; i++){ 
    var re = new RegExp(descripcion, "g");
    if(listaTareasPendientes[i].descripcion.match(re)){
      encontrado.push(listaTareasPendientes[i]);
    }
  }
  return encontrado;
}

export function verificarCampoVacio(campo){
  if(campo == "" ){
    campo = "n/a";
  }
  return campo;
}

export function cambiarEstadoATareaCompletada(tarea){
  // console.log(listaTareasPendientes[8]);
  if(tarea != undefined){
    tarea.completada = true;
    return tarea;
  }
  return true;
}

export function getListaTareasArray(){
  return listaTareasPendientes;
}

export function mostrarTarea(tarea){
  return tarea.titulo + "\nDescripcion: " + tarea.descripcion+ "\nFecha Limite: " + tarea.fechaLimite+ "\nCategoria: " + tarea.categoria + "\nEtiquetas: " + tarea.etiquetas + "\nCompletada: " + tarea.completada;
}

export function borrarTareaListaPendientes(indexAnt, indexPost){
  // console.log(tarea);
  // let isCompleted = (completada) => completada == true;
  listaTareasPendientes.splice(indexAnt, indexPost);
}

export function obtenerIndexABorrar(tarea){
  let index = listaTareasPendientes.indexOf(tarea);
  return index;
}

export function agregarTareaCompletadaALista(tarea){
  listaTareasCompletadas.push(tarea);

}

export function getListaTareasCompletadas(){
  var cadena = "";
  for (let index = 0; index < listaTareasCompletadas.length; index++) {
    var tarea = listaTareasCompletadas[index];
    cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria + ",Etiquetas: " + tarea.etiquetas + ",Completada:" + tarea.completada + "]";
  }   
  return cadena;
}

export function completarTarea(tarea){
  cambiarEstadoATareaCompletada(tarea);
  let index = obtenerIndexABorrar(tarea);
  borrarTareaListaPendientes(index, index + 1);
  agregarTareaCompletadaALista(tarea);
}