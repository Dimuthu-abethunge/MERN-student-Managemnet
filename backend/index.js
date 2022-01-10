const express = require("express");
const app =  express();
const cors = require("cors");
  
app.use(express.json());
app.use(cors());

//register and login
app.use("/basic", require("./routes/basic"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/student", require("./routes/student"));

app.listen(5000, () => { 
    console.log("server is running on port 5000");
});