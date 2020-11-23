var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static("public"));

app.get("/index.html", function(req, res)
{
    res.sendFile(_dirname + "/" + "index.html");
})

app.post("/getstring", urlencodedParser, function(req, res)
{
    response = {string : req.body.string};
    console.log(response);
    res.end(JSON.stringify(response));
})

app.listen(3000, function() {console.log("listening")});

