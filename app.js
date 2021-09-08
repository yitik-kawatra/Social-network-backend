const express=require('express');

const app=express();

const dotenv=require('dotenv');
const mongoose=require('mongoose');
const expressValidator=require('express-validator')

dotenv.config();


app.use(express.json())
app.use(expressValidator())
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connection sucessful')
    }).catch((err)=>{
    console.log('no connection', err)
    })
app.use(require('./routes/post'));
app.use(require('./routes/auth'));


const PORT=3000;

app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`);
});