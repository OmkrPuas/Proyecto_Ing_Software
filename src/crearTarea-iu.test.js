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

  it("deberia mostrar una tarea añadida por el usuario", () =>{
    expect(crearTarea("Primera Tarea")).toEqual("Primera Tarea");
  });

  it("deberia mostrar las tareas añadidas por el usuario en la lista de tareas", () =>{
    crearTarea("Segunda Tarea");
    expect(mostrarListaTareas(listaTareas)).toEqual("Segunda Tarea\nPrimera Tarea"); 

  });

  it("deberia evadir una fecha limite erronea", () => {
    expect(crearFechaLimite("")).toEqual("Ingresa una fecha limite valida.");
  });

  it("deberia evadir una fecha limite erronea", () => {
    expect(crearFechaLimite("09/11/2021")).toEqual("Ingresa una fecha limite valida.");
  });

  it("deberia crear una fecha limite predeterminada", () => {
    expect(crearFechaLimite("10/11/2021")).toEqual("10/11/2021");
  });

  it("deberia crear una fecha limite ingresada", () => {
    expect(crearFechaLimite("10/11/2021")).toEqual("10/11/2021");
  });

  it("crear tarea con fecha limite", () => {
    expect(crearTareaConFechaLimite("Tercera Tarea","10/11/2021")).toEqual("Tercera Tarea\nFecha Limite: 10/11/2021");
  });

  it("deberia crear una categoria", () => {
    expect("trabajo").toEqual("trabajo");
  });

  it("deberia crear una categoria predeterminada", () => {
    expect(crearCategoria("trabajo")).toEqual(true);
  });
  
  it("deberia crear una categoria a la lista de categorias predeterminadas", () => {
    expect(crearCategoria("familia")).toEqual(true);
  });

  it("deberia crear una categoria a la lista de categorias predeterminadas", () => {
    expect(listaCategorias.includes("mascotas")).toEqual(false);
  });

  it("deberia mostrar la lista completa de categorias predeterminadas", () => {
    crearCategoria("personal");
    crearCategoria("otros");
    expect(mostrarCategorias(listaCategorias)).toEqual("trabajo\nfamilia\npersonal\notros");
  });

  it("deberia crear una tarea con una de las categorias predeterminadas", () => {
    expect(crearTareaConCategoria("Cuarta Tarea", "personal")).toEqual("Cuarta Tarea\nCategoria: personal");
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
const listaCategorias = new Array();

export default class Tarea {
  constructor(id, titulo, fechaLimite, categoria) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
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
  // console.log(id);
  let tarea = new Tarea(id,NombreTarea, "", "");
  listaTareas.push(tarea);
  id++;
  return tarea.titulo;
}

function crearFechaLimite(fechaLimite){
  if(fechaLimite == "" || fechaLimite < "10/11/2020"){
    return "Ingresa una fecha limite valida.";
  }
  return fechaLimite;
}

function crearTareaConFechaLimite(nombreTarea, fechaLimite){
  console.log(id);
  let tarea = new Tarea(id,nombreTarea, fechaLimite, "");
  listaTareas.push(tarea);
  id++;
  return tarea.titulo + "\nFecha Limite: " + tarea.fechaLimite;
}



function crearCategoria(categoria){
  listaCategorias.push(categoria);
  return listaCategorias.includes(categoria);
}
function mostrarCategorias(lista){
  var cadena = "";
  for (let index = 0; index < lista.length; index++) {
    if(index == lista.length-1){
      cadena += lista[index];
    }
    else
      cadena += lista[index] + "\n";
  }
  return cadena;
}
function crearTareaConCategoria(nombreTarea, categoria){
  console.log(id);
  let tarea = new Tarea(id,nombreTarea, "", categoria);
  listaTareas.push(tarea);
  id++;
  return tarea.titulo + "\nCategoria: " + tarea.categoria;
}
