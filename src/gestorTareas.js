// const tarea_elem = document.querySelector("#tarea");
// const boton_elem = document.querySelector("#crear-tarea");
// const lista_elem = document.querySelector("#lista-tareas");
// //solo como ejemplo para mostrar como funciona con un form
// const tarea_input = document.querySelector("#tarea-input");
// const form_elem = document.querySelector("#form-crear");

// boton_elem.addEventListener("click", (event) => {

//   var lista = lista_elem.innerHTML

//   tarea_elem.value += "\n" + lista

//   lista_elem.innerHTML = tarea_elem.value;

//   tarea_elem.value = "";
// });


// form_elem.addEventListener("submit", (event) => {
//   event.preventDefault();
//   lista_elem.innerHTML = tarea_input.value;
// });

import * as gestor from './App2.js';

let tarea = class Tarea {
  constructor(id,titulo, descripcion, fechaLim, categoria) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaLim = fechaLim;
    this.categoria = categoria;
  }
}


const tarea_elem = document.querySelector("#tarea");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const pruebas_elem = document.querySelector("#pruebas");

boton_elem.addEventListener("click", (event) => {
  tarea.titulo = tarea_elem.value;
  lista_elem.innerHTML = tarea.titulo;
});

//solo como ejemplo para mostrar como funciona con un form
const tarea_titulo = document.querySelector("#titulo-input");
const tarea_descripcion = document.querySelector("#descrip-input");
const tarea_cateogira = document.querySelector("#categoria-input");
const tarea_fechaLimit = document.querySelector("#fechaLimit-input");
const form_elem = document.querySelector("#form-crear");

form_elem.addEventListener("submit", (event) => {
  event.preventDefault();

  //pruebas_elem.innerHTML = "Hola";
  lista_elem.innerHTML = "";
  //alert("Hola");

  var varTitulo = tarea_titulo.value;
  var varDescripcion = tarea_descripcion.value;
  var varCategoria = tarea_cateogira.value;
  var varFechaLim = tarea_fechaLimit.value;

  var tareaCreada = gestor.aumentarTarea(varTitulo,varDescripcion,varCategoria,varFechaLim);

  var listaTareas = gestor.obtenerLista(); 
  
  for (var i = 0; i < listaTareas.length; i++) {
    lista_elem.innerHTML += "<div>" + "<a> " + listaTareas[i].titulo + " </a>" + "<a> " + listaTareas[i].descripcion + " </a>" + "<a> " + listaTareas[i].categoria + " </a>" + "<a> " + listaTareas[i].fechaLim + " </a>" + "</div>";
 }
  
});