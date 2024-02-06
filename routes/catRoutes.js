//Routes: takes the urls generated in the front end like "delete button", then tells it: send it to the controller that handles delete

const express = require('express')
const catController = require('../controllers/catController')
const { get } = require('mongoose')
const router = express.Router()

//any path we declare on the frontend(view) we have to have a route to handle it ---all CRUD
router
    .route('/') //read operation
    .get(catController.getAllCats)

router
    .route('/upload') //create operation
    .get(catController.uploadPage)
    .post(catController.upload.single('image'), catController.createCat)

router
    .route('/edit/:id') //update operation
    .get(catController.editPage)
    .post(catController.updateCat)

router
    .route('/delete/:id') //delete operation
    .post(catController.deleteCat)

//export so we can use in our server.js
module.exports = router