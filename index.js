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
	// generate response object
    response = 
	{
		Forename: req.body.Forename,
		Surname: req.body.Surname,
		Email: req.body.Email,
		Phone: req.body.Phone,
		HouseNumber: req.body.HouseNumber,
		Postcode: req.body.Postcode,
		Username: req.body.Username,
		Password: req.body.Password,
		Age: req.body.Age,
		Gender: req.body.Gender,
		Ethnicity: req.body.Ethnicity,
		Comments: req.body.Comments,
		TestSlot: req.body.TestSlot
	};

    console.log(response);
    res.end(JSON.stringify(response));
})

app.listen(3000, function()
{
	console.log("listening");
});

