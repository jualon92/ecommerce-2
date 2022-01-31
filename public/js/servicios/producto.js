class ProductoService { //comunicarse con api
    URL_PRODUCTOS =  '/api/productos/'//'https://5c8ef17a3e557700145e85c7.mockapi.io/productos/'

    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS)
        //console.log(productos)
        return productos
    }

    async guardarProductoService(producto) {
        
        let productoGuardado = await http.post(this.URL_PRODUCTOS, producto) // al server
        console.log("produ guardado api " +  productoGuardado)
        return productoGuardado
    }

    async actualizarProductoService(id,producto) {
        console.log("actualizando")
        console.log(id,producto)
        console.log(this.URL_PRODUCTOS)
        let productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        console.log(productoActualizado)
        return productoActualizado
    }

    async borrarProductoService(id) {
        console.log("borrando")
        console.log(this.URL_PRODUCTOS)
        console.log(id) 
        let productoBorrado = await http.del(this.URL_PRODUCTOS, id)
         console.log("borrado res " + productoBorrado)
        return productoBorrado
    }
}

const productoService = new ProductoService() //global, rever