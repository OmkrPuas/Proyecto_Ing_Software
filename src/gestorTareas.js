const tarea_elem = document.querySelector("#tarea");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
//solo como ejemplo para mostrar como funciona con un form
const tarea_input = document.querySelector("#tarea-input");
const form_elem = document.querySelector("#form-crear");

boton_elem.addEventListener("click", (event) => {

  var lista = lista_elem.innerHTML

  if(lista.length > 0){
    tarea_elem.value += "," + lista
  }

  lista_elem.innerHTML = tarea_elem.value;

  tarea_elem.value = "";
});


form_elem.addEventListener("submit", (event) => {
  event.preventDefault();
  lista_elem.innerHTML = tarea_input.value;
});


