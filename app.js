const express=require('express');

const app=express();
const fs = require('fs');
const cors=require('cors');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const expressValidator=require('express-validator')

dotenv.config();

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(expressValidator())
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connection sucessful')
    }).catch((err)=>{
    console.log('no connection', err)
    })

app.use(require('./routes/post'));
app.use(require('./routes/auth'));
app.use(require('./routes/user'));
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Please login');
    }
  });

  app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

const PORT=process.env.PORT||5500

app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`);
});