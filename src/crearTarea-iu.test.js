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
    expect(gestor.mostrarLaListaTareas()).toEqual("\nSegunda Tarea\nPrimera Tarea"); 

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
    expect(gestor.getListaCategorias().includes("mascotas")).toEqual(false);
  });

  it("deberia mostrar la lista completa de categorias predeterminadas", () => {
    gestor.crearCategoria("personal");
    gestor.crearCategoria("otros");
    expect(gestor.mostrarLaListaCategorias()).toEqual("\ntrabajo\nfamilia\npersonal\notros");
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

  it("deberia crear una etiqueta predeterminada", () => {
    expect("Etiquetita1").toEqual("Etiquetita1");
  });

  it("deberia crear una etiqueta creada por el Usuario", () => {
    expect(gestor.crearEtiqueta("Etiquetita1")).toEqual("Etiquetita1");
  });

  it("deberia rechazar una etiqueta vacia", () => {
    expect(gestor.crearEtiqueta("")).toEqual("No Etiquetado");
  });

  it("deberia creaer una tarea con una etiqueta", () => {
    expect(gestor.crearTareaConEtiqueta("Sexta Tarea","Piano")).toEqual("Sexta Tarea\nEtiquetas: Piano");
  });



  it("deberia crear una tarea completa y añadirla a la lista", () => {
    expect(gestor.crearTareaCompleta("Septima Tarea","Descrito","2021-11-12","OTROS","Guitarra")).toEqual("Septima Tarea\nDescripcion: Descrito\nFecha Limite: 2021-11-12\nCategoria: OTROS\nEtiquetas: Guitarra");
  });

  it("deberia devolver la lista completa de tareas", () => {
    expect(gestor.getListaTareasP()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2021-11-11,Categoria:,Etiquetas: ][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra]");
  });
  
  //Ver la posibilidad de hacer mas pruebas con TDD

  it("Deberia devolverme un valor especifico de una lista", () => {
    expect(gestor.getElementoDeLista(["Manzana","Papaya","Banano","Mango","Durazno","Berenjena"],"Berenjena")).toEqual("Berenjena");
  });

  it("Deberia devolverme una lista con las tareas que tengan el titulo 'Primera Tarea'", () => {
    expect(gestor.getListaTareasPorTitulo("Primera Tarea")).toEqual(["[Titulo:Primera Tarea,Descripcion:,Fecha Limite: ,Categoria: ,Etiquetas: ]"]);
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con el titulo ''", () => {
    let lista = gestor.getListaTareasPorTituloT("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por titulo con todas las tareas que coincidan con el titulo 'Septima'", () => {
    gestor.crearTareaCompleta("Septima Tarea v2","Descrito","2021-11-12","OTROS","Guitarra");
    let lista = gestor.getListaTareasPorTituloT("Septima");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la categoria ''", () => {
    let lista = gestor.getListaTareasPorCategoria("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por categoria con todas las tareas que coincidan con la categoria 'OTROS'", () => {
    let lista = gestor.getListaTareasPorCategoria("OTROS");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la etiqueta ''", () => {
    let lista = gestor.getListaTareasPorEtiqueta("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por categoria con todas las tareas que coincidan con la etiqueta 'Guitarra'", () => {
    let lista = gestor.getListaTareasPorEtiqueta("Guitarra");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la fechaLimite: ''", () => {
    let lista = gestor.getListaTareasPorDia("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la fechaLimite: '2021-11-12'", () => {
    let lista = gestor.getListaTareasPorDia("2021-11-12");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2021-11-12,Categoria:OTROS,Etiquetas: Guitarra]");
  });



  afterEach(() => {
    const lista_elem = document.querySelector("#lista-tareas");
    lista_elem.innerHTML = "";
  });

});
