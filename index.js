// required node modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const fs = require("fs");
const bcrypt = require("bcrypt");

// global variables
const file = "results.json";
const salt = 10;

// setup file reciving
app.use(express.static("public"));

app.get("/index.html", function(req, res)
{
	res.sendFile(_dirname + "/index.html");
});

// on form submit
app.post("/getstring", urlencodedParser, function(req, res)
{
	// generate response object
	const response = 
	{
		Forename: req.body.Forename,
		Surname: req.body.Surname,
		Email: req.body.Email,
		Phone: req.body.Phone,
		HouseNumber: req.body.HouseNumber,
		Postcode: req.body.Postcode,
		Username: req.body.Username,
		Password: bcrypt.hashSync(req.body.Password, salt),
		Age: req.body.Age,
		Comment: req.body.Comment,
		Gender: req.body.Gender,
		Ethnicity: req.body.Ethnicity,
		TestSlot: req.body.TestSlot
	};

	// generate the updated json file
	const results = JSON.parse(fs.readFileSync(file));
	results.data.push(response);
	const output = "{\"data\":" + JSON.stringify(results.data) + "}";

	// write the updated json file
	fs.writeFile(file, output, "utf8", function (err)
	{
		// output an error if file write fails
		if (err) throw err;
		
		// output succesful
		console.log("The data to append was appended to file!");
	});

	// tell the user the form signup was succesful
	res.end("Signup succesful!");
})

// begin listening on startup
app.listen(3000, function()
{
	// output that the server is running
	console.log("Server is online and listening!");

	// attempt to read json file
	fs.access(file, fs.F_OK, function (err)
	{
		// if json file doesn't exist
		if (err)
		{
			// create json file
			fs.writeFile("results.json", "{\"data\":[]}", "utf8", function (err)
			{
				// output an error if file write fails
				if (err) throw err;

				// output that new json was created
				console.log(file + " created!");
			});
		}
	});
});

