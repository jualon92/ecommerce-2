import express from 'express'
import routerProductos from './router/productos.js'
import routerCarrito from './router/carrito.js'
import routerUpload from './router/upload.js'
import config from './config.js'
import Mongo_DB from './model/DB_mongo.js'
import compression from "compression"
//import ProductoModelMongoDB from './model/productos-mongodb.js'
//ProductoModelMongoDB.conectarDB()


Mongo_DB.conectarDB() 


const app = express()
app.use(compression());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)
app.use('/upload', routerUpload)

 
 
console.log("process.env.PORT", process.env.PORT)
console.log("process.env.TIPO", process.env.TIPO)
console.log("process.env.CNX", process.env.CNX)
///// levantar desde la linea de comandos


// ------- Server Listen --------
//const PORT = process.env.PORT || config.PORT //env port no estaba seteado entonces usaba config.port  string

const PORT = config.PORT  // config toma de package.json
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))
