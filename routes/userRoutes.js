const express = require("express") ;
var router =  express.Router();

router.get("/",(request,response)=>{
    response.send("User router succesfull")
})

module.exports = router;