var id = 0;
const listaTareas = new Array();
const listaCategorias = new Array();

class Tarea {
  constructor(id, titulo, fechaLimite, categoria, descripcion, etiquetas) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.etiquetas = etiquetas;
  }
}

export function classTarea(id, titulo, fechaLimite, categoria, descripcion, etiquetas){
  let tmp = new Tarea(id, titulo, fechaLimite, categoria, descripcion, etiquetas);
  return tmp;
}

export function validarFechaLimite(fecha){
  if( fecha < "2021-11-11"){
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
    for (let index = listaTareas.length-1; index >= 0; index--) {
      cadena += "\n" + listaTareas[index].titulo;
    }
    return cadena;
  }

export function crearTarea(NombreTarea){
  if(NombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,NombreTarea, "", "", "","");
    listaTareas.push(tarea);
    id++;
    return tarea.titulo;
  }
}

export function crearFechaLimite(fechaLimite){
  return validarFechaLimite(fechaLimite);
}

export function crearTareaConFechaLimite(nombreTarea, fechaLimite){
  if(validarFechaLimite(fechaLimite) != "No se pudo crear la tarea, FECHA INVALIDA."){
    let tarea = new Tarea(id,nombreTarea, fechaLimite, "", "","");
    listaTareas.push(tarea);
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
  return listaTareas;
}

export function getListaTareasP(){
  var cadena = "";
  for (let index = 0; index < listaTareas.length; index++) {
    var tarea = listaTareas[index];
    cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria +"]";
  }   
  return cadena;
}


export function crearCategoria(categoria){
  listaCategorias.push(categoria);
  return listaCategorias.includes(categoria);
}


export function mostrarLaListaCategorias(){
    var cadena = "";
    for (let index = 0; index < listaCategorias.length; index++) {
        cadena += "\n" + listaCategorias[index];
    }
    return cadena;
  }

export function crearTareaConCategoria(nombreTarea, categoria){
  //console.log(id);
  let tarea = new Tarea(id,nombreTarea, "", categoria, "","");
  listaTareas.push(tarea);
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


export function crearTareaConDescripcion(nombreTarea, descripcion){
  //console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. DESCRIPCION INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", descripcion,"");
    listaTareas.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion;
  }
}

export function crearTareaConEtiqueta(nombreTarea, etiqueta){
  //console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. ETIQUETA INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", "", etiqueta);
    listaTareas.push(tarea);
    id++;
    return tarea.titulo + "\nEtiquetas: " + tarea.etiquetas;
  }
}

export function crearTareaCompleta(nombreTarea, descripcion, fechaLimite, categoria, etiqueta){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta);
    listaTareas.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion+ "\nFecha Limite: " + tarea.fechaLimite+ "\nCategoria: " + tarea.categoria;
  }
}

export function añadirAListaTarea(tarea){
  //console.log(id);
  listaTareas.push(tarea);
  id++;
  return tarea;
}