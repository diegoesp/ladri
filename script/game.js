// The game class holds the game itself and coordinates
// the game loop. Requires a canvas to draw the game.
//
// Instance variables:
//
// canvas: holds the canvas for drawing
// pad: our hero!
// ball: well... the ball
// score: score for the game
// actors: a collection that holds all characters in the game (i.e. things that can collision with each other)
var Game = function(canvas)
{
	this.canvas = canvas;
	this.pad = new Pad();
	this.ball = new Ball();
	this.score = 0;

	this.actors = [];
	this.actors.push(this.pad);
	this.actors.push(this.ball);

	// Create bricks for the player to bust. We start at the upper left corner
	// and then iterate through each line until we have all the bricks
	var x = 12.5;
	var y = 10;
	var colors = Brick.colors();

	for(var i = 0; i < 8; i++)
	{
		var color = colors.pop();

		for (var j = 0; j < 9; j++)
		{
			var brick = new Brick(x, y, color);
			this.actors.push(brick);

			// Next brick in line
			x += (brick.width + 12.5);
		}

		// Next line
		x = 12.5;
		y += 30;
	}

}

// Starts the game loop
Game.prototype.startLoop = function()
{
	this.loop = window.setInterval(this.draw, 15, this);
	this.canvas.parentNode.addEventListener("keydown", this, true);
}

Game.prototype.stopLoop = function()
{
	window.clearInterval(this.loop);
}

Game.prototype.width = function()
{
	return this.canvas.width;
}

Game.prototype.height = function()
{
	return this.canvas.height;
}

// Event handler for the game object. Redirects to the correspondent event
// handler type
Game.prototype.handleEvent = function(event)
{
	switch(event.type)
	{
		case "keydown":
		{
			this.pad.handleKeyboard(event, this);
			break;
		}
	}
}

// Draws a game frame
Game.prototype.draw = function(game)
{
	var context = game.canvas.getContext("2d");

	// Empty the canvas
	context.clearRect(0, 0, game.width(), game.height());

	var ball = game.ball;
	if (ball.isAtScreenEdgeX(game)) ball.speedX = -ball.speedX;
	if (ball.isAtScreenEdgeY(game)) ball.speedY = -ball.speedY;
	game.ball.move();

	// Check for collisions
	var collisions = ball.collisions(game);
	if (collisions.length > 0)
	{
		var collision = collisions[0];
		if (collision.x) ball.speedX = -ball.speedX;
		if (collision.y) ball.speedY = -ball.speedY;
	}

	// Review if a collision to a brick happened. If that is the case
	// we have to take a brick out and add a score
	for(var i = 0; i < collisions.length; i++)
	{
		var collision = collisions[i];
		var actor = collision.actor;
		if (actor instanceof Brick)
		{
			var index = game.actors.indexOf(actor);
			if (index < 0)
			{
				console.log("Error!: busted brick could not be found as an actor");
			}
			else
			{
				game.actors.splice(index, 1);
				game.score += 100;
			}
		}
	}

	// Draw the actors
	var actors = game.actors;
	for(var i = 0; i < actors.length; i++) actors[i].draw(context);

	// Draw the score
	context.font = "12pt Arial";
	context.fillStyle = "green";
	context.fillText("Score: " + game.score, 10, 590);

	/*
	// Draw an indestructible triangle brick that blocks the ball	
	context.beginPath();
	context.moveTo(600, 400);
	context.lineTo(700, 350);
	context.lineTo(700, 400);
	context.closePath();
	context.stroke();
	*/
}