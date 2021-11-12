import * as gestor from './app.js';

const tarea_elem = document.querySelector("#tarea");
const fecha_elem = document.querySelector("#fecha");
const descripcion_elem = document.querySelector("#descripcion");
const boton_elem = document.querySelector("#crear-tarea");
const lista_elem = document.querySelector("#lista-tareas");
const categoria_elem = document.querySelector("#select-categoria");
const verMas_elem = document.querySelector("#ver-mas");

var id = 0;

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}


boton_elem.addEventListener("click", (event) => {
  let validacionFecha = gestor.validarFechaLimite(fecha_elem.value);
  let etiquetas = getSelectedCheckboxValues('etiqueta');
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
      if(etiquetas == ""){
        alert("No se pudo crear la tarea, ETIQUETA INVALIDA.")
        tarea_elem.value = "";
        fecha_elem.value = "";
        descripcion_elem.value = "";
      }else{
        if(descripcion_elem.value == ""){
          descripcion_elem.value = "n/a";
        }
        let tarea = gestor.classTarea(id, tarea_elem.value, validacionFecha, categoria_elem.value, descripcion_elem.value, etiquetas);
        gestor.añadirAListaTarea(tarea);
        id++;
        var aux = lista_elem.innerHTML;
        lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tarea.titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tarea.etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>"  + aux;
        tarea_elem.value = "";
        fecha_elem.value = "";
        descripcion_elem.value = "";

        var elements = document.getElementsByName("etiqueta");
        for(var i = 0; i < elements.length; i++){
          elements[i].checked = false;
        }
        alert("Tarea Creada!");
      }
    }
  }
});

/* <div class="dropdown">
  <span>Mouse over me</span>
  <div class="dropdown-content">
  <p>Hello World!</p>
  </div>
</div> */


/* <div class="dropdown">
  <span>Mouse over me</span>
  <div class="dropdown-content">
  <form action="/action_page.php">
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label for="vehicle1"> I have a bike</label><br>
  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
  <label for="vehicle2"> I have a car</label><br>
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
  <label for="vehicle3"> I have a boat</label><br><br>
  <input type="submit" value="Submit">
</form> 
  </div>
</div> */


// const btn = document.querySelector('#btn');
// btn.addEventListener('click', (event) => {
//   alert(getSelectedCheckboxValues('color'));
// });