# ecommerce-2

 


## Objetivo
Pagina inspirada en comercio de electronica. 

Conceptos que se busco aplicar:
- Single Page Application 
- diseño responsive 
- con carrito y procesamiento de pago, y permanencia de las cartas en backend mongoDB.
-  la posibilidad de generar nuevas cartas de productos 
-  que se utilize validacion de input tanto desde el front como el back.
-  diseño Modelo-Vista-Controlador




## Herramientas utilizadas
- HTML/ Handlebars (plantillas cartas o tablas)
- BEM / CSS / SASS 7 en 1  (mantener css organizado)
- JS vanilla
- Concepto MVC
- Node
- Express
- MongoDB, mongoAtlas (productos de carrito, informacion de cartas de producto)
- joi para validacion en alta de producto 
- dotenv para configuracion de env

 
## Inicio
 - Busqueda filtra cartas que contengan palabra clave mediante filter
 - back devuelve objetos a renderizar, el objeto es desglozado y handlebars se encarga de generar html de la carta con sus atributos
 
 
 
### Carrito con contador
 - al presionar agregar a carrito se agrega 1 a la cantidad de productos en el carrito
 - posibilidad de añadir mas de una compra a la vez mediante botones - y + en cada carta. Si quiero comprar 10 cables, no tengo que presionar 10 veces el boton
 
 - Agregar al carrito mas que el stock disponible no aumenta la cantidad en carrito
 - el carrito conoce la cantidad que lleva consigo,  le pasa la cuenta al  html cada vez que se agrega o borra un producto
 - enviar lleva a mercadopago
 
 
### Mercadopago
 - se utiliza checkout pro
 - carrito informa los productos que lleva, se calculan estadisticas y se dibujan en front
 
 
## Alta
 - Agrega objetos producto a mongodb. Boton Enviar esta gris hasta que pase la validacion JS regex.  
 -  Adicionalmente, se valida mediante joi.  Se declara schema de mongoose para evitar que de alguna manera llegue basura al backend
 - Los productos son dibujados en inicio al pasar validacion
 - Actualizar permite setear el producto en mongodb, utiliza validacion JS y joi. Actualizar queda en gris si no pasa validacion.
 
 
 

