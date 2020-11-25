var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require("fs");

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

	// output the response object to the console
	console.log(response);

	fs.appendFile("results.json", JSON.stringify(response), function (err)
	{
		if (err) throw err;
		console.log('The "data to append" was appended to file!');
	});

	// tell the user if the form signup was succesful or unsuccesful
	//res.status(404).send("signup failed (404)");
	//res.status(500).send("signup failed (500)");
	res.end("signup succesful!");
})

app.listen(3000, function()
{
	console.log("server is online and listening!");
});

