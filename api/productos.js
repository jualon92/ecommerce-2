//import model from "../model/productos-mem.js"
//import model from "../model/productos-file.js"
/*
import ProductoModelFile from "../model/productos-file.js"
import ProductoModelMem from "../model/productos-mem.js"
import ProductoModelMongoDB from "../model/productos-mongodb.js"
*/
import ProductoModel from "../model/productos.js"
import config from '../config.js'
import ProductosValidation from "../model/validaciones/productos.js"

const model = ProductoModel.get(config.TIPO_DE_PERSISTENCIA)

const getProductoValidado = async (producto, modelo) => { 
    const errorValidacion = ProductosValidation.validar(producto)  
    if (!errorValidacion) { //buen candidato para funcion
        let productoCreado = await modelo
        return productoCreado
    } else { 
        console.log("error validacion" + errorValidacion.details[0].message)
        return {}
    }
}



/* Api Obtener ALL */
const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

/* Api Obtener ONE */
const obtenerProducto = async id => {
    let producto = await model.readProducto(id)
    return producto
}

/* Api Guardar */
const guardarProducto = async producto => { //antes de guardar producto chequear con validacion mediante joi
     
   // return getProductoValidado(producto, model.createProducto(producto))
   
     
    console.log(producto)
    const errorValidacion = ProductosValidation.validar(producto)  
    if (!errorValidacion) { //buen candidato para funcion
        let productoCreado = await model.createProducto(producto)
        return productoCreado
    } else {
        console.log("error")
        console.log(errorValidacion)
        return {}
    } 

}

/* Api Actualizar */
const actualizarProducto = async (id, producto) => {
  //  return getProductoValidado(producto, model.updateProducto(id, producto))
     
    const errorValidacion = ProductosValidation.validar(producto)
    if (!errorValidacion) { 
        let productoUpdate = await model.updateProducto(id, producto)
        return productoUpdate
    } else {
        console.log("error")
        console.log(errorValidacion)
        return {}
    }
      
}

/* Api Borrar */
const borrarProducto = async id => {
    let productoDelete = await model.deleteProducto(id)
    return productoDelete
}


//exports
export default {
    obtenerProductos,
    obtenerProducto,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}