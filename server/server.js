import express from "express"
import dotenv from "dotenv";
import colors from "colors";
import dbconnection from "./database/dbconnection.js";
import morgan from "morgan";
import authrouter from "./routes/authRoutes.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"


dotenv.config();

//database connection
dbconnection();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)


const port = process.env.PORT || 8070;
app.get("/", (req, res)=>{
    res.send("welcome to ecommerce site");
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}` .bgBlue.white);
})