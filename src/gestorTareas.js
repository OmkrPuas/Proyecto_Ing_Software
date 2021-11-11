export default class Tarea {
  constructor(id,titulo,fechaLimite,categoria, descripcion) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
  }
}

const tarea_elem = document.querySelector("#tarea");
const fecha_elem = document.querySelector("#fecha");
const descripcion_elem = document.querySelector("#descripcion");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const categoria_elem = document.querySelector("#select-categoria");
var id = 0;
const listaTareas = new Array();

function validarFechaLimite(fecha){
  if( fecha < "2021-11-11"){
    if(fecha == ""){
      return "Ilimitado";
    }
    return "Fecha Invalida";
  }else{ 
    return fecha;
  }
}

boton_elem.addEventListener("click", (event) => {
  let validacionFecha = validarFechaLimite(fecha_elem.value);
  if(validacionFecha == "Fecha Invalida"){
    alert("No se pudo crear la tarea, FECHA INVALIDA.")
    tarea_elem.value = "";
    fecha_elem.value = "";
    descripcion_elem.value = "";
  }else{
    if(tarea_elem.value == ""){
      alert("No se pudo crear la tarea. TITULO INVALIDO");
      descripcion_elem.value = "";
      fecha_elem.value = "";
    }else{
      if(descripcion_elem.value == ""){
        descripcion_elem.value = "n/a";
      }
      let tarea = new Tarea(id, tarea_elem.value, validacionFecha, categoria_elem.value, descripcion_elem.value);
      var aux = lista_elem.innerHTML;
      lista_elem.innerHTML = "<ul>" + "<li>" + tarea.titulo + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite +"</li>" + "</ul>" + "</li>" + "</ul>" + aux;
      tarea_elem.value = "";
      fecha_elem.value = "";
      descripcion_elem.value = "";
    }
  }
});
