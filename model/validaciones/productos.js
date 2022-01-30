import Joi from "joi"; //similar a mongo validacion pero de lado del s ervicio

class ProductosValidation{
    static validar(producto){ //genera schema y valida
        const productosSchema = Joi.object({ //ini 
            nombre: Joi.string().min(3).max(20).required(),
            precio: Joi.number().required(),
            stock:Joi.number().required(),
            marca:  Joi.string().required(),
            categoria:  Joi.string().required(),
            foto: Joi.string().required(),
            detalles: Joi.string().required(),
            envio:Joi.boolean().required()
        })
        
         
      //  const  error   = productosSchema.validate(producto).error

      //destructuring object => extra valor de clave y almacena en variable
        const { error } = productosSchema.validate(producto)  
        
        

        return error

    }


}

export default ProductosValidation