
//PABLO
var lista = [{Id:0, Titulo: "Secreto", Descripcion: ""},{Id:1, Titulo: "Tarea para ayer", Descripcion: "gg"}];
function añadirDescripcion(id, nuevaDescripcion){
  var tmp = lista.find(tarea => tarea.Id === id);
  tmp.Descripcion = nuevaDescripcion;
}
function retornarLista(){
  return lista;
}

module.exports ={
  añadirDescripcion,
  retornarLista
}
//PABLO
