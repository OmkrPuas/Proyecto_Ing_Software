// var id = 0;
var listaTareasPendientes = new Array();
const listaCategorias = new Array();
var listaTareasCompletadas = new Array();
const listaEtiquetas = new Array();


//-----------------------------------------------------------------
//----------------GET LISTAS-Y-FILTROS-EN-LISTAS-------------------


export function getListaTareasPendientes(){
    var cadena = "";
    for (let index = 0; index < listaTareasPendientes.length; index++) {
      var tarea = listaTareasPendientes[index];
      cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria + ",Etiquetas: " + tarea.etiquetas + ",Completada:" + tarea.completada + "]";
    }   
    return cadena;
  }
  
  export function getListaTareasEspecificas(lista){
    let cadena = "";
    for (var index = 0; index < lista.length; index++) {
      let tarea = lista[index];
      cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria + ",Etiquetas: " + tarea.etiquetas + "]";
    }   
    return cadena;
  }
  
  export function getListaCategorias(){
    return listaCategorias;
  }
  
  export function getListaEtiquetas(){
    return listaEtiquetas;
  }
  
  export function getListaTareas(){
  return listaTareasPendientes;
  }
  
  export function getListaTareasPorTitulo(titulo){
    var encontrado = [];
    for(var i = 0; i < listaTareasPendientes.length; i++){
      if(listaTareasPendientes[i].titulo == titulo){
        var guardado = "[Titulo:" + listaTareasPendientes[i].titulo + ",Descripcion:" + listaTareasPendientes[i].descripcion +",Fecha Limite: " + listaTareasPendientes[i].fechaLimite + ",Categoria: " + listaTareasPendientes[i].categoria + ",Etiquetas: " + listaTareasPendientes[i].etiquetas + "]";
        //
        encontrado.push(guardado);
      }
    }
    return encontrado;
  }
  
  export function getListaTareasPorTituloT(titulo){
    if(titulo == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasPendientes.length; i++){ 
      var re = new RegExp(titulo, "g");
      if(listaTareasPendientes[i].titulo.match(re)){
        encontrado.push(listaTareasPendientes[i]);
      }
    }
    return encontrado;
  }
  export function getListaTareasPorCategoria(categoria){
    if(categoria == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasPendientes.length; i++){
      if(listaTareasPendientes[i].categoria === categoria){
        encontrado.push(listaTareasPendientes[i]);
      }
    }
    return encontrado;
  }
  
  export function getListaTareasCompletasPorCategoria(categoria){
    if(categoria == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasCompletadas.length; i++){
      if(listaTareasCompletadas[i].categoria === categoria){
        encontrado.push(listaTareasCompletadas[i]);
      }
    }
    return encontrado;
  }
  
  export function getListaTareasPorEtiqueta(etiquetas){
    if(etiquetas == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasPendientes.length; i++){
      if(listaTareasPendientes[i].etiquetas == etiquetas){
        encontrado.push(listaTareasPendientes[i]);
      }
    }
    return encontrado;
  }
  
  export function getListaTareasPorDia(dia){
    if(dia == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasPendientes.length; i++){
      if(listaTareasPendientes[i].fechaLimite === dia){
        encontrado.push(listaTareasPendientes[i]);
      }
    }
    return encontrado;
  }
  
  export function getListaTareasPorDescripcion(descripcion){
    if(descripcion == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasPendientes.length; i++){ 
      var re = new RegExp(descripcion, "g");
      if(listaTareasPendientes[i].descripcion.match(re)){
        encontrado.push(listaTareasPendientes[i]);
      }
    }
    return encontrado;
  }
  
  
  export function getNumTareasCompletadasPorCategoria(){
    let categoriasCompletadas = {'trabajo':0,'familia':0,'personal':0,'otros':0,'':0};
    for (let i = 0; i < listaTareasCompletadas.length; i++){
      categoriasCompletadas[listaTareasCompletadas[i].categoria]+=1;
    }
    return categoriasCompletadas;
  }
  
  export function getListaTareasPorRangoFechas(dia1, dia2){
    if(dia1 == "" || dia2 == ""){
      return [];
    }
    let encontrado = [];
    for(let i = 0; i < listaTareasCompletadas.length; i++){
      if(listaTareasCompletadas[i].fechaLimite >= dia1 && listaTareasCompletadas[i].fechaLimite <= dia2){
        encontrado.push(listaTareasCompletadas[i]);
      }
    }
    return encontrado;
  }
  
  export function getListaCompletadasTareas(){
    return listaTareasCompletadas;
  }
  
  
  export function getListaTareasCompletadas(){
    var cadena = "";
    for (let index = 0; index < listaTareasCompletadas.length; index++) {
      var tarea = listaTareasCompletadas[index];
      cadena += "[Titulo:" + tarea.titulo + ",Descripcion:" +tarea.descripcion+ ",Fecha Limite:" + tarea.fechaLimite+ ",Categoria:" + tarea.categoria + ",Etiquetas: " + tarea.etiquetas + ",Completada:" + tarea.completada + "]";
    }   
    return cadena;
  }
  
  export function getElementoDeLista(lista, elemento){
    var encontrado = "";
    for(var i = 0; i < lista.length; i++){
      if(lista[i] == elemento){
        encontrado = lista[i];
      }
    }
    if(encontrado == ""){
      encontrado = "No encontrado";
    }
    return encontrado;
  }
  
  export function getListaTareasArray(){
    return listaTareasPendientes;
  }
  
  //-----------------------------------------------------------------
  //------------------------------AGREGAR A LISTAS-----------------------
  
  export function añadirAListaTarea(tarea){
    //console.log(id);
    listaTareasPendientes.push(tarea);
    // id++;
    return tarea;
  }
  
  export function agregarTareaCompletadaALista(tarea){
    listaTareasCompletadas.push(tarea);
  }
  
  //-----------------------------------------------------------------
  //------------------------------MOSTRAR LISTAS-----------------------
  
  
  export function mostrarLaListaTareas(){
      var cadena = "";
      for (let index = listaTareasPendientes.length-1; index >= 0; index--) {
        cadena += "\n" + listaTareasPendientes[index].titulo;
      }
      return cadena;
    }
  
  export function mostrarLaListaCategorias(){
      var cadena = "";
      for (var index = 0; index < listaCategorias.length; index++) {
          cadena += "\n" + listaCategorias[index];
      }
      return cadena;
  }
  
  export function mostrarTarea(tarea){
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion+ "\nFecha Limite: " + tarea.fechaLimite+ "\nCategoria: " + tarea.categoria + "\nEtiquetas: " + tarea.etiquetas + "\nCompletada: " + tarea.completada;
  }

  export function vaciarListas(){
    listaTareasPendientes = [];
    listaTareasCompletadas = [];
  }
