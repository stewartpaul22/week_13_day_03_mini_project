const express = require("express");
const server = express();
const path = require("path");
const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if (err) {
    console.log(err);
    return;
  }

  const db = client.db("bucket_list_db");

  console.log("Connected to db");

  server.post("/api/bucket_list", function(req, res) {
    const bucketListCollection = db.collection("countries");
    const countryToSave = req.body;
    bucketListCollection.save(countryToSave, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log("Saved country to your bucket List!");
      res.status(201);
      res.json(countryToSave);
    });
  });

  server.get("/api/bucket_list", function(req, res){
    const bucketListCollection = db.collection("countries");
    bucketListCollection.find().toArray(function(err, allCountries){
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allCountries);
    });
  });


  server.listen(3000, function(){
    console.log("Listening for requests on port 3000");
  });
});
