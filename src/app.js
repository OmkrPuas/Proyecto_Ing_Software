var id = 0;
const listaTareasPendientes = new Array();
const listaCategorias = new Array();
const listaTareasCompletadas = new Array();
const listaEtiquetas = new Array();
const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const anio = fechaActual.getFullYear();

export class Tarea {

  constructor(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada) {
    this.id = id;
    this.titulo = titulo;
    this.fechaLimite = fechaLimite;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.etiquetas = etiquetas;
    this.completada = completada;
  }
}

export function classTarea(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada){
  let tmp = new Tarea(id, titulo, fechaLimite, categoria, descripcion, etiquetas, completada);
  return tmp;
}

export function inicializarListas(){
  listaCategorias.push('','trabajo','personal','familia','otros');
  listaEtiquetas.push('Piano','Guitarra','Yolo','Importante','LMAO','LOOOL');
}


export function esMañana(){
  return anio + "-" + mes + "-" + (dia+1);
}

// ---------------------ASIGNACIONES------------------


export function asignarTituloATarea(tarea, titulo){
  if(validarTitulo(titulo)){
    tarea.titulo = titulo;
    return tarea;
  }else{
    return "No se creo la tarea. TITULO INVALIDO";
  }
}

export function asignarDescipcionATarea(tarea, descripcion){
  let descripcionVerificada = verificarDescripcion(descripcion);
  tarea.descripcion = descripcionVerificada;
  return tarea;
}

export function asignarCategoriaATarea(tarea, categoria){
  if(validarCategoria(categoria)){
    tarea.categoria = categoria;
    return tarea;
  }else{
    return "No se creo la tarea. CATEGORIA INVALIDA";
  }
}

//-----------EXTRA------------
export function esHoy(){
  return anio + "-" + mes + "-" + dia;
}
//----------------------------

export function asignarFechaLimiteATarea(tarea, fecha){
  fecha = validarFecha(fecha);
  if(fecha != false){
    tarea.fechaLimite = fecha;
    return tarea;
  }else{
    return "No se creo la tarea. FECHA LIMITE INVALIDA";
  }
}

export function asignarEtiquetaATarea(tarea, etiqueta){
  if(validarEtiqueta(etiqueta)){
    tarea.etiquetas = etiqueta;
    return tarea;
  }else{
    return "No se creo la tarea. ETIQUETA INVALIDA";
  }
}



// ---------------------CREAR TAREA------------------

export function crearTareaConTitulo(NombreTarea, completada){
  if(NombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,NombreTarea, "", "", "","", completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo;
  }
}

export function crearTareaConFechaLimite(nombreTarea, fechaLimite, completada){
  if(validarFechaLimite(fechaLimite) != "No se pudo crear la tarea, FECHA INVALIDA."){
    let tarea = new Tarea(id,nombreTarea, fechaLimite, "", "","", completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nFecha Limite: " + tarea.fechaLimite;
  }else{
      return "No se pudo crear la tarea, FECHA INVALIDA.";
  }
}

export function crearTareaConCategoria(nombreTarea, categoria, completada){
  //console.log(id);
  let tarea = new Tarea(id,nombreTarea, "", categoria, "","", completada);
  listaTareasPendientes.push(tarea);
  id++;
  return tarea.titulo + "\nCategoria: " + tarea.categoria;
}

export function crearTareaConDescripcion(nombreTarea, descripcion, completada){
  //console.log(id);
  if(descripcion == ""){
    return "No se creo la tarea. DESCRIPCION INVALIDA"
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", descripcion,"", completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion;
  }
}

export function crearTareaConEtiqueta(nombreTarea, etiqueta, completada){
  if(crearEtiqueta(etiqueta) == "No Etiquetado"){
    return "No se creo la tarea. ETIQUETA INVALIDA";
  }else{
    let tarea = new Tarea(id,nombreTarea, "", "", "", etiqueta, completada);
    listaTareasPendientes.push(tarea);
    id++;
    return tarea.titulo + "\nEtiquetas: " + tarea.etiquetas;
  }
}

export function crearTareaCompleta(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    añadirAListaTarea(tarea);
    id++;
    return tarea.titulo + "\nDescripcion: " + tarea.descripcion+ "\nFecha Limite: " + tarea.fechaLimite+ "\nCategoria: " + tarea.categoria + "\nEtiquetas: " + tarea.etiquetas + "\nCompletada: " + tarea.completada;
  }
}

export function crearTareaCompletaT(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    añadirAListaTarea(tarea);
    id++;
    return tarea;
  }
}

export function crearTareaCompletada(nombreTarea, descripcion, fechaLimite, categoria, etiqueta, completada){
  //console.log(id);
  if(nombreTarea == ""){
    return "No se creo la tarea. TITULO INVALIDO";
  }else{
    let tarea = new Tarea(id,nombreTarea, fechaLimite, categoria, descripcion, etiqueta, completada);
    listaTareasCompletadas.push(tarea);
    id++;
    return tarea;
  }
}

//-----------------------------------------------------------------
//------------------------------VALIDACIONES-----------------------

export function verificarCampoVacio(campo){
  if(campo == "" ){
    campo = "n/a";
  }
  return campo;
}

export function validarTitulo(titulo){
  if(titulo == ""){
    return false;
  }else{
    return true;
  }
}

export function verificarDescripcion(descripcion){
  if(descripcion == ""){
    return "n/a";
  }else{
    return descripcion;
  }
}

export function validarCategoria(categoria){
  if(categoria === ""){
    return false;
  }
  else{
    return buscarCategoria(categoria);
  }
}

export function buscarCategoria(categoria){
  var encontrado = false;
  for(var i = 0; i < listaCategorias.length; i++){
    if(listaCategorias[i] === categoria){
      encontrado = true;
    }
  }
  return encontrado;
}

export function validarFechaLimite(fecha){
  if( fecha < esHoy()){
    if(fecha == ""){
      return "Ilimitado";
    }
    return "No se pudo crear la tarea, FECHA INVALIDA.";
  }else{
    return fecha;
  }
}

export function validarFecha(fecha){
  if( fecha < esHoy()){
    if(fecha == ""){
      return "Ilimitado";
    }
    return false;
  }else{
    return fecha;
  }
}

export function validarEtiqueta(etiqueta){
  if(etiqueta == ""){
    return false;
  }else{
    return true;
  }
}

//-------------FECHA LIMITE ------------
export function crearFechaLimite(fechaLimite){
  return validarFechaLimite(fechaLimite);
}



export function revisarFechasLimites(){
  var tareas = 0;
  for(var i = 0; i < listaTareasPendientes.length; i++){
    if(listaTareasPendientes[i].fechaLimite == esMañana()){
      tareas++;
    }else{
      if(listaTareasPendientes[i].fechaLimite == esHoy()){
        tareas++;
      }
    }
  }
  return tareas;
}


//-------------CATEGORIA ------------
export function crearCategoria(categoria){
  listaCategorias.push(categoria);
  return listaCategorias.includes(categoria);
}

export function crearListaDeCategorias(){
  listaCategorias.push('trabajo','personal','familia','otros');
  return listaCategorias;
}



//-------------DESCRIPCION ------------
export function crearDescripcion(descripcion){
  if(descripcion == ""){
    return "No Descripcionado";
  }
  return descripcion;
}


//-------------ETIQUETA ------------

export function crearNuevaEtiqueta(etiqueta){
  listaEtiquetas.push(etiqueta);
  return listaEtiquetas.includes(etiqueta);
}

export function crearEtiqueta(etiqueta){
  if(etiqueta == ""){
    return "No Etiquetado";
  }else{
    crearNuevaEtiqueta(etiqueta);
  }
  return etiqueta;
}


//-----------------------------------------------------------------
//------------------------------GET LISTAS-----------------------


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
    let re = new RegExp(etiquetas, "g");
    // if(listaTareasPendientes[i].etiquetas.match(re)){
    let listaEtiquetas = listaTareasPendientes[i].etiquetas;    
    for(let j = 0; j< etiquetas.length; j++){
      if(listaEtiquetas.includes(etiquetas[j])){
        encontrado.push(listaTareasPendientes[i]);
      }
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
  id++;
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

//-----------------------------------------------------------------
//------------------------------PROCESO COMPLETAR TAREA-----------------------



export function borrarTareaListaPendientes(indexTarea){
  listaTareasPendientes.splice(indexTarea, 1);
}

export function obtenerIndexABorrar(tarea){
  let index = listaTareasPendientes.indexOf(tarea);
  return index;
}

export function completarTarea(tarea){
  cambiarEstadoATareaCompletada(tarea);
  let index = obtenerIndexABorrar(tarea);
  borrarTareaListaPendientes(index, index + 1);
  agregarTareaCompletadaALista(tarea);
}

export function buscarTareaPorID(id){
  for(var i = 0; i < listaTareasPendientes.length ;i++){
    if(listaTareasPendientes[i].id === id){
      return i;
    }
  }
  return -1;
}

export function cambiarEstadoATareaCompletada(tarea){
  if(tarea != undefined){
    tarea.completada = true;
    return tarea;
  }
  return true;
}

export function completarTareaPendiente(id){
  let indexTarea = buscarTareaPorID(id);
  let confirmado = false;

    if(indexTarea >= 0){
    cambiarEstadoATareaCompletada(listaTareasPendientes[indexTarea]);
    agregarTareaCompletadaALista(listaTareasPendientes[indexTarea]);
    borrarTareaListaPendientes(indexTarea);
    confirmado = true;
  }
  return confirmado;
}