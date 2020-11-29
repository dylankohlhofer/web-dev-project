// required node modules
const fs = require("fs");
const keypress = require("keypress");

// global variables
const file = "results.json";

// attempt to read json file
fs.access(file, fs.F_OK, function (err)
{
	// if json file doesn't exist
	if (err)
	{
		console.log(file + " does not exist!");
		process.exit(1);
	}

	init();
});

function init()
{
	// read the json file
	const results = JSON.parse(fs.readFileSync(file));

	// exit if the json file is empty
	if (!results.data.length)
	{
		console.log(file + " is empty!");
		process.exit(1);
	}

	display(results);
}

function display(results)
{
	// index of page number
	var index = 1;

	// print the first element in the json
	process.stdout.write(getPage(index, results));

	// start listening for keypresses
	keypress(process.stdin);
	 
	// on key press
	process.stdin.on("keypress", function (ch, key)
	{
		if (key && key.ctrl && key.name == "c")
		{
			console.log("");
			process.stdin.pause();
		}

		if (key.name == "right")
		{
			index = moveIndex(index, results, 1);
			writePage(index, results);
		}

		if (key.name == "left")
		{
			index = moveIndex(index, results, -1);
			writePage(index, results);
		}
	});

	// exit program
	process.stdin.setRawMode(true);
	process.stdin.resume();
}

function moveIndex(index, results, amt)
{
	// update index if in range
	if (!(index + amt > results.data.length || index + amt < 1))
	{
		index += amt;
	}

	return index;
}

function getPage(index, results)
{
	// generate page to display
	const page =  "<- page " + index + "/" + results.data.length + " ->";
	return JSON.stringify(results.data[index - 1], null, 4) + "\n\n" + page;
}

function writePage(index, results)
{
	process.stdout.moveCursor(0, -Object.keys(results.data[index - 1]).length - 3);
	process.stdout.cursorTo(0);
	process.stdout.clearScreenDown();
	process.stdout.write(getPage(index, results));
}
