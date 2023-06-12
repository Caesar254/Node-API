const express = require('express');
const app = express()

//routes
app.get('/',(res,req)=> {

    res.send("Hello NODE API")
})

app.listen(3000,() => {
    console.log("Node api is running on port 3000")
})