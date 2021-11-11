import exp from "constants";
import fs from "fs";
//import Tarea from "./gestorTareas.js"

//PABLO
import libreria, { TEAMGROZZO } from './App.js';
//PABLO
//const lista_elem = document.querySelector("#lista-tareas");



describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("gestorTareas.html", "utf8");
    require("./gestorTareas.js");
  });

  it("Al iniciar no hay nada en la lista de tareas", () => {
    const lista_elem = document.querySelector("#lista-tareas");
    expect(lista_elem.innerHTML).toEqual("");
  });

  it("deberia mostrar una tarea predeterminada en la lista de tareas", () => {    
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");

    tarea_elem.value = "Primera Tarea";
    boton_elem.click();
    expect(lista_elem.innerHTML).toEqual("<li>Primera Tarea</li>");
  });

  it("deberia mostrar una tarea añadida por el usuario", () =>{
    expect(crearTarea("Primera Tarea")).toEqual("Primera Tarea");
  });

  it("deberia mostrar las tareas añadidas por el usuario en la lista de tareas", () =>{
    crearTarea("Segunda Tarea");
    expect(mostrarListaTareas(listaTareas)).toEqual("Segunda Tarea\nPrimera Tarea"); 

  });

  // it("deberia mostrar 2 tareas creadas", () => {
  //   const tarea_elem = document.querySelector("#tarea");
  //   const boton_elem = document.querySelector("#crear-tarea");
  //   const lista_elem = document.querySelector("#lista-tareas");

  //   tarea_elem.value = "Primera Tarea";
  //   boton_elem.click();
  //   var tarea_anterior = tarea_elem.value;
  //   tarea_elem.value = "Segunda Tarea";
  //   boton_elem.click();
  //   lista_elem.innerHTML +=  "\n" + tarea_anterior;
  //   expect(lista_elem.innerHTML).toEqual("Segunda Tarea" + "\n" + "Primera Tarea");
  // });

  // it("deberia mostrar las tareas creadas", () => {
  //   const tarea_elem = document.querySelector("#tarea");
  //   const boton_elem = document.querySelector("#crear-tarea");
  //   const lista_elem = document.querySelector("#lista-tareas");

  //   tarea_elem.value = "Primera Tarea";
  //   // boton_elem.click();
  //   // console.log(lista_elem.innerHTML)
  //   listaTareas.push(tarea_elem.value);
  //   tarea_elem.value = "Segunda Tarea";
  //   // boton_elem.click();
  //   // console.log(lista_elem.innerHTML)
  //   listaTareas.push(tarea_elem.value);
  //   tarea_elem.value = "Tercera Tarea";
  //   // boton_elem.click();
  //   // console.log(lista_elem.innerHTML)
  //   listaTareas.push(tarea_elem.value);
  //   tarea_elem.value = "Cuarta Tarea";
  //   // boton_elem.click();
  //   // console.log(lista_elem.innerHTML)
  //   listaTareas.push(tarea_elem.value);
  //   lista_elem.innerHTML = showTasks(listaTareas);
  //   expect(lista_elem.innerHTML).toEqual("Cuarta Tarea" + "\n" + "Tercera Tarea" + "\n" + "Segunda Tarea" + "\n" + "Primera Tarea");
  // });


  
  // //PABLO
  // it("deberia añadir una descripcion a la tarea", () => {
  //   var id = 0;
  //   var newTask = "NO MERCY";
  //   var listaEsperada = [{Id:0, Titulo: "Secreto", Descripcion: "NO MERCY"},{Id:1, Titulo: "Tarea para ayer", Descripcion: "gg"}];
  //   libreria.añadirDescripcion(id,newTask);
  //   expect(libreria.retornarLista()).toEqual(listaEsperada);
  // });
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
var id = 0;

export default class Tarea {
  constructor(id,titulo) {
    this.id = id;
    this.titulo = titulo;
  }
}

function mostrarListaTareas(lista){
  var cadena = "";
  for (let index = lista.length-1; index >= 0; index--) {
    if(index == 0){
      cadena += lista[index].titulo;
    }
    else
      cadena += lista[index].titulo + "\n";
  }
  return cadena;
}

function crearTarea(NombreTarea){
  console.log(id);
  let tarea = new Tarea(id,NombreTarea);
  listaTareas.push(tarea);
  id++;
  return tarea.titulo;
}
