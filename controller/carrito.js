import api from "../api/carrito.js"
import mercadopago from  "mercadopago"
 
/* Controller POST */
const postCarrito = async (req,res) => {
    let carrito = req.body
    //agregar
    let carritoAgregado = await api.guardarCarrito(carrito) //array de productos


    let arrItems = []
    for (let item of carritoAgregado){ // convertir formato mi carrito a formato mercadopago
        arrItems.push({
            title: item.nombre,
            unit_price: item.precio,
            quantity: parseInt(item.cantidad),
            
            auto_return: "approved",

        })
    }
        
 

    // Crea un objeto de preferencia
    let preference = {
        items:  arrItems,
        back_urls: {
			"success": "http://localhost:8080/api/carritos/feedback",
			"failure": "http://localhost:8080/api/carritos/feedback",
			"pending": "http://localhost:8080/api/carritos/feedback"
		},
		auto_return: "approved",
    };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
        
   
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      res.json({id : response.body.id, arrItems})
    })
    .catch(function (error) {
      console.log(error);
    });
  

 
}

//exports
export default {
    postCarrito
}