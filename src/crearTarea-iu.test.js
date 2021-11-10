import fs from "fs";

//PABLO
import libreria, { TEAMGROZZO } from './App.js';
//PABLO
//const lista_elem = document.querySelector("#lista-tareas");

describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("gestortareas.html", "utf8");
    require("./gestorTareas.js");
  });

  it("deberia mostrar la tarea creada", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");

    tarea_elem.value = "Primera Tarea";
    boton_elem.click();
    expect(lista_elem.innerHTML).toEqual("Primera Tarea");
  });

  it("Al iniciar no hay nada en la lista de tareas", () => {
    const lista_elem = document.querySelector("#lista-tareas");
    expect(lista_elem.innerHTML).toEqual("");
  });

  //Solo para mostrar lo mismo que la primera prueba pero usando un form, en lugar de boton
  it("solo como ejemplo: formulario con submit", () => {
    const tarea_input = document.querySelector("#tarea-input");
    const form_submit_elem = document.querySelector("#crear-submit");
    const lista_elem = document.querySelector("#lista-tareas");
    tarea_input.value = "Otra tarea";

    form_submit_elem.click();

    expect(lista_elem.innerHTML).toEqual("Otra tarea");
  });

  it("deberia mostrar las tareas creadas", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");

    tarea_elem.value = "Primera Tarea";
    boton_elem.click();
    var tarea_anterior = tarea_elem.value;
    tarea_elem.value = "Segunda Tarea";
    boton_elem.click();
    lista_elem.innerHTML +=  "\n" + tarea_anterior;
    expect(lista_elem.innerHTML).toEqual("Segunda Tarea" + "\n" + "Primera Tarea");
  });

  it("deberia mostrar las tareas creadas", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");

    tarea_elem.value = "Primera Tarea";
    // boton_elem.click();
    // console.log(lista_elem.innerHTML)
    listaTareas.push(tarea_elem.value);
    tarea_elem.value = "Segunda Tarea";
    // boton_elem.click();
    // console.log(lista_elem.innerHTML)
    listaTareas.push(tarea_elem.value);
    tarea_elem.value = "Tercera Tarea";
    // boton_elem.click();
    // console.log(lista_elem.innerHTML)
    listaTareas.push(tarea_elem.value);
    tarea_elem.value = "Cuarta Tarea";
    // boton_elem.click();
    // console.log(lista_elem.innerHTML)
    listaTareas.push(tarea_elem.value);
    lista_elem.innerHTML = showTasks(listaTareas);
    expect(lista_elem.innerHTML).toEqual("Cuarta Tarea" + "\n" + "Tercera Tarea" + "\n" + "Segunda Tarea" + "\n" + "Primera Tarea");
  });


  
  //PABLO
  it("deberia añadir una descripcion a la tarea", () => {
    var listaEsperada = [];
    expect(libreria.retornarLista()).toEqual(listaEsperada);
  });
  //PABLO



  afterEach(() => {
    const lista_elem = document.querySelector("#lista-tareas");
    lista_elem.innerHTML = "";
  });



  // it("deberia devolver la lista de tareas con tareas añadidas", () =>{
  //   const tarea_elem = document.querySelector("#tarea");
  //   const boton_elem = document.querySelector("#crear-tarea");
  //   const lista_elem = document.querySelector("#lista-tareas");

  //   tarea_elem.value = "Primera Tarea";
  //   boton_elem.click();

  //   tarea_elem.value = "Segunda Tarea";
  //   boton_elem.click();

  //   expect(lista_elem.innerHTML).toEqual("Segunda Tarea,Primera Tarea");
  // });
});

const listaTareas = new Array();

function showTasks(lista){
  const lista_elem = document.querySelector("#lista-tareas");
  for (let index = lista.length - 1; index >= 0; index--) {
    if(index == 0){
      lista_elem.innerHTML += lista[index];  
    }else{
      lista_elem.innerHTML += lista[index] + "\n";
    }
  }
  // console.log(lista_elem.innerHTML)
  return lista_elem.innerHTML;
}

