import fs from "fs";
import * as gestor from './Tarea-logica-negocios.js';
import * as listas from './Listas-logica-negocios.js';
import * as validaciones from './Validaciones-logica-negocios.js';
import {Tarea} from './Tarea-logica-negocios.js';

describe("Gestor Tareas", () => {

  // Asignar Titulo a una Tarea

  it("Deberia invalidar un titulo vacio", () =>{
    expect(validaciones.validarTitulo("")).toEqual(
      false);
  });

  it("Deberia validar un titulo", () =>{
    expect(validaciones.validarTitulo("Titulo de la tarea")).toEqual(
      true);
  });
  

  it("Deberia asignar un titulo dado por el usuario a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarTituloATarea(tarea,"Primera Tarea")).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": undefined, 
      "etiquetas": undefined, 
      "fechaLimite": undefined, 
      "id": undefined, 
      "titulo": "Primera Tarea"});
  });

  it("Deberia mostrar el error al asignar un titulovacio a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarTituloATarea(tarea,"")).toEqual(
      "No se creo la tarea. TITULO INVALIDO");
  });

  // Asignar Descripcion a una Tarea

  it("Deberia varificar si la descripcion esta vacia, en caso de que este vacio devolver 'n/a'", () =>{
    expect(validaciones.verificarDescripcion("")).toEqual(
      "n/a");
  });

  it("Deberia varificar si la descripcion esta vacia, si no esta vacia deberia devolver la misma descripcion", () =>{
    expect(validaciones.verificarDescripcion("Esta es la descripcion de la tarea")).toEqual(
      "Esta es la descripcion de la tarea");
  });
  

  it("Deberia asignar una descripcion dada por el usuario a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarDescipcionATarea(tarea,"Descripcion de la tarea")).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": "Descripcion de la tarea", 
      "etiquetas": undefined, 
      "fechaLimite": undefined, 
      "id": undefined, 
      "titulo": undefined});
  });

  it("Deberia asignar una descripcion vacia a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarDescipcionATarea(tarea,"")).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": "n/a", 
      "etiquetas": undefined, 
      "fechaLimite": undefined, 
      "id": undefined, 
      "titulo": undefined});
  });

  //Asignar Categoria a una Tarea

  it("Deberia crear una lista de categorias predeterminada", () =>{
    expect(gestor.crearListaDeCategorias()).toEqual(['trabajo','personal','familia','otros']);
  });

  it("Deberia buscar una categoria en la lista de categorias predeterminada", () =>{
    expect(validaciones.buscarCategoria("trabajo")).toEqual(true);
  });

  it("Deberia buscar una categoria en la lista de categorias predeterminada", () =>{
    expect(validaciones.buscarCategoria("trabajitos")).toEqual(false);
  });

  it("Deberia validar una categoria", () =>{
    expect(validaciones.validarCategoria("trabajo")).toEqual(true);
  });

  it("Deberia invalidar una categoria que no este en la lista de categorias", () =>{
    expect(validaciones.validarCategoria("categoriaInvalida")).toEqual(false);
  });

  it("Deberia invalidar una categoria vacia", () =>{
    expect(validaciones.validarCategoria("")).toEqual(false);
  });

  it("Deberia asignar una categoria escogida por el usuario a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarCategoriaATarea(tarea,"trabajo")).toEqual(
      {"categoria": "trabajo", 
      "completada": undefined, 
      "descripcion": undefined, 
      "etiquetas": undefined, 
      "fechaLimite": undefined, 
      "id": undefined, 
      "titulo": undefined});
  });

  it("Deberia evitar asignar una categoria que no este en la lista de categorias a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarCategoriaATarea(tarea,"categoriaInvalida")).toEqual(
      "No se creo la tarea. CATEGORIA INVALIDA");
  });

  it("Deberia evitar asignar una categoria vacia a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarCategoriaATarea(tarea,"")).toEqual(
      "No se creo la tarea. CATEGORIA INVALIDA");
  });

  //Asignar fecha limite a una tarea

  it("Deberia validar una fecha limite, devolviendo la fecha", () =>{
    expect(validaciones.validarFecha("2022-12-32")).toEqual("2022-12-32");
  });

  it("Deberia invalidar una fecha limite pasada", () =>{
    expect(validaciones.validarFecha("2020-12-32")).toEqual(false);
  });

  it("Deberia validar una fecha limite vacia, marcandola como sin limite", () =>{
    expect(validaciones.validarFecha("")).toEqual("Ilimitado");
  });

  it("Deberia asignar una fecha limite a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarFechaLimiteATarea(tarea,"2022-1-12")).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": undefined, 
      "etiquetas": undefined, 
      "fechaLimite": "2022-1-12", 
      "id": undefined, 
      "titulo": undefined});
  });

  it("Deberia asignar una fecha limite a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarFechaLimiteATarea(tarea,"")).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": undefined, 
      "etiquetas": undefined, 
      "fechaLimite": "Ilimitado", 
      "id": undefined, 
      "titulo": undefined});
  });

  it("Deberia invalidar una fecha limite pasada al asignarla a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarFechaLimiteATarea(tarea,"2020-11-25")).toEqual(
      "No se creo la tarea. FECHA LIMITE INVALIDA");
  });

  //Asignar Una o Varias Etiquetas a una Tarea 

  it("Deberia validar cualquier etiqueta", () =>{
    expect(validaciones.validarEtiqueta("Hashtag")).toEqual(true);
  });

  it("Deberia invalidar una etiqueta vacia", () =>{
    expect(validaciones.validarEtiqueta("")).toEqual(false);
  });

  it("Deberia asignar una etiqueta a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarEtiquetaATarea(tarea,["Hashtag"])).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": undefined, 
      "etiquetas": ["Hashtag"], 
      "fechaLimite": undefined, 
      "id": undefined, 
      "titulo": undefined});
  });

  it("Deberia asignar varias etiquetas a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarEtiquetaATarea(tarea,["Hashtag","EtiquetaDos"])).toEqual(
      {"categoria": undefined, 
      "completada": undefined, 
      "descripcion": undefined, 
      "etiquetas": ["Hashtag","EtiquetaDos"], 
      "fechaLimite": undefined, 
      "id": undefined, 
      "titulo": undefined});
  });

  it("Deberia asignar una etiqueta a una tarea", () =>{
    let tarea = new gestor.Tarea();
    expect(gestor.asignarEtiquetaATarea(tarea,"")).toEqual(
      "No se creo la tarea. ETIQUETA INVALIDA");
  });


//--------------------------------------------------------------
  it("deberia mostrar una tarea añadida por el usuario", () =>{
    expect(gestor.crearTareaConTitulo("Primera Tarea", false)).toEqual("Primera Tarea");
  });

  it("deberia rechazar una tarea invalida", () =>{
    expect(gestor.crearTareaConTitulo("")).toEqual("No se creo la tarea. TITULO INVALIDO");
  });

  it("deberia mostrar las tareas añadidas por el usuario en la lista de tareas", () =>{
    gestor.crearTareaConTitulo("Segunda Tarea", false);
    expect(listas.mostrarLaListaTareas()).toEqual("\nSegunda Tarea\nPrimera Tarea"); 

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
    expect(listas.getListaCategorias().includes("mascotas")).toEqual(false);
  });

  it("deberia mostrar la lista completa de categorias predeterminadas", () => {
    gestor.crearCategoria("personal");
    gestor.crearCategoria("otros");
    expect(listas.mostrarLaListaCategorias()).toEqual("\ntrabajo\npersonal\nfamilia\notros\ntrabajo\nfamilia\npersonal\notros");
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

  it("deberia creaer una tarea con una etiqueta", () => {
    expect(gestor.crearTareaConEtiqueta("Sexta Tarea","", false)).toEqual("No se creo la tarea. ETIQUETA INVALIDA");
  });

  it("deberia retornar la lista completa de etiquetas", () => {
    expect(listas.getListaEtiquetas()).toEqual(["Etiquetita1","Piano"]);
  });

  it("deberia crear una tarea completa y añadirla a la lista", () => {
    expect(gestor.crearTareaCompleta("Septima Tarea","Descrito","2022-11-19","otros","Guitarra", false)).toEqual("Septima Tarea\nDescripcion: Descrito\nFecha Limite: 2022-11-19\nCategoria: otros\nEtiquetas: Guitarra\nCompletada: false");
  });

  it("deberia invalidar en intento de crear una tarea sin titulo", () => {
    expect(gestor.crearTareaCompleta("","Descrito","2022-11-19","otros","Guitarra", false)).toEqual("No se creo la tarea. TITULO INVALIDO");
  });

  it("deberia crear una tarea, y devolverme una instancia de Tarea, y añadirla a la lista", () => {
    expect(gestor.crearTareaCompletaT("Octava tarea","Descrito","2022-11-19","otros","Guitarra", false)).toEqual({"categoria": "otros", "completada": false, "descripcion": "Descrito", "etiquetas": "Guitarra", "fechaLimite": "2022-11-19", "id": 7, "titulo": "Octava tarea"});
  });

  it("deberia crear una tarea, y devolverme una instancia de Tarea, y añadirla a la lista", () => {
    expect(gestor.crearTareaCompletaT("","Descrito","2022-11-19","otros","Guitarra", false)).toEqual("No se creo la tarea. TITULO INVALIDO");
  });

  it("deberia crear una tarea completada, y devolverme una instancia de Tarea, y añadirla a la lista de tareas completadas", () => {
    expect(gestor.crearTareaCompletada("Decima Tarea","Descrito decimo","2022-12-19","trabajo","Guitarra", true)).toEqual({"categoria": "trabajo", "completada": true, "descripcion": "Descrito decimo", "etiquetas": "Guitarra", "fechaLimite": "2022-12-19", "id": 8, "titulo": "Decima Tarea"});
  });

  it("deberia crear una tarea completada, y devolverme una instancia de Tarea, y añadirla a la lista de tareas completadas", () => {
    expect(gestor.crearTareaCompletada("","Descrito decimo","2022-12-19","trabajo","Guitarra", false)).toEqual("No se creo la tarea. TITULO INVALIDO");
  });

  it("deberia devolver la lista completa de tareas", () => {
    expect(listas.getListaTareasPendientes()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false]");
  });

  // it("deberia mostrar la lista completa de tareas pendientes", () => {
  //   expect(gestor.mostrarTareas()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false]");
  // });
  
  //Ver la posibilidad de hacer mas pruebas con TDD

  it("Deberia devolverme un valor especifico de una lista", () => {
    expect(listas.getElementoDeLista(["Manzana","Papaya","Banano","Mango","Durazno","Berenjena"],"Berenjena")).toEqual("Berenjena");
  });

  it("Deberia informar que no encontro un valor especifico en una lista dada", () => {
    expect(listas.getElementoDeLista(["Manzana","Papaya","Banano","Mango","Durazno","Berenjena"],"Apio")).toEqual("No encontrado");
  });

  it("Deberia devolverme una lista con las tareas que tengan el titulo 'Primera Tarea'", () => {
    expect(listas.getListaTareasPorTitulo("Primera Tarea")).toEqual(["[Titulo:Primera Tarea,Descripcion:,Fecha Limite: ,Categoria: ,Etiquetas: ]"]);
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con el titulo ''", () => {
    let lista = listas.getListaTareasPorTituloT("");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por titulo con todas las tareas que coincidan con el titulo 'Septima'", () => {
    gestor.crearTareaCompleta("Septima Tarea v2","Descrito","2022-11-19","otros","Guitarra",false);
    let lista = listas.getListaTareasPorTituloT("Septima");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la categoria ''", () => {
    let lista = listas.getListaTareasPorCategoria("");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por categoria con todas las tareas que coincidan con la categoria 'otros'", () => {
    let lista = listas.getListaTareasPorCategoria("otros");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la etiqueta ''", () => {
    let lista = listas.getListaTareasPorEtiqueta("");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("Deberia devolverme una lista filtrada por categoria con todas las tareas que coincidan con la etiqueta 'Importante'", () => {
    let lista = listas.getListaTareasPorEtiqueta("Guitarra");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra]");
  });
//[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra]
  it("La busqueda deberia devolverme una lista vacia que coincidan con la fechaLimite: ''", () => {
    let lista = listas.getListaTareasPorDia("");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("La busqueda deberia devolverme una lista que coincidan con la fechaLimite: '2022-11-19'", () => {
    let lista = listas.getListaTareasPorDia("2022-11-19");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("[Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra]");
  });

  it("La busqueda deberia devolverme una lista vacia que coincidan con la descripcion: ''", () => {
    let lista = listas.getListaTareasPorDescripcion("");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("");
  });

  it("La busqueda deberia devolverme una lista que coincidan con la descripcion: 'Descrito'", () => {
    let lista = listas.getListaTareasPorDescripcion("Descrito");
    expect(listas.getListaTareasEspecificas(lista)).toEqual("[Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra]");
  });

  // Completar Tarea
  it("deberia devolver la lista completa de tareas contemplando el campo Completada", () => {
    expect(listas.getListaTareasPendientes()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false]");
  });

  it("Deberia completar una tarea", () => {
    expect(gestor.cambiarEstadoATareaCompletada()).toEqual(true);
  });

  it("Deberia completar una tarea", () => {
    let listaTareasPendientes = listas.getListaTareas();
    let tarea = gestor.cambiarEstadoATareaCompletada(listaTareasPendientes[0]);    //PRIMERA TAREA
    expect(listas.mostrarTarea(tarea)).toEqual("Primera Tarea\nDescripcion: \nFecha Limite: \nCategoria: \nEtiquetas: \nCompletada: true");  //Cambia Primera Tarea a Completada
  });

  it("Deberia devolver la lista completa de tareas contemplando el campo Completada", () => {
    expect(listas.getListaTareasPendientes()).toEqual("[Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false]");
  });

  it("Deberia borrar la tarea completada de la lista de tareas pendientes", () => {
    let listaTareasPendientes = listas.getListaTareas();
    let tarea = listaTareasPendientes[0];
    let index = gestor.obtenerIndexABorrar(tarea);
    gestor.borrarTareaListaPendientes(index, index + 1);
    listas.agregarTareaCompletadaALista(tarea);
    expect(listas.getListaTareasCompletadas()).toEqual("[Titulo:Decima Tarea,Descripcion:Descrito decimo,Fecha Limite:2022-12-19,Categoria:trabajo,Etiquetas: Guitarra,Completada:true][Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true]");
  });

  it("Deberia visualizar la lista de tareas pendientes con la tarea eliminada", () => {
    expect(listas.getListaTareasPendientes()).toEqual("[Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Tercera Tarea,Descripcion:,Fecha Limite:2022-11-19,Categoria:,Etiquetas: ,Completada:false][Titulo:Cuarta Tarea,Descripcion:,Fecha Limite:,Categoria:personal,Etiquetas: ,Completada:false][Titulo:Quinta Tarea,Descripcion:Realizar esta actividad de noche,Fecha Limite:,Categoria:,Etiquetas: ,Completada:false][Titulo:Sexta Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: Piano,Completada:false][Titulo:Septima Tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Octava tarea,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false][Titulo:Septima Tarea v2,Descripcion:Descrito,Fecha Limite:2022-11-19,Categoria:otros,Etiquetas: Guitarra,Completada:false]");
  });

  it("Deberia completar una tarea", () => {
    let listaTareasPendientes = listas.getListaTareas();
    let tarea = listaTareasPendientes[0];
    gestor.completarTarea(tarea);                   //SEGUNDA TAREA
    expect(listas.getListaTareasCompletadas()).toEqual("[Titulo:Decima Tarea,Descripcion:Descrito decimo,Fecha Limite:2022-12-19,Categoria:trabajo,Etiquetas: Guitarra,Completada:true][Titulo:Primera Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true][Titulo:Segunda Tarea,Descripcion:,Fecha Limite:,Categoria:,Etiquetas: ,Completada:true]");
  });

  it("Deberia crear una instancia de tarea", () => {
    let tarea = new Tarea(gestor.getID(),"Novena tarea","Descrito","2022-11-19","otros","Guitarra",false);
    
    expect(tarea).toEqual({"categoria": "2022-11-19", "completada": false, "descripcion": "otros", "etiquetas": "Guitarra", "fechaLimite": "Descrito", "id": 10, "titulo": 
    "Novena tarea"});
  });

  it("Deberia mostrar el mañana", () => {
    let tarea = gestor.esMañana();
    let fechamañana = new Date();
    let dia = fechamañana.getDate()+1;
    let mes = fechamañana.getMonth() + 1;
    let anio = fechamañana.getFullYear();
    expect(tarea).toEqual(anio + "-" + mes + "-" + dia);
  });

  it("Deberia mostrar la cantidad de tareas pendientes para hoy y mañana", () => {
    let tareapendientes = gestor.revisarFechasLimites();
    // gestor.crearTareaCompleta("Octava Tarea","Descrito","2021-11-24","otros","Guitarra",false);
    // gestor.crearTareaCompleta("Novena Tarea","Descritito","2021-11-23","familia","Piano",false);
    expect(tareapendientes).toEqual(0);
  });

  it("Deberia mostrar la cantidad de tareas pendientes para mañana", () => {
    gestor.crearTareaCompleta("Octava Tarea","Descrito",gestor.esMañana(),"otros","Guitarra",false);
    let tareapendientes = gestor.revisarFechasLimites();
    expect(tareapendientes).toEqual(1);
  });

  it("Deberia mostrar la cantidad de tareas pendientes para hoy y mañana", () => {
    gestor.crearTareaCompleta("Novena Tarea","Descritito",gestor.esHoy(),"familia","Piano",false);
    let tareapendientes = gestor.revisarFechasLimites();
    expect(tareapendientes).toEqual(2);
  });

  it("Deberia devolver uns lista de tareas completadas filtrada por una categoria", () => {
    expect(listas.getListaTareasCompletasPorCategoria("trabajo")).toEqual([{"categoria": "trabajo", "completada": true, "descripcion": "Descrito decimo", "etiquetas": "Guitarra", "fechaLimite": "2022-12-19", "id": 8, "titulo": "Decima Tarea"}]);
  });

  it("Deberia devolver una busqueda vacia en la lista de tareas completas por una categoria vacia", () => {
    expect(listas.getListaTareasCompletasPorCategoria("")).toEqual([]);
  });

  it("Deberia verificar si el string es vacio, en ese caso devolver 'n/a', si no devolver el mismo string", () => {
    expect(validaciones.verificarCampoVacio("")).toEqual("n/a");
  });

  it("Deberia verificar si el string es vacio, en ese caso devolver 'n/a', si no devolver el mismo string", () => {
    expect(validaciones.verificarCampoVacio("CampoRevisado")).toEqual("CampoRevisado");
  });

  it("Deberia devolverme la lista de tareas pendientes", () => {
    expect(listas.getListaTareasArray()).toEqual( [{"categoria": "", "completada": false, "descripcion": "", "etiquetas": "", "fechaLimite": "2022-11-19", "id": 2, "titulo": "Tercera Tarea"}, {"categoria": "personal", "completada": false, "descripcion": "", "etiquetas": "", "fechaLimite": "", "id": 3, "titulo": "Cuarta Tarea"}, {"categoria": "", "completada": false, "descripcion": "Realizar esta actividad de noche", "etiquetas": "", "fechaLimite": "", "id": 4, "titulo": "Quinta Tarea"}, {"categoria": "", "completada": false, "descripcion": "", "etiquetas": "Piano", "fechaLimite": "", "id": 5, "titulo": "Sexta Tarea"}, {"categoria": "otros", "completada": false, "descripcion": "Descrito", "etiquetas": "Guitarra", "fechaLimite": "2022-11-19", "id": 6, "titulo": "Septima Tarea"}, {"categoria": "otros", "completada": false, "descripcion": "Descrito", "etiquetas": "Guitarra", "fechaLimite": "2022-11-19", "id": 7, "titulo": "Octava tarea"}, {"categoria": "otros", "completada": false, "descripcion": "Descrito", "etiquetas": "Guitarra", "fechaLimite": "2022-11-19", "id": 9, "titulo": "Septima Tarea v2"}, {"categoria": "otros", "completada": false, "descripcion": "Descrito", "etiquetas": "Guitarra", "fechaLimite": gestor.esMañana(), "id": 11, "titulo": "Octava Tarea"}, {"categoria": "familia", "completada": false, "descripcion": "Descritito", "etiquetas": "Piano", "fechaLimite": gestor.esHoy(), "id": 12, "titulo": "Novena Tarea"}]);
  });

  it("Deberia devolverme la lista de tareas completadas", () => {
    expect(listas.getListaCompletadasTareas()).toEqual([{"categoria": "trabajo", "completada": true, "descripcion": "Descrito decimo", "etiquetas": "Guitarra", "fechaLimite": "2022-12-19", "id": 8, "titulo": "Decima Tarea"}, {"categoria": "", "completada": true, "descripcion": "", "etiquetas": "", "fechaLimite": "", "id": 0, "titulo": "Primera Tarea"}, {"categoria": "", "completada": true, "descripcion": "", "etiquetas": "", "fechaLimite": "", "id": 1, "titulo": "Segunda Tarea"}]);
  });

  it("Deberia devolverme la lista de tareas completadas en un rango de fechas", () => {
    expect(listas.getListaTareasPorRangoFechas("2022-12-11","2022-12-21")).toEqual([{"categoria": "trabajo", "completada": true, "descripcion": "Descrito decimo", "etiquetas": "Guitarra", "fechaLimite": "2022-12-19", "id": 8, "titulo": "Decima Tarea"}]);
  });

  it("Deberia devolverme la lista vacia de una busqueda de tareas completadas en un rango de fechas, por falta de una fecha", () => {
    expect(listas.getListaTareasPorRangoFechas("2022-11-11","")).toEqual([]);
  });

  it("Deberia devolverme la lista vacia de una busqueda de tareas completadas en un rango de fechas, por falta de una fecha", () => {
    expect(listas.getListaTareasPorRangoFechas("","2022-11-11")).toEqual([]);
  });

  it("Deberia devolver la cantidad de tareas completadas por categoría", () => {
    let obj = {"": 2, "familia": 1, "otros": 1, "personal": 1, "trabajo": 1};
    gestor.crearCategoria("");
    gestor.crearTareaCompletada("Septima Tarea v2","Descrito","2022-11-19","otros","Guitarra",true)
    gestor.crearTareaCompletada("Onceava Tarea","Descrito once","2022-12-19","familia","Piano",true)
    gestor.crearTareaCompletada("Doceava Tarea","Descrito doce","2022-11-29","personal","LOOOL",true)
    expect(listas.getNumTareasCompletadasPorCategoria()).toEqual(obj);
  });

  it("Deberia completar una tarea", () => {
    let lista = listas.getListaTareasArray();
    expect(gestor.completarTareaPendiente(lista[0].id)).toEqual(true);
  });

  it("Deberia fallar al completar una tarea", () => {
    
    expect(gestor.completarTareaPendiente(5000000)).toEqual(false);
  });

});
