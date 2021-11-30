import * as listas from './Listas-logica-negocios.js';
import * as validaciones from './Validaciones-logica-negocios.js';

var id = 0;
const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const anio = fechaActual.getFullYear();

export  class Tarea {

  constructor(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.etiquetas = etiquetas;
    this.completada = completada;
  }

  mostrarTitulo(){
    return this.titulo;
  }
}

export function inicializarListas(){
  listas.getListaCategorias().push('','trabajo','personal','familia','otros');
  listas.getListaEtiquetas().push('Piano','Guitarra','Yolo','Importante','LMAO','LOOOL');
}

// ------------ASIGNACIONES-DE-ATRIBUTOS-A-UNA-TAREA-------------


export function asignarTituloATarea(tarea, titulo){
  if(validaciones.validarTitulo(titulo)){
    tarea.titulo = titulo;
    return tarea;
  }else{
    return "No se creo la tarea. TITULO INVALIDO";
  }
}

export function asignarDescipcionATarea(tarea, descripcion){
  let descripcionVerificada = validaciones.verificarDescripcion(descripcion);
  tarea.descripcion = descripcionVerificada;
  return tarea;
}

export function asignarCategoriaATarea(tarea, categoria){
  if(validaciones.validarCategoria(categoria)){
    tarea.categoria = categoria;
    return tarea;
  }else{
    return "No se creo la tarea. CATEGORIA INVALIDA";
  }
}

//-----------EXTRA------------
export function esHoy(){
  return anio + "-" + mes + "-" + dia;
}

export function esMañana(){
  return anio + "-" + mes + "-" + (dia+1);
}
//----------------------------

export function asignarFechaLimiteATarea(tarea, fecha){
  fecha = validaciones.validarFecha(fecha);
  if(fecha != false){
    tarea.fechaLimite = fecha;
    return tarea;
  }else{
    return "No se creo la tarea. FECHA LIMITE INVALIDA";
  }
}

export function asignarEtiquetaATarea(tarea, etiqueta){
  if(validaciones.validarEtiqueta(etiqueta)){
    tarea.etiquetas = etiqueta;
    return tarea;
  }else{
    return "No se creo la tarea. ETIQUETA INVALIDA";
  }
}



// ---------------------CREAR TAREA------------------

export function crearTareaConTitulo(NombreTarea, completada){
  if(NombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,NombreTarea, "", "", "","", completada);
    listas.getListaTareas().push(tarea);
    id++;
    return tarea.titulo;
  }
}

export function crearTareaConFechaLimite(nombreTarea, fechaLimite, completada){
  if(validaciones.validarFechaLimite(fechaLimite) != "No se pudo crear la tarea, FECHA INVALIDA."){
    let tarea = new Tarea(id,nombreTarea, fechaLimite, "", "","", completada);
    listas.getListaTareas().push(tarea);
    id++;
    return tarea.titulo + "\nFecha Limite: " + tarea.fechaLimite;
  }else{
      return "No se pudo crear la tarea, FECHA INVALIDA.";
  }
}

export function crearTareaConCategoria(nombreTarea, categoria, completada){
  //console.log(id);
  let tarea = new Tarea(id,nombreTarea, "", categoria, "","", completada);
  listas.getListaTareas().push(tarea);
  id++;
  return tarea.titulo + "\nCategoria: " + tarea.categoria;
}

export function crearTareaConDescripcion(nombreTarea, descripcion, completada){
  //console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. DESCRIPCION INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", descripcion,"", completada);
    listas.getListaTareas().push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion;
  }
}

export function crearTareaConEtiqueta(nombreTarea, etiqueta, completada){
  if(crearEtiqueta(etiqueta) == "No Etiquetado"){
    return "No se creo la tarea. ETIQUETA INVALIDA";
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", "", etiqueta, completada);
    listas.getListaTareas().push(tarea);
    id++;
    return tarea.titulo + "\nEtiquetas: " + tarea.etiquetas;
  }
}

export function crearTareaCompleta(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    listas.añadirAListaTarea(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion+ "\nFecha Limite: " + tarea.fechaLimite+ "\nCategoria: " + tarea.categoria + "\nEtiquetas: " + tarea.etiquetas + "\nCompletada: " + tarea.completada;
  }
}

export function crearTareaCompletaT(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    listas.añadirAListaTarea(tarea);
    id++;
    return tarea;
  }
}

export function crearTareaCompletada(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    listas.getListaCompletadasTareas().push(tarea);
    id++;
    return tarea;
  }
}

//-------------FECHA LIMITE ------------
export function crearFechaLimite(fechaLimite){
  return validaciones.validarFechaLimite(fechaLimite);
}



export function revisarFechasLimites(){
  var tareas = 0;
  let lista = listas.getListaTareas();
  for(var i = 0; i < listas.getListaTareas().length; i++){
    if(lista[i].fechaLimite == esMañana()){
      tareas++;
    }else{
      if(lista[i].fechaLimite == esHoy()){
        tareas++;
      }
    }
  }
  return tareas;
}


//-------------CATEGORIA DE TAREA------------
export function crearCategoria(categoria){
  listas.getListaCategorias().push(categoria);
  return listas.getListaCategorias().includes(categoria);
}

export function crearListaDeCategorias(){
  listas.getListaCategorias().push('trabajo','personal','familia','otros');
  return listas.getListaCategorias();
}



//-------------DESCRIPCION DE TAREA------------
export function crearDescripcion(descripcion){
  if(descripcion == ""){
    return "No Descripcionado";
  }
  return descripcion;
}


//-------------ETIQUETA DE TAREA------------

export function crearNuevaEtiqueta(etiqueta){
  listas.getListaEtiquetas().push(etiqueta);
  return listas.getListaEtiquetas().includes(etiqueta);
}

export function crearEtiqueta(etiqueta){
  if(etiqueta == ""){
    return "No Etiquetado";
  }else{
    crearNuevaEtiqueta(etiqueta);
  }
  return etiqueta;
}
//-----------------------------------------------------------------
//------------------------------PROCESO COMPLETAR TAREA-----------------------

export function borrarTareaListaPendientes(indexTarea){
  listas.getListaTareas().splice(indexTarea, 1);
}

export function obtenerIndexABorrar(tarea){
  let index = listas.getListaTareas().indexOf(tarea);
  return index;
}

export function completarTarea(tarea){
  cambiarEstadoATareaCompletada(tarea);
  let index = obtenerIndexABorrar(tarea);
  borrarTareaListaPendientes(index, index + 1);
  listas.agregarTareaCompletadaALista(tarea);
}

export function buscarTareaPorID(id){
  for(var i = 0; i < listas.getListaTareas().length ;i++){
    if(listas.getListaTareas()[i].id === id){
      return i;
    }
  }
  return -1;
}

export function cambiarEstadoATareaCompletada(tarea){
  if(tarea != undefined){
    tarea.completada = true;
    return tarea;
  }
  return true;
}

export function completarTareaPendiente(id){
  let indexTarea = buscarTareaPorID(id);
  let confirmado = false;

    if(indexTarea >= 0){
    cambiarEstadoATareaCompletada(listas.getListaTareas()[indexTarea]);
    listas.agregarTareaCompletadaALista(listas.getListaTareas()[indexTarea]);
    borrarTareaListaPendientes(indexTarea);
    confirmado = true;
  }
  return confirmado;
}

export function vaciarListas(){
  listas.vaciarListas();
}

export function getID(){
  let vara = id;
  id+=1;
  return vara;
}