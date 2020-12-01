// required node modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const readline = require("readline");

// global variables
const file = "results.json";
const email = "email.json";
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
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
	// write to json file and send conformation email
	writeFile(req);
	sendEmail(req);

	// tell the user the form signup was succesful
	res.end("Signup succesful!");
})

// begin listening on startup
app.listen(3000, function()
{
	// output that the server is running
	console.log("Server is online and listening!");

	// check to see if results.json and email.json exist
	checkResults();
});

function mailLogin()
{
	// create email config object
	var mailConfig =
	{
		service: "gmail",
		auth: {user: undefined, pass: undefined}
	};

	// create line reader
	const emailInput = readline.createInterface({input: process.stdin, output: process.stdout});

	// ask for gmail address and password
	emailInput.question("Enter gmail address: ", function (user)
	{
		emailInput.question("Enter gmail app password: ", function (pass)
		{
			// write gmail address and password
			mailConfig.auth.user = user;
			mailConfig.auth.pass = pass;

			// close line reader
			emailInput.close();

			// create json file
			fs.writeFile(email, JSON.stringify(mailConfig), "utf8", function (err)
			{
				// output an error if file write fails
				if (err) throw err;

				// output that new json was created
				console.log(email + " created!");
			});
		});
	});
}

function sendEmail(req)
{
    // setup nodemailer
    const mailConfig = JSON.parse(fs.readFileSync(email));
    const transporter = nodemailer.createTransport(mailConfig);

    // create conformation email
    const outputMail =
    {
        from: mailConfig.auth.user,
        to: req.body.Email,
        subject: "Signup success!",
        text: "Hey, " + req.body.Forename + " you did it!"
    }

    // send conformation email
    transporter.sendMail(outputMail, function(err, info)
    {
        // output error if send fails
        if (err) throw err;

        // email succesful
        console.log("Conformation email sent!");
    });
}

function writeFile(req)
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
        Birthday: req.body.Birthday,
        Comment: req.body.Comment,
        Gender: req.body.Gender,
        Ethnicity: req.body.Ethnicity,
        TestSlot: req.body.TestSlot
    };

    // generate the updated json file
    var results = JSON.parse(fs.readFileSync(file));
    results.data.push(response);

    // write the updated json file
    fs.writeFile(file, JSON.stringify({data: results.data}), "utf8", function (err)
    {
        // output an error if file write fails
        if (err) throw err;

        // output succesful
        console.log("The data to append was appended to file!");
    });
}

function checkEmail()
{

	// attempt to read email setup json file
	fs.access(email, fs.F_OK, function (err)
	{
		// if json file doesn't exist
		if (err) mailLogin();
	});
}

function checkResults()
{

	// attempt to read user info json file
	fs.access(file, fs.F_OK, function (err)
	{
		// if json file doesn't exist
		if (err)
		{
			// create json file
			fs.writeFile(file, JSON.stringify({data:[]}), "utf8", function (err)
			{
				// output an error if file write fails
				if (err) throw err;

				// output that new json was created
				console.log(file + " created!");
			});

			checkEmail();
		}
		
		else checkEmail();
	});
}
