import fs from "fs";
import * as gestor from './app.js';


describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("index.html", "utf8");
    require("./gestorTareas.js");
  });

  it("Al iniciar no hay nada en la lista de tareas", () => {
    const lista_elem = document.querySelector("#lista-tareas");
    expect(lista_elem.innerHTML).toEqual("");
  });

  it("deberia mostrar una tarea añadida por el usuario", () =>{
    expect(gestor.crearTarea("Primera Tarea")).toEqual("Primera Tarea");
  });

  it("deberia rechazar una tarea invalida", () =>{
    expect(gestor.crearTarea("")).toEqual("No se creo la tarea. TITULO INVALIDO");
  });

  it("deberia mostrar las tareas añadidas por el usuario en la lista de tareas", () =>{
    gestor.crearTarea("Segunda Tarea");
    expect(gestor.mostrarLaListaTareas()).toEqual("Segunda Tarea\nPrimera Tarea"); 

  });

  it("deberia evadir una fecha limite erronea", () => {
    expect(gestor.crearFechaLimite("")).toEqual("Ilimitado");
  });

  it("deberia evadir una fecha limite erronea", () => {
    expect(gestor.crearFechaLimite("2021-11-09")).toEqual("No se pudo crear la tarea, FECHA INVALIDA.");
  });

  it("deberia crear una fecha limite predeterminada", () => {
    expect(gestor.crearFechaLimite("2021-11-11")).toEqual("2021-11-11");
  });

  it("deberia crear una fecha limite ingresada", () => {
    expect(gestor.crearFechaLimite("2021-11-11")).toEqual("2021-11-11");
  });

  it("crear tarea con fecha limite", () => {
    expect(gestor.crearTareaConFechaLimite("Tercera Tarea","2021-11-11")).toEqual("Tercera Tarea\nFecha Limite: 2021-11-11");
  });

  it("crear tarea con fecha limite invalida", () => {
    expect(gestor.crearTareaConFechaLimite("Tercera Tarea","2021-11-09")).toEqual("No se pudo crear la tarea, FECHA INVALIDA.");
  });

  it("deberia crear una categoria", () => {
    expect("trabajo").toEqual("trabajo");
  });

  it("deberia crear una categoria predeterminada", () => {
    expect(gestor.crearCategoria("trabajo")).toEqual(true);
  });
  
  it("deberia crear una categoria a la lista de categorias predeterminadas", () => {
    expect(gestor.crearCategoria("familia")).toEqual(true);
  });

  it("deberia crear una categoria a la lista de categorias predeterminadas", () => {
    expect(gestor.gesListaCategorias().includes("mascotas")).toEqual(false);
  });

  it("deberia mostrar la lista completa de categorias predeterminadas", () => {
    gestor.crearCategoria("personal");
    gestor.crearCategoria("otros");
    expect(gestor.mostrarLaListaCategorias()).toEqual("trabajo\nfamilia\npersonal\notros");
  });

  it("deberia crear una tarea con una de las categorias predeterminadas", () => {
    expect(gestor.crearTareaConCategoria("Cuarta Tarea", "personal")).toEqual("Cuarta Tarea\nCategoria: personal");
  });

  it("deberia crear una descripcion predeterminada", () => {
    expect("Descripcionado").toEqual("Descripcionado");
  });

  it("deberia crear una descripcion ingresada por el usuario", () => {
    expect(gestor.crearDescripcion("Descripcionado")).toEqual("Descripcionado");
  });

  it("deberia rechazar una descripcion vacia", () => {
    expect(gestor.crearDescripcion("")).toEqual("No Descripcionado");
  });

  it("deberia creaer una tarea con una descripcion", () => {
    expect(gestor.crearTareaConDescripcion("Quinta Tarea","Realizar esta actividad de noche")).toEqual("Quinta Tarea\nDescripcion: Realizar esta actividad de noche");
  });

  it("deberia rechazar una tarea con una descripcion invalida", () => {
    expect(gestor.crearTareaConDescripcion("Quinta Tarea","")).toEqual("No se creo la tarea. DESCRIPCION INVALIDA");
  });


  afterEach(() => {
    const lista_elem = document.querySelector("#lista-tareas");
    lista_elem.innerHTML = "";
  });

});
