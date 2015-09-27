// The game class holds the game itself and coordinates
// the game loop. Requires a canvas to draw the game.
//
// Instance variables:
//
// canvas: holds the canvas for drawing
// pad: our hero!
// actors: a collection that holds all characters in the game (i.e. things that can collision with each other)
var Game = function(canvas)
{
	this.canvas = canvas;
	this.pad = new Pad();
	this.ball = new Ball();

	this.actors = [];
	this.actors.push(this.pad);
	this.actors.push(this.ball);
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

	game.pad.draw(context);

	var ball = game.ball;
	if (ball.isAtScreenEdgeX(game)) ball.speedX = -ball.speedX;
	if (ball.isAtScreenEdgeY(game)) ball.speedY = -ball.speedY;
	
	// Check for collisions
	var collisions = ball.collisions(game);
	if (collisions.length > 0)
	{
		var collision = collisions[0];
		if (collision.x) ball.speedX = -ball.speedX;
		if (collision.y) ball.speedY = -ball.speedY;
	}

	game.ball.move();
	game.ball.draw(context);

	/*
	// Draw an indestructible triangle brick that blocks the ball	
	context.beginPath();
	context.moveTo(600, 400);
	context.lineTo(700, 350);
	context.lineTo(700, 400);
	context.closePath();
	context.stroke();
	*/

	// Score
	context.font = "12pt Arial";
	context.fillStyle = "green";
	context.fillText("Score: 0", 10, 590);
}