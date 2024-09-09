const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "*"
}));
app.get('/', (req, res)=>{
    res.json({message:"cors issue resolved"});
})

const port = 8000;
app.listen(port, ()=>console.log(`server started on port ${port}`));