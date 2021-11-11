export class Tarea {
    constructor(id,titulo, descripcion, fechaLim, categoria) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fechaLim = fechaLim;
      this.categoria = categoria;
    }
}

var lista = [];
  
export function titulo(titulo){
    return titulo;
}

export function crearTarea(titulo, descripcion, categoria, fechaLimite){
    var tarea = new Tarea(lista.length, titulo, descripcion,fechaLimite,categoria)
    return tarea;
}

export function aumentarTarea(titulo, descripcion, categoria, fechaLimite){
    var tarea = crearTarea(titulo, descripcion,categoria,fechaLimite);
    lista.push(tarea);
    return lista;
}

export function obtenerLista(){
    return lista;
}

export function obtenerTamLista(){
    return lista.length;
}

