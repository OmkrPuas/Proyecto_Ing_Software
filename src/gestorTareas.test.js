import fs from "fs";
import * as gestor from './app.js';


describe("Gestor Tareas", () => {
  it("deberia mostrar una tarea añadida por el usuario", () =>{
    expect(gestor.crearTarea("Primera Tarea", false)).toEqual("Primera Tarea");
  });

  it("deberia rechazar una tarea invalida", () =>{
    expect(gestor.crearTarea("")).toEqual("No se creo la tarea. TITULO INVALIDO");
  });

  it("deberia mostrar las tareas añadidas por el usuario en la lista de tareas", () =>{
    gestor.crearTarea("Segunda Tarea", false);
    expect(gestor.mostrarLaListaTareas()).toEqual("\nSegunda Tarea\nPrimera Tarea"); 

  });

  it("deberia evadir una fecha limite erronea", () => {
    expect(gestor.crearFechaLimite("")).toEqual("Ilimitado");
  });

  it("deberia evadir una fecha limite erronea", () => {
    expect(gestor.crearFechaLimite("2021-11-09")).toEqual("No se pudo crear la tarea, FECHA INVALIDA.");
  });

  it("deberia crear una fecha limite predeterminada", () => {
    expect(gestor.crearFechaLimite("2022-11-19")).toEqual("2022-11-19");
  });

  it("deberia crear una fecha limite ingresada", () => {
    expect(gestor.crearFechaLimite("2022-11-19")).toEqual("2022-11-19");
  });

  it("crear tarea con fecha limite", () => {
    expect(gestor.crearTareaConFechaLimite("Tercera Tarea","2022-11-19", false)).toEqual("Tercera Tarea\nFecha Limite: 2022-11-19");
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
    expect(gestor.crearTareaConCategoria("Cuarta Tarea", "personal", false)).toEqual("Cuarta Tarea\nCategoria: personal");
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
    expect(gestor.crearTareaConDescripcion("Quinta Tarea","Realizar esta actividad de noche", false)).toEqual("Quinta Tarea\nDescripcion: Realizar esta actividad de noche");
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
    expect(gestor.crearTareaConEtiqueta("Sexta Tarea","Piano", false)).toEqual("Sexta Tarea\nEtiquetas: Piano");
  });



  it("deberia crear una tarea completa y añadirla a la lista", () => {
    expect(gestor.crearTareaCompleta("Septima Tarea","Descrito","2022-11-19","OTROS","Guitarra", false)).toEqual("Septima Tarea\nDescripcion: Descrito\nFecha Limite: 2022-11-19\nCategoria: OTROS\nEtiquetas: Guitarra\nCompletada: false");
  });

  it("deberia devolver la lista completa de tareas", () => {
    expect(gestor.getListaTareasPendientes()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false]");
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
    gestor.crearTareaCompleta("Septima Tarea v2","Descrito","2022-11-19","OTROS","Guitarra",false);
    let lista = gestor.getListaTareasPorTituloT("Septima");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la categoria ''", () => {
    let lista = gestor.getListaTareasPorCategoria("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por categoria con todas las tareas que coincidan con la categoria 'OTROS'", () => {
    let lista = gestor.getListaTareasPorCategoria("OTROS");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la etiqueta ''", () => {
    let lista = gestor.getListaTareasPorEtiqueta("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por categoria con todas las tareas que coincidan con la etiqueta 'Guitarra'", () => {
    let lista = gestor.getListaTareasPorEtiqueta("Guitarra");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la fechaLimite: ''", () => {
    let lista = gestor.getListaTareasPorDia("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("La busqueda deberia devolverme una lista que coincidan con la fechaLimite: '2022-11-19'", () => {
    let lista = gestor.getListaTareasPorDia("2022-11-19");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la descripcion: ''", () => {
    let lista = gestor.getListaTareasPorDescripcion("");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("La busqueda deberia devolverme una lista que coincidan con la descripcion: 'Descrito'", () => {
    let lista = gestor.getListaTareasPorDescripcion("Descrito");
    expect(gestor.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra]");
  });

  // Completar Tarea
  it("deberia devolver la lista completa de tareas contemplando el campo Completada", () => {
    expect(gestor.getListaTareasPendientes()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false]");
  });

  it("Deberia completar una tarea", () => {
    expect(gestor.cambiarEstadoATareaCompletada()).toEqual(true);
  });

  it("Deberia completar una tarea", () => {
    let listaTareasPendientes = gestor.getListaTareas();
    let tarea = gestor.cambiarEstadoATareaCompletada(listaTareasPendientes[0]);    //PRIMERA TAREA
    expect(gestor.mostrarTarea(tarea)).toEqual("Primera Tarea\nDescripcion: \nFecha Limite: \nCategoria: \nEtiquetas: \nCompletada: true");  //Cambia Primera Tarea a Completada
  });

  it("Deberia devolver la lista completa de tareas contemplando el campo Completada", () => {
    expect(gestor.getListaTareasPendientes()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false]");
  });

  it("Deberia borrar la tarea completada de la lista de tareas pendientes", () => {
    let listaTareasPendientes = gestor.getListaTareas();
    let tarea = listaTareasPendientes[0];
    let index = gestor.obtenerIndexABorrar(tarea);
    gestor.borrarTareaListaPendientes(index, index + 1);
    gestor.agregarTareaCompletadaALista(tarea);
    expect(gestor.getListaTareasCompletadas()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true]");
  });

  it("Deberia visualizar la lista de tareas pendientes con la tarea eliminada", () => {
    expect(gestor.getListaTareasPendientes()).toEqual("[Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:OTROS,Etiquetas: Guitarra,Completada:false]");
  });

  it("Deberia completar una tarea", () => {
    let listaTareasPendientes = gestor.getListaTareas();
    let tarea = listaTareasPendientes[0];
    gestor.completarTarea(tarea);                   //SEGUNDA TAREA
    expect(gestor.getListaTareasCompletadas()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true]");
  });
});
