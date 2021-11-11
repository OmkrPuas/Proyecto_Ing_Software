import * as gestor from './App2.js';

describe("Gestor de Tareas", () => {
  it("Deberia devolver la cadena que se le envia", () => {
    expect(gestor.titulo("Barrer la casa")).toEqual("Barrer la casa");
  });

  it("Deberia crear una tarea y devolverla", () => {
    expect(gestor.crearTarea("Barrer la casa","","","")).toEqual({"categoria": "", "descripcion": "", "fechaLim": "", "id": 0, "titulo": "Barrer la casa"});
  });

  it("Deberia crear una tarea con su descripcion y devolverla", () => {
    expect(gestor.crearTarea("Barrer la casa", "Barrer la sala y cocina","","")).toEqual({"categoria": "", "descripcion": "Barrer la sala y cocina", "fechaLim": "", "id": 0, "titulo": "Barrer la casa"});
  });

  it("Deberia crear una tarea con su descripcion, y su categoria", () => {
    expect(gestor.crearTarea("Barrer la casa", "Barrer la sala y cocina", "Quehaceres","")).toEqual({"categoria": "Quehaceres", "descripcion": "Barrer la sala y cocina", "fechaLim": "", "id": 0, "titulo": "Barrer la casa"});
  });

  it("Deberia crear una tarea con su descripcion, su categoria, y una fecha limite, y devolver la tarea", () => {
    expect(gestor.crearTarea("Barrer la casa", "Barrer la sala y cocina", "Quehaceres", "14/6/2020")).toEqual({"categoria": "Quehaceres", "descripcion": "Barrer la sala y cocina", "fechaLim": "14/6/2020", "id": 0, "titulo": "Barrer la casa"});
  });

  it("Deberia crear una tarea y devolver una lista", () => {
    expect(gestor.aumentarTarea("Barrer la casa", "Barrer la sala y cocina", "Quehaceres", "14/6/2020")).toEqual([{"categoria": "Quehaceres", "descripcion": "Barrer la sala y cocina", "fechaLim": "14/6/2020", "id": 0, "titulo": "Barrer la casa"}]);
  });

  it("Deberia devolver una lista", () => {
    expect(gestor.obtenerLista()).toEqual([{"categoria": "Quehaceres", "descripcion": "Barrer la sala y cocina", "fechaLim": "14/6/2020", "id": 0, "titulo": "Barrer la casa"}]);
  });

});

