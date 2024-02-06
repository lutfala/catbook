//controllers are the brain of our application, like talking with our database. Structure and collection to use

const Cat = require('../models/catModel')
const multer = require('multer')

//multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

//whenever you are talking with the database use async req,res

const getAllCats = async(req,res) => {
    try {
        const cats = await Cat.find()
        res.render('home',{cats:cats})
    } catch(err) {
        console.log(err)
    }
}

const uploadPage = (req,res) => {
    res.render('upload')
}
//talk to database, external thing what do we use? async await
const createCat = async (req,res) => {
    try{
        const cat = new Cat({
            name: req.body.name,
            age: req.body.age,
            favoriteFood: req.body.favoriteFood,
            funFact: req.body.funFact,
            image: req.file.filename //multer places the file info in req.file

    })

   
    await cat.save()
    res.redirect('/')


    } catch(err){
        console.log(err)
    }
}

const editPage = async (req,res) => {
    try{
        const cat = await Cat.findById(req.params.id)
        res.render('edit', {cat:cat})
    } catch(err){
            console.log(err)
    }
        
}

const updateCat = async (req,res) => {
    try{
       await Cat.findByIdAndUpdate(req.params.id,req.body)
       res.redirect('/')
       
    } catch(err){
        console.log(err)
    }
        
}

const deleteCat = async (req,res) => {
    try{
       await Cat.findByIdAndRemove(req.params.id,req.body)
       res.redirect('/')
       
    } catch(err){
        console.log(err)
    }
        
}

//matching router with the controller
module.exports = {
    getAllCats,
    upload,
    uploadPage,
    createCat,
    editPage,
    updateCat,
    deleteCat
}
