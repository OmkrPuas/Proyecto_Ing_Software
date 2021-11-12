import * as gestor from './app.js';

const tarea_elem = document.querySelector("#tarea");
const fecha_elem = document.querySelector("#fecha");
const descripcion_elem = document.querySelector("#descripcion");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const categoria_elem = document.querySelector("#select-categoria");
const verMas_elem = document.querySelector("#ver-mas");

var id = 0;


boton_elem.addEventListener("click", (event) => {
  let validacionFecha = gestor.validarFechaLimite(fecha_elem.value);
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
      if(descripcion_elem.value == ""){
        descripcion_elem.value = "n/a";
      }
      let tarea = gestor.classTarea(id, tarea_elem.value, validacionFecha, categoria_elem.value, descripcion_elem.value);
      id++;
      var aux = lista_elem.innerHTML;
      lista_elem.innerHTML = "<ul>" + "<li>" + tarea.titulo + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite +"</li>" + "</ul>" + "</li>" + "<button id=ver-mas>Ver más</button></ul>" + aux;
      tarea_elem.value = "";
      fecha_elem.value = "";
      descripcion_elem.value = "";
    }
  }
});