const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const fs = require("fs");
const results = require("./results.json");

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

	// update the json file
	results.data.push(response);

	const output = "{\"data\": " + JSON.stringify(results.data) + "}";
	fs.writeFile("results.json", output, "utf8", function (err)
	{
		// output an error if file write fails
		if (err) throw err;
		
		// output succesful
		console.log("The data to append was appended to file!");
	});

	// tell the user the form signup was succesful
	res.end("signup succesful!");
})

app.listen(3000, function()
{
	console.log("server is online and listening!");
	console.log(results.data);
});

