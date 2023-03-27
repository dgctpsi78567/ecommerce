const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs=require("fs")
// const {readdirSync}=require("fs")
require("dotenv").config();

// app
const app = express();

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
}).then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection failed", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors())

//routes
fs.readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+ r)));

//connction
const port = process.env.SERVER_PORT || 8000;
app.listen({ port }, () => console.log(`Server run on the ${port}`));