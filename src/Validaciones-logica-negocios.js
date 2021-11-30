import * as listas from './Listas-logica-negocios.js';
import * as gestor from './Tarea-logica-negocios.js';

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
    for(var i = 0; i < listas.getListaCategorias().length; i++){
      if(listas.getListaCategorias()[i] === categoria){
        encontrado = true;
      }
    }
    return encontrado;
  }
  
  export function validarFechaLimite(fecha){
    if( fecha < gestor.esHoy()){
      if(fecha == ""){
        return "Ilimitado";
      }
      return "No se pudo crear la tarea, FECHA INVALIDA.";
    }else{
      return fecha;
    }
  }
  
  export function validarFecha(fecha){
    if( fecha < gestor.esHoy()){
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