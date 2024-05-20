require("dotenv").config();
const express =require ('express')

const userRoutes =require('./routes/user')
const authRoutes =require('./routes/auth')

const app =express();
const cors =require("cors");
const connection =require("./db")

// connection database
connection();

// midllewares
app.use(express.json())
app.use(cors())
// routers
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`listening on the port :${port}`))
