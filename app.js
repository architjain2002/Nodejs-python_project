const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const server = http.createServer(app);
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const { find } = require('async');

const url = 'mongodb://localhost:27017';

const spawn = require('child_process').spawn;
const process = spawn('python',['./test.py']);
// process.stdout.on('data', data =>{
//     console.log(data.toString());
// })

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbname);
//     const collection = db.collection('testing');
//     // the following code examples can be pasted here...
//     // const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
//     // collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
//     obj = await collection.find({}).toArray()
//     str = JSON.stringify(obj)
//     console.log(str);
//     return str;
// }

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
   
//     var myobj = { name: "Company Inc", address: "Highway 37" };

//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//     });

//     dbo.collection("customers").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         x = result;
//         console.log(result);
//         db.close()
//     });
// })
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use( express.static( "public" ) );

var dbo;

app.get('/',(req,res)=>{
    dbo.collection("customers").find({}).toArray(function(err, result) {
        if (err) throw err
        res.render('home',{
            infolist : result
        })
    });
})

const hostname = "127.0.0.1";
const port = "80";


server.listen(port,hostname,()=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        dbo = db.db("mydb"); // dbo is taken outside(global)
       
        // var myobj = { name: "Company Inc", address: "Highway 37" };
    
        // dbo.collection("customers").insertOne(myobj, function(err, res) {
        //     if (err) throw err;
        //     console.log("1 document inserted");
        // });
    
        // dbo.collection("customers").find({}).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        // });
    })
    console.log(`Server running at http://${hostname}:${port}`);
});


