import fs from "fs";
// import * as gestor from './gestorTareas.js';


describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("index.html", "utf8");
    require("./gestorTareas.js");
  });

  it("Al iniciar no hay nada en la lista de tareas", () => {
    const lista_elem = document.querySelector("#lista-tareas");
    expect(lista_elem.innerHTML).toEqual("");
  });

  it("Deberia completar una tarea solo con titulo y mostrar elementos y tags", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");

    tarea_elem.value = "Primera Tarea";
    boton_elem.click();
    expect(lista_elem.innerHTML).toEqual("<ul><li><div class=\"dropdown\"><span>Primera Tarea</span><div class=\"dropdown-content\"><ul><li>Categoria: personal</li><li>Descripcion: n/a</li><li>Fecha Limite: Ilimitado</li><li>Etiquetas: n/a</li></ul></div></div></li></ul><button onclick=\"myFunction(0)\">Completar</button>");
  });

  it("Deberia completar una tarea solo con titulo y mostrar solo el contenido", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    
    tarea_elem.value = "Segunda Tarea";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("Segunda TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarPrimera TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletar");
  });

  it("Deberia completar una tarea con titulo y categoria, y mostrar solo el contenido", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    
    tarea_elem.value = "Tercera Tarea";
    categoria_elem.value = "otros"
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("Tercera TareaCategoria: otrosDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarSegunda TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarPrimera TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletar");
  });

  it("Deberia completar una tarea con titulo, categoria y fecha limite, y mostrar solo el contenido", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    const fecha_elem = document.querySelector("#fecha");

    tarea_elem.value = "Cuarta Tarea";
    categoria_elem.value = "personal";
    fecha_elem.value = "2022-11-28";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("Cuarta TareaCategoria: personalDescripcion: n/aFecha Limite: 2022-11-28Etiquetas: n/aCompletarTercera TareaCategoria: otrosDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarSegunda TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarPrimera TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletar");
  });

  it("Deberia completar una tarea con titulo, categoria, fecha limite y descripcion, y mostrar solo el contenido", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    const fecha_elem = document.querySelector("#fecha");
    const descripcion_elem = document.querySelector("#descripcion");

    tarea_elem.value = "Quinta Tarea";
    categoria_elem.value = "personal";
    fecha_elem.value = "2022-11-28";
    descripcion_elem.value = "Esta es una descripcion";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("Quinta TareaCategoria: personalDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: n/aCompletarCuarta TareaCategoria: personalDescripcion: n/aFecha Limite: 2022-11-28Etiquetas: n/aCompletarTercera TareaCategoria: otrosDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarSegunda TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarPrimera TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletar");
  });

//   it("Visualizar tarea en la lista", () => {
//     const tarea_elem = document.querySelector("#tarea");
//     const fecha_elem = document.querySelector("#fecha");
//     const descripcion_elem = document.querySelector("#descripcion");
//     const boton_elem = document.querySelector("#crear-tarea");
//     const lista_elem = document.querySelector("#lista-tareas");
//     const categoria_elem = document.querySelector("#select-categoria");
//     const mostrarTareas_elem = document.querySelector("#mostrar-tareas");
//     boton_elem.addEventListener("click", (event) => {
//         let tarea = gestor.classTarea(0, "a", "Ilimitado", "otros", "a", "n/a");
//         gestor.añadirAListaTarea(tarea);
//         id++;
//         // var aux = lista_elem.innerHTML;
//         lista_elem.innerHTML = "<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" +tarea.titulo + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + tarea.categoria +"</li>"+ "<li>" + "Descripcion: " + tarea.descripcion + "</li>" + "<li>" + "Fecha Limite: " + tarea.fechaLimite + "</li>"+  "<li>" + "Etiquetas: " + tarea.etiquetas + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>";
//     });
//     console.log(lista_elem.innerHTML);
//     expect(lista_elem.innerHTML).toEqual("<ul>" + "<li>" + "<div class='dropdown'>" + "<span>" + "a" + "</span>" + "<div class='dropdown-content'>" + "<ul>"+ "<li>" + "Categoria: " + "otros" +"</li>"+ "<li>" + "Descripcion: " + "a" + "</li>" + "<li>" + "Fecha Limite: " + "Ilimitado" + "</li>"+  "<li>" + "Etiquetas: " + "n/a" + "</li>" +"</div>"+ "</div>" + "</ul>" + "</li>");
//   });

  afterEach(() => {
    const lista_elem = document.querySelector("#lista-tareas");
    lista_elem.innerHTML = "";
  });

});
