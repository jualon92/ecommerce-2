//import model from "../model/productos-mem.js"
//import model from "../model/productos-file.js"
/*
import ProductoModelFile from "../model/productos-file.js"
import ProductoModelMem from "../model/productos-mem.js"
import ProductoModelMongoDB from "../model/productos-mongodb.js"
*/
import CarritoModel from "../model/carrito.js"
import config from '../config.js'

//const model = new ProductoModelMongoDB()
//const model = new ProductoModelMem()
//const model = new ProductoModelFile()

const model = CarritoModel.get(config.TIPO_DE_PERSISTENCIA)
 

/* Api Guardar */
const guardarCarrito = async carrito => {
    let carritoCreado = await model.createCarrito(carrito)
    return carritoCreado
}

//exports
export default { 
    guardarCarrito
}