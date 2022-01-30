class CarritoService {
    URL_CARRITO = 'api/carritos/'//'https://5c8ef17a3e557700145e85c7.mockapi.io/carrito/'

    async guardarCarritoService(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()
