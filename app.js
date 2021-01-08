const express=require("express");
const app=express();
const path=require("path");
const cors=require("cors");


app.use(express.static("public"));
app.use(express.json());
const connectDB=require("./config/db.js");
connectDB();


// cors
const corsOptions ={
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions));
//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes

app.use("/api/files",require("./routes/files.js"));
app.use("/files",require("./routes/show.js"));
app.use("/files/download",require("./routes/download.js"));

app.listen(process.env.PORT||3000,function () {
    console.log("The server has been started");
});