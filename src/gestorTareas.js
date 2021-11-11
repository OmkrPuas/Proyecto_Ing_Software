export default class Tarea {
  constructor(id,titulo) {
    this.id = id;
    this.titulo = titulo;
  }
}

const tarea_elem = document.querySelector("#tarea");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
var id = 0;

boton_elem.addEventListener("click", (event) => {
  
  let tarea = new Tarea(id,tarea_elem.value);
  //tarea.titulo = tarea_elem.value;
  // tarea.id = 1
  // tarea.titulo = tarea_elem.value;
  lista_elem.innerHTML = "<li>" + tarea.titulo + "</li>";
});
