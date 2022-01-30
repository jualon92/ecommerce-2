//recibir archivos enviados por el frontend

import express from 'express' 
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({ //storage
    destination: function(req,file,cb){
        cb(null, "public/uploads") //donde guarda
    },
    filename: function(req,file,cb){ //time stamp - nombre archivo
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage: storage})
 
/* Router POST */
router.post('/', upload.single("foto"), (req,res,next) => {
    const file = req.file
    if (!file){ // error file falsy
        const error = new Error("error subiendo archi")
        error.httpStatusCode = 400
        next(error) //continuar proceso normal del servidor, no colgar
    }

    res.json({nombre : file.filename}) // storage.filename
})

// router.post('/', (req,res) =>{
//     console.log(req.body)
//     res.json({status:"ok"})
// })
 

//exports
export default router