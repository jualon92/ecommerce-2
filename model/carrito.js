 
import CarritoModelMongoDB from "./carrito-mongodb.js";
 
class CarritoModel {
    static get(tipo) {
        switch(tipo) {

            case 'MONGODB': //persistencia por caso de uso
                console.log('**** PERSISTENCIA MONGODB carrito ****')
            //    CarritoModelMongoDB.conectarDB() //rever, mejor instancia superior, 1:33:47 68
                return new CarritoModelMongoDB()

            default:
                console.log('**** PERSISTENCIA DEFAULT carrito****')
                return new CarritoModelMem()
        }
    }
}


export default CarritoModel