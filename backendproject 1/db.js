const mongoose = require ('mongoose');


const connection= ()=>{
    try{
      mongoose.connect(process.env.DB_URI);
      console.log("connected to database sucessfully")

    }catch(error){
        console.log(error);
        console.log("could not connected to database")
    }
}
module.exports= connection;