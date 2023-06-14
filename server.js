const express = require('express');
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModels')



//midddleware so that application can understand json
app.use(express.json())

//routes
app.get('/',(req,res)=> {

    res.send("Hello NODE API")
})

app.get('/blog',(req,res)=> {

    res.send("Hello , blog my name is Matata")
})

// fetch one item by id

app.get('/products/:id',async(req,res) => {
    try {
    const {id}= req.params // deconstructing id from request parameter
    const products = await Product.findById(id); //await waits to fetch from database
    res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})
//update product 
app.put('/products/:id',async(req,res) => {
    try {
    const {id}= req.params 
    const product = await Product.findByIdAndUpdate(id,req.body);

    //we cannot find product in database
    if(!product){
        return res.status(404).json({mesage : `cannot find any product with ID ${id}`})
    }
    const updatedProduct = await Product.findById(id); //get latest updated info
    res.status(200).json(updatedProduct )
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})
//delete priduct from database
app.delete('/products/:id',async(req,res) => {
    try {
    const {id}= req.params 
    const product = await Product.findByIdAndDelete(id); 
    if(!product){
        return res.status(404).json({mesage : `cannot find any product with ID ${id}`})
    
    } res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})





// fetch all the products from the database
app.get('/products', async(req,res) => {
    try{
    const products = await Product.find({}); //await waits to fetch from database
    res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})

//routr for saving data
app.post('/products',async(req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);//save to database
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }

})

//this also works 
//app.post('/product',(req,res) => {

    //     const product = new Product({
    //         name:req.body.name,
    //         quantity: req.body.quantity,
    //         price: req.body.price
    //     });
    
    //     product.save()
       
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(err => {
    //         res.json({mesage : err})
    //     })
        
    // })



mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:adipieces@nodeapi.dnauh0c.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() =>{
    app.listen(3000,() => {
        console.log("Node api is running on port 3000")
    })
    console.log("Connected to MongoDB sucessfully");
}).catch((error) => {
    console.log(error)
})