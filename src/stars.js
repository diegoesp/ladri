var Stars = function(game)
{
	this.game = game;

	var width = game.canvas.width;
	var height = game.canvas.height;

	var stars = [];

	// I distribute my stars using "quadrants" so I ensure there are stars
	// through all the screen, but I try to randomize their exactly location
	// so they're not completely uniform (looks much nicer)
	var DENSITY = 85;

	for (var i = 0; i < width; i += DENSITY)
	{
		for (var j = 0; j < height; j += DENSITY)
		{
			var x = Math.randomBetween(i, i + DENSITY);
			var y = Math.randomBetween(j, j + DENSITY);
			var radius = Math.randomBetween(1, 2);

			stars.push({ x: x, y: y, radius: radius });
		}
	}

	this.stars = stars;
	this.speed = { x: 0.5, y: 0 };
};

// Sets the speed of starts receiving a hash = { X: num , Y: num }
Stars.prototype.setSpeed = function(speed)
{
	this.speed = speed;
};

// Draws a nice stars background
Stars.prototype.draw = function()
{
	var context = this.game.context();
	
	context.fillStyle = "white";

	for(var i = 0; i < this.stars.length; i++)
	{
		var star = this.stars[i];

		var initialAngle = 0;
		var finalAngle = Math.PI * 2;
		var antiClockwise = true;

		context.beginPath();
		context.arc(star.x, star.y, star.radius, initialAngle, finalAngle, antiClockwise);
		context.closePath();
		context.fill();

		// Now move the star on x and y...
		star.x += this.speed.x;
		star.y += this.speed.y;
		// ... and reset it if it reached the end of the screen
		if (star.x > this.game.width()) star.x = -2;
		if (star.y > this.game.height()) star.y = -2;
	}
};
