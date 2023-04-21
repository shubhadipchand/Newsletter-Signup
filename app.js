const express = require("express");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
var f1 = req.body.fName;
var l1 = req.body.lName;
var e1 = req.body.eName;

var data={
  members: [
    {
      email_address: e1,
      status: "subscribed",
      merge_fields: {
        FNAME: f1,
        LNAME: l1
      }
    }
  ]

};
const url= 'https://us13.api.mailchimp.com/3.0/lists/7e9ee0ca66';
const options = {
  method: "post",
  auth: "sdip:538fdf75da65b77d270e7cf99cb6af2b-us13"
}


const jsonData = JSON.stringify(data);
const request = https.request(url, options, function(response) {

if (res.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
} else {
    res.sendFile(__dirname + "/failure.html");
}



response.on("data", function(data) {
  console.log(JSON.parse(data));
});


});

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 2000, function() {
  console.log("Server is running on port 2000")
});


// API key
// 538fdf75da65b77d270e7cf99cb6af2b-us13

// List Id
// 7e9ee0ca66