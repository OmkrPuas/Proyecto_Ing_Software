var id = 0;
const listaTareas = new Array();
const listaCategorias = new Array();

export class Tarea {
  constructor(id, titulo, fechaLimite, categoria, descripcion) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
  }
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
      if(index == 0){
        cadena += listaTareas[index].titulo;
      }
      else
        cadena += listaTareas[index].titulo + "\n";
    }
    return cadena;
  }

export function crearTarea(NombreTarea){
  if(NombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,NombreTarea, "", "", "");
    listaTareas.push(tarea);
    id++;
    return tarea.titulo;
  }
}

export function crearFechaLimite(fechaLimite){
  return validarFechaLimite(fechaLimite);
}

export function crearTareaConFechaLimite(nombreTarea, fechaLimite){
  //console.log(id);
  if(validarFechaLimite(fechaLimite) != "No se pudo crear la tarea, FECHA INVALIDA."){
    let tarea = new Tarea(id,nombreTarea, fechaLimite, "", "");
    listaTareas.push(tarea);
    id++;
    return tarea.titulo + "\nFecha Limite: " + tarea.fechaLimite;
  }else{
      return "No se pudo crear la tarea, FECHA INVALIDA.";
  }
}

export function gesListaCategorias(){
    return listaCategorias;
}


export function crearCategoria(categoria){
  listaCategorias.push(categoria);
  return listaCategorias.includes(categoria);
}


export function mostrarLaListaCategorias(){
    var cadena = "";
    for (let index = 0; index < listaCategorias.length; index++) {
      if(index == listaCategorias.length-1){
        cadena += listaCategorias[index];
      }
      else
        cadena += listaCategorias[index] + "\n";
    }
    return cadena;
  }

export function crearTareaConCategoria(nombreTarea, categoria){
  //console.log(id);
  let tarea = new Tarea(id,nombreTarea, "", categoria, "");
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


export function crearTareaConDescripcion(nombreTarea, descripcion){
  //console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. DESCRIPCION INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", descripcion);
    listaTareas.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion;
  }
}