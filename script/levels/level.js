// Template class for levels
var Level = function()
{
	// Initial ball speed
	this.ballSpeed = 3.5;
	// Seconds to increment ball speed
	this.secondsToIncrementBallSpeed = 15;
	// How much to increment ball speed
	this.incrementBallSpeed = 1;
	
	// Map for bricks. See setBricks for documentation
	this.bricksMap = "";
	this.bricksMap += "XXXXXXXXX";
	this.bricksMap += "-XXXXXXX-";
	this.bricksMap += "--XXXXX--";
	this.bricksMap += "---XXX---";
	this.bricksMap += "----X----";
	this.bricksMap += "---XXX---";
	this.bricksMap += "--XXXXX--";
	this.bricksMap += "-XXXXXXX-";
	this.bricksMap += "XXXXXXXXX";
};

// Sets a brick map for the level. The bricks map is a continuous string
// with 8x9 = 63 characters because each level has 8 columns and 9 rows of
// possible bricks.
//
// For each position, there are two possible values:
// X: A brick should be positioned here
// -: An empty space
Level.prototype.setBricksMap = function(bricksMap)
{
	if (!this.isBricksMapValid(bricks)) throw new Error("Brick map supplied is invalid: " + bricksMap);
	this.bricksMap = bricksMap;
};

// Determines if  bricksMap is a valid bricks map. Returns true if it is
Level.prototype.isBricksMapValid = function(bricksMap)
{
	if (bricksMap.length !== 69) return false
	var match = (bricksMap.match(/(X|0)*/));
	if (match.length === 0) return false;
	if (match[0].length !== bricksMap.length) return false;

	return true;
};

// Creates the bricks for the player to bust. We start at the upper left corner
// and then iterate through each line until we have all the bricks based on
// the bricks map specified. Returns an actors collection with the bricks.
Level.prototype.createBricks = function(game)
{
	// Starting position for bricks
	var xPos = 12.5;
	var yPos = 10;
	var colors = Brick.colors();

	var bricks = [];

	for (var y = 0; y < 10; y++)
	{
		var color = colors.pop();

		for(var x = 0; x < 10; x++)
		{
			// Get the parameter at the brick map
			var index = (y*9)+x;
			var code = this.bricksMap[index];

			var brick = new Brick(game, xPos, yPos, color);
			// Only add it if the map specifies so
			if (code === "X") bricks.push(brick);

			// Next brick in line
			xPos += (brick.width + 12.5);
		}

		// Next line
		xPos = 12.5;
		yPos += 30;
	}

	return bricks;
};

Level.prototype.getName = function()
{
	return "N/A";
};