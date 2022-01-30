import mongoose from 'mongoose'
import config from '../config.js'

class Mongo_DB { //conexion base de datos por fuera de todo
    static conexionOk = false
    static pk = '_id'
     
    static genIdKey(obj) { // toma objeto con _id, devuelve objeto con id
        if (Array.isArray(obj)) { //si obj es array
            for (let i=0; i <obj.length; i++) {
                obj[i].id = obj[i][Mongo_DB.pk]
            }
        } else { //si no es array
            obj.id = obj[Mongo_DB.pk] // _id:2323 => 2323
        }
        return obj
    } 
    
    static async conectarDB() {

        try {
            if (!Mongo_DB.conexionOk) { //no conectar dos veces
                await mongoose.connect(config.STR_CNX, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log('Base de datos conectada!')
                Mongo_DB.conexionOk = true
            }

        }
        catch (error) {
            console.log(`MongoDB error en conectar: ${error.message}`)
        }
    }
}


export default Mongo_DB