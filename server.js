var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Connected"})
});



// list all books
app.get("/patients", (req, res, next) => {
    let sql = `SELECT Name FROM patient ORDER BY name`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single book by name
app.get("/patients/:name", (req, res, next) => {
    var sql = "select * from patient where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
    if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new book
app.post("/patient/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("Name for patient not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
    }
    var sql ='INSERT INTO patient (name) VALUES (?)'
    var params =[data.name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});