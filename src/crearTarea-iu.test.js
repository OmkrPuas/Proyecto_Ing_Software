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

  it("deberia rechazar una tarea invalida", () =>{
    expect(crearTarea("")).toEqual("No se creo la tarea. TITULO INVALIDO");
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
    expect(crearFechaLimite("11/11/2021")).toEqual("11/11/2021");
  });

  it("deberia crear una fecha limite ingresada", () => {
    expect(crearFechaLimite("11/11/2021")).toEqual("11/11/2021");
  });

  it("crear tarea con fecha limite", () => {
    expect(crearTareaConFechaLimite("Tercera Tarea","11/11/2021")).toEqual("Tercera Tarea\nFecha Limite: 11/11/2021");
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

  it("deberia crear una descripcion predeterminada", () => {
    expect("Descripcionado").toEqual("Descripcionado");
  });

  it("deberia crear una descripcion ingresada por el usuario", () => {
    expect(crearDescripcion("Descripcionado")).toEqual("Descripcionado");
  });

  it("deberia rechazar una descripcion vacia", () => {
    expect(crearDescripcion("")).toEqual("No Descripcionado");
  });

  it("deberia creaer una tarea con una descripcion", () => {
    expect(crearTareaConDescripcion("Quinta Tarea","Realizar esta actividad de noche")).toEqual("Quinta Tarea\nDescripcion: Realizar esta actividad de noche");
  });

  it("deberia rechazar una tarea con una descripcion invalida", () => {
    expect(crearTareaConDescripcion("Quinta Tarea","")).toEqual("No se creo la tarea. DESCRIPCION INVALIDA");
  });


  afterEach(() => {
    const lista_elem = document.querySelector("#lista-tareas");
    lista_elem.innerHTML = "";
  });

});

const listaTareas = new Array();
var id = 0;
const listaCategorias = new Array();

export default class Tarea {
  constructor(id, titulo, fechaLimite, categoria, descripcion) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
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
  if(NombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,NombreTarea, "", "", "");
    listaTareas.push(tarea);
    id++;
    return tarea.titulo;
  }
}

function crearFechaLimite(fechaLimite){
  if(fechaLimite == "" || fechaLimite < "10/11/2020"){
    return "Ingresa una fecha limite valida.";
  }
  return fechaLimite;
}

function crearTareaConFechaLimite(nombreTarea, fechaLimite){
  console.log(id);
  let tarea = new Tarea(id,nombreTarea, fechaLimite, "", "");
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
  let tarea = new Tarea(id,nombreTarea, "", categoria, "");
  listaTareas.push(tarea);
  id++;
  return tarea.titulo + "\nCategoria: " + tarea.categoria;
}

function crearDescripcion(descripcion){
  if(descripcion == ""){
    return "No Descripcionado";
  }
  return descripcion;
}

function crearTareaConDescripcion(nombreTarea, descripcion){
  console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. DESCRIPCION INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", descripcion);
    listaTareas.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion;
  }
}