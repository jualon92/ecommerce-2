import api from "../api/productos.js"

/* Controller GET */
const getProductos = async (req,res) => {
    let id = req.params.id
    
    if(id) {
        let producto = await api.obtenerProducto(id)
        res.json(producto)
    }
    else {
        let productos = await api.obtenerProductos()
        res.json(productos)
    }
}

/* Controller POST */
const postProducto = async (req,res) => {
    let producto = req.body
    //agregar 
     
    let productoAgregado = await api.guardarProducto(producto)
    
    console.log("largo " + Object.keys(productoAgregado).length)
    if (!Object.keys(productoAgregado).length == 0){
        res.json(productoAgregado)
    }else{
        console.log("no molestar al servidor con basura!")
    }
     
     
}

/* Controller PUT */
const putProducto = async (req,res) => {
    let id = req.params.id
    let producto = req.body
    //actualizar
    let productoActualizado = await api.actualizarProducto(id,producto)
/*
    if (!Object.keys(productoActualizado).length == 0){
        
        res.json(productoActualizado)
    }else{
        console.log("no molestar al servidor")
    }*/

    res.json(productoActualizado)
}

/* Controller DELETE */
const deleteProducto = async (req,res) => {
    let id = req.params.id
    //borrar
    let productoBorrado = await api.borrarProducto(id)

    res.json(productoBorrado)
}

//exports
export default {
    getProductos, // es igual a -> getProductos : getProductos,
    postProducto,
    putProducto,
    deleteProducto
}