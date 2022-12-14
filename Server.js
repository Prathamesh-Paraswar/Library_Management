const express = require('express');
const app = new express();
const mongo = require('mongoose')

// Env File
require('dotenv').config();

//for cors error
const cors = require('cors')
app.use(cors());

const cookieParser = require('cookie-parser')
app.use(cookieParser());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Body Parser for requesting body
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(express.json())

// MongoDb Connection
mongo.connect(process.env.mongo_conn,{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('DataBase is Connected')
})
.catch(err=>{
    console.log(err)
})



app.get("/",(req,res)=>{
    res.send("Welcome to Backend");
})

app.use('/User',require('./Routes/User'))
app.use('/Book',require("./Routes/Book"))
app.use("/Reserve",require('./Routes/Reservation'));
app.use("/Borrow",require('./Routes/Borrowing'))

// if (process.env.NODE_ENV === ‘production’ || process.env.NODE_ENV === ‘staging’) {
//     app.use(express.static(‘client/build’));
//     app.get(‘*’, (req, res) => {
//     res.sendFile(path.join(__dirname + ‘/client/build/index.html’));
//     });
//    }
// // app.use('/Static',require('./Routes/Static'))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(process.env.PORT || 7000,()=>{
    console.log(`Running on port 7000`);
})

