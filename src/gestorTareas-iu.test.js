import fs from "fs";
// import * as gestor from './gestorTareas.js';


describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("index.html", "utf8");
    require("./gestorTareas.js");
  });
//PRUEBAS DE CREAR TAREA
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
    expect(lista_elem.innerHTML).toEqual("<ul><li><div class=\"dropdown\"><span>Primera Tarea</span><div class=\"dropdown-content\"><ul><li>Categoria: personal</li><li>Descripcion: n/a</li><li>Fecha Limite: Ilimitado</li><li>Etiquetas: n/a</li></ul></div></div></li></ul><button onclick=\"showImportedMessage(0);\">Completar</button>");
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

  it("Deberia añadir una etiqueta a la lista de etiquetas y mostrar solo el contenido de la lista de etiquetas", () => {
    const etiqueta_elem = document.querySelector("#nueva-etiqueta");
    const boton_nueva_etiqueta = document.querySelector("#añadir-etiqueta");
    const lista_etiquetas = document.querySelector("#form-etiquetas");

    etiqueta_elem.value = "ForYou";
    boton_nueva_etiqueta.click();
    expect(lista_etiquetas.innerHTML).toEqual(
      "\n          <input type=\"checkbox\" id=\"etiqueta1\" name=\"etiqueta\" value=\"Piano\">\n          <label for=\"etiqueta1\"> Piano</label><br>\n          <input type=\"checkbox\" id=\"etiqueta2\" name=\"etiqueta\" value=\"Guitarra\">\n          <label for=\"etiqueta2\"> Guitarra</label><br>\n          <input type=\"checkbox\" id=\"etiqueta3\" name=\"etiqueta\" value=\"Yolo\">\n          <label for=\"etiqueta3\"> Yolo</label><br>\n          <input type=\"checkbox\" id=\"etiqueta4\" name=\"etiqueta\" value=\"Importante\">\n          <label for=\"etiqueta3\"> Importante</label><br>\n          <input type=\"checkbox\" id=\"etiqueta5\" name=\"etiqueta\" value=\"LMAO\">\n          <label for=\"etiqueta3\"> LMAO</label><br>\n          <input type=\"checkbox\" id=\"etiqueta6\" name=\"etiqueta\" value=\"LOOOL\">\n          <label for=\"etiqueta3\"> LOOOL</label><br>\n        <input type=\"checkbox\" id=\"etiqueta\" name=\"etiqueta\" value=\"ForYou\"><label for=\"etiqueta3\">ForYou</label><br>");
  });

  it("Deberia añadir una etiqueta a la lista de etiquetas y mostrar solo el contenido de la lista de etiquetas de los filtros", () => {
    const etiqueta_elem = document.querySelector("#nueva-etiqueta");
    const boton_nueva_etiqueta = document.querySelector("#añadir-etiqueta");
    const lista_etiquetas = document.querySelector("#etiquetas-filtro");

    //etiqueta_elem.value = "ForYou"; añadido en la anterior prueba
    //boton_nueva_etiqueta.click();
    expect(lista_etiquetas.innerHTML).toEqual(
      "\n            <input type=\"checkbox\" id=\"etiqueta1\" name=\"filtro-etiqueta\" value=\"Piano\">\n            <label for=\"etiqueta1\"> Piano</label><br>\n            <input type=\"checkbox\" id=\"etiqueta2\" name=\"filtro-etiqueta\" value=\"Guitarra\">\n            <label for=\"etiqueta2\"> Guitarra</label><br>\n            <input type=\"checkbox\" id=\"etiqueta3\" name=\"filtro-etiqueta\" value=\"Yolo\">\n            <label for=\"etiqueta3\"> Yolo</label><br>\n            <input type=\"checkbox\" id=\"etiqueta4\" name=\"filtro-etiqueta\" value=\"Importante\">\n            <label for=\"etiqueta3\"> Importante</label><br>\n            <input type=\"checkbox\" id=\"etiqueta5\" name=\"filtro-etiqueta\" value=\"LMAO\">\n            <label for=\"etiqueta3\"> LMAO</label><br>\n            <input type=\"checkbox\" id=\"etiqueta6\" name=\"filtro-etiqueta\" value=\"LOOOL\">\n            <label for=\"etiqueta3\"> LOOOL</label><br>\n          <input type=\"checkbox\" id=\"etiqueta\" name=\"filtro-etiqueta\" value=\"ForYou\"><label for=\"etiqueta3\">ForYou</label><br>");
  });

  it("Deberia completar una tarea con titulo, categoria, fecha limite, descripcion y etiquetas, y mostrar solo el contenido", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    const fecha_elem = document.querySelector("#fecha");
    const descripcion_elem = document.querySelector("#descripcion");

    var elements = document.getElementsByName("etiqueta");
    elements[0].checked = true;

    tarea_elem.value = "Sexta Tarea";
    categoria_elem.value = "familia";
    fecha_elem.value = "2022-11-28";
    descripcion_elem.value = "Esta es una descripcion";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: PianoCompletarQuinta TareaCategoria: personalDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: n/aCompletarCuarta TareaCategoria: personalDescripcion: n/aFecha Limite: 2022-11-28Etiquetas: n/aCompletarTercera TareaCategoria: otrosDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarSegunda TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarPrimera TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletar");
  });

  it("Deberia fallar al crear una tarea con titulo vacio", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    const fecha_elem = document.querySelector("#fecha");
    const descripcion_elem = document.querySelector("#descripcion");

    var elements = document.getElementsByName("etiqueta");
    elements[0].checked = true;

    tarea_elem.value = "";
    categoria_elem.value = "familia";
    fecha_elem.value = "2022-11-28";
    descripcion_elem.value = "Esta es una descripcion";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("");
  });

  it("Deberia fallar al crear una tarea con una fecha invalida", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    const fecha_elem = document.querySelector("#fecha");
    const descripcion_elem = document.querySelector("#descripcion");

    var elements = document.getElementsByName("etiqueta");
    elements[0].checked = true;

    tarea_elem.value = "Tarea invalida";
    categoria_elem.value = "familia";
    fecha_elem.value = "2020-11-28";
    descripcion_elem.value = "Esta es una descripcion";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("");
  });

  it("Deberia fallar al crear una tarea con demasiadas etiquetas", () => {
    const tarea_elem = document.querySelector("#tarea");
    const boton_elem = document.querySelector("#crear-tarea");
    const lista_elem = document.querySelector("#lista-tareas");
    const categoria_elem = document.querySelector("#select-categoria");
    const fecha_elem = document.querySelector("#fecha");
    const descripcion_elem = document.querySelector("#descripcion");

    var elements = document.getElementsByName("etiqueta");
    elements[0].checked = true;
    elements[1].checked = true;
    elements[2].checked = true;
    elements[3].checked = true;
    elements[4].checked = true;
    elements[5].checked = true;

    tarea_elem.value = "Tarea invalida";
    categoria_elem.value = "familia";
    fecha_elem.value = "2020-11-28";
    descripcion_elem.value = "Esta es una descripcion";
    boton_elem.click();
    expect(lista_elem.textContent).toEqual("");
  });

  it("Deberia mostrar las tareas pendientes", () => {
    const boton_mostrar = document.querySelector("#mostrar-tareas");
    const lista_elem = document.querySelector("#lista-tareas");
    
    boton_mostrar.click();
    expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: PianoCompletarQuinta TareaCategoria: personalDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: n/aCompletarCuarta TareaCategoria: personalDescripcion: n/aFecha Limite: 2022-11-28Etiquetas: n/aCompletarTercera TareaCategoria: otrosDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarSegunda TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletarPrimera TareaCategoria: personalDescripcion: n/aFecha Limite: IlimitadoEtiquetas: n/aCompletar");
  });
//PRUEBAS DE FILTROS 
it("Deberia filtrar la lista por el titulo", () => {
  const boton_titulo_filtro = document.querySelector("#filtro-titulo");
  const lista_elem = document.querySelector("#lista-tareas");
  const titulo_filtro = document.querySelector("#titulo-filtro");
  titulo_filtro.value = "Sexta Tarea"

  boton_titulo_filtro.click();
  expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: Piano");
});

it("Deberia fallar al filtrar la lista por un titulo vacio", () => {
  const boton_titulo_filtro = document.querySelector("#filtro-titulo");
  const lista_elem = document.querySelector("#lista-tareas");
  const titulo_filtro = document.querySelector("#titulo-filtro");
  titulo_filtro.value = ""

  boton_titulo_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia fallar al filtrar la lista por un titulo inexistente", () => {
  const boton_titulo_filtro = document.querySelector("#filtro-titulo");
  const lista_elem = document.querySelector("#lista-tareas");
  const titulo_filtro = document.querySelector("#titulo-filtro");
  titulo_filtro.value = "Inexistente"

  boton_titulo_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia filtrar la lista por una categoria", () => {
  const boton_categoria_filtro = document.querySelector("#filtro-categoria");
  const lista_elem = document.querySelector("#lista-tareas");
  const categoria_filtro = document.querySelector("#categoria-filtro");
  categoria_filtro.value = "familia"

  boton_categoria_filtro.click();
  expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: Piano");
});

it("Deberia fallar al filtrar la lista por una categoria vacia", () => {
  const boton_categoria_filtro = document.querySelector("#filtro-categoria");
  const lista_elem = document.querySelector("#lista-tareas");
  const categoria_filtro = document.querySelector("#categoria-filtro");
  categoria_filtro.value = ""

  boton_categoria_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia fallar al filtrar la lista por una categoria fuera de la lista predeterminada", () => {
  const boton_categoria_filtro = document.querySelector("#filtro-categoria");
  const lista_elem = document.querySelector("#lista-tareas");
  const categoria_filtro = document.querySelector("#categoria-filtro");
  categoria_filtro.value = "ingenieria de software";

  boton_categoria_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia filtrar la lista por una etiqueta", () => {
  const boton_etiqueta_filtro = document.querySelector("#filtro-etiquetas");
  const lista_elem = document.querySelector("#lista-tareas");
  var elements = document.getElementsByName("filtro-etiqueta");
  elements[0].checked = true;

  boton_etiqueta_filtro.click();
  expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: Piano");
});

it("Deberia fallar al filtrar la lista por falta de etiquetas", () => {
  const boton_etiqueta_filtro = document.querySelector("#filtro-etiquetas");
  const lista_elem = document.querySelector("#lista-tareas");
  var elements = document.getElementsByName("filtro-etiqueta");

  boton_etiqueta_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia filtrar la lista por una fecha", () => {
  const boton_fecha_filtro = document.querySelector("#filtro-dia");
  const lista_elem = document.querySelector("#lista-tareas");
  const fecha_filtro = document.querySelector("#dia-filtro");
  fecha_filtro.value = "2022-11-28";

  boton_fecha_filtro.click();
  expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: PianoQuinta TareaCategoria: personalDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: n/aCuarta TareaCategoria: personalDescripcion: n/aFecha Limite: 2022-11-28Etiquetas: n/a");
});

it("Deberia fallar al filtrar la lista por una fecha vacia", () => {
  const boton_fecha_filtro = document.querySelector("#filtro-dia");
  const lista_elem = document.querySelector("#lista-tareas");
  const fecha_filtro = document.querySelector("#dia-filtro");
  fecha_filtro.value = "";

  boton_fecha_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia filtrar la lista por una descripcion", () => {
  const boton_descripcion_filtro = document.querySelector("#filtro-descripcion");
  const lista_elem = document.querySelector("#lista-tareas");
  const descripcion_filtro = document.querySelector("#descripcion-filtro");
  descripcion_filtro.value = "Esta es una descripcion";

  boton_descripcion_filtro.click();
  expect(lista_elem.textContent).toEqual("Sexta TareaCategoria: familiaDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: PianoQuinta TareaCategoria: personalDescripcion: Esta es una descripcionFecha Limite: 2022-11-28Etiquetas: n/a");
});

it("Deberia fallar al filtrar la lista por una descripcion vacia", () => {
  const boton_descripcion_filtro = document.querySelector("#filtro-descripcion");
  const lista_elem = document.querySelector("#lista-tareas");
  const descripcion_filtro = document.querySelector("#descripcion-filtro");
  descripcion_filtro.value = "";

  boton_descripcion_filtro.click();
  expect(lista_elem.textContent).toEqual("");
});

it("Deberia alertar la cantidad de tareas pendientes para hoy y mañana ", () => {
  const urgentes = document.querySelector("#urgentes");
  const boton_urgentes = document.querySelector("#revisar-fechas");

  boton_urgentes.click();
  expect(urgentes.value).toEqual(0);
});

//PRUEBAS TAREAS COMPLETADAS 


  afterEach(() => {
    const lista_elem = document.querySelector("#lista-tareas");
    lista_elem.innerHTML = "";
  });

});
