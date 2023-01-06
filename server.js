var express = require("express");
const res = require("express/lib/response");
var app = express()
// var cors = require("cors")​

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extends: false}));
// app.use(cors())

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
      res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
})

//mongodb Connection

const MongoClient = require('mongodb').MongoClient;

//add database connection

const uri = 'mongodb+srv://jaskirat:test@cluster0.izgkowd.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})

//install collection
const insertProjects = (profile,callback) => {
    projectCollection.insert(profile,callback);
}

// get project...
const getProjects = (callback) => {
        projectCollection.find({}).toArray(callback);
    }
    

const createConnection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err) {
            console.log('MongoDB Connected')
        } else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}
    

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        } else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})
app.post('/api/projects',(req,res) => {
        console.log("New Project added", req.body)
        var newProject = req.body;
        insertProjects(newProject,(err,result) => {
            if(err) {
                res.json({statusCode: 400, message: err})
            }
            else {
               res.json({statusCode: 200, message:"Project Successfully added", data: result})
            }
        })
    })

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: http://localhost: "+port)
    createConnection('AGH Studio')
}
)
