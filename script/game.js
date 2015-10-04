// The game class holds the game itself and coordinates
// the game loop. Requires a canvas to draw the game.
//
// Instance variables:
//
// canvas: holds the canvas for drawing
// pad: our hero!
// ball: well... the ball
// keyboard: a Keyboard controller, so we know what is pressed inside the game loop
// mouse: a Mouse controller, so we can handle the pad with the mouse
// score: score for the game
// actors: a collection that holds all characters in the game (i.e. things that can collision with each other)
// lives: chances for the player
// timer: holds the setInterval timer for the game loop
var Game = function(canvas)
{
	this.canvas = canvas;
	this.pad = new Pad();
	this.ball = new Ball();
	this.keyboard = new Keyboard();
	this.mouse = new Mouse();
	this.score = 0;
	this.lives = 2;

	this.actors = [];
	this.actors.push(this.pad);
	this.actors.push(this.ball);

	// Hide the cursor inside the canvas.
	//canvas.style.cursor = "none";

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
};

// Starts the game loop
Game.prototype.startLoop = function()
{
	this.timer = window.setInterval(this.loop, 5, this);
	this.canvas.parentNode.addEventListener("keydown", this, true);
	this.canvas.parentNode.addEventListener("keyup", this, true);
	this.canvas.parentNode.addEventListener("mousemove", this, true);
};

// The game loop! good ol' times :D
Game.prototype.loop = function(game)
{
	// First we do all the cool math and processing to prepare us to draw
	// stuff on the screen

	// Move the pad
	game.pad.move(game);

	var ball = game.ball;

	// Check if the user lost a life?
	if (ball.isAtScreenBottom(game))
	{
		game.lives--;
		ball.reset();
	}

	// Check if the ball is touching screen edges
	if (ball.isAtScreenEdgeX(game)) ball.speedX = -ball.speedX;
	if (ball.isAtScreenEdgeY(game)) ball.speedY = -ball.speedY;
	ball.move();

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
		var actor = collisions[i].actor;
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

	// We finished calculations. Now we have to draw.
	game.draw(game);
};

Game.prototype.stopLoop = function()
{
	window.clearInterval(this.timer);
};

Game.prototype.width = function()
{
	return this.canvas.width;
};

Game.prototype.height = function()
{
	return this.canvas.height;
};

Game.prototype.handleEvent = function(event)
{
	// Fills the keyboard status object
	switch(event.type)
	{
		case "keydown":
		{
			this.keyboard.keyDown(event);
			break;
		}
		case "keyup":
		{
			this.keyboard.keyUp(event);
			break;
		}
		case "mousemove":
		{
			this.mouse.mouseMove(event);
		}
	}
};

// Draws a game frame
Game.prototype.draw = function(game)
{
	var context = game.canvas.getContext("2d");

	// If game is over... then game is over! :D
	if (game.lives < 0)
	{
		game.drawOver(game, context);
		game.stopLoop();
		return;
	}

	// Empty the canvas
	context.clearRect(0, 0, game.width(), game.height());

	// Draw the actors
	var actors = game.actors;
	for(var j = 0; j < actors.length; j++) actors[j].draw(context);

	game.drawHud(game, context);
};

Game.prototype.drawHud = function(game, context)
{
	context.fillStyle = "green";
	context.font = "12pt Arial";

	// Draw the score
	context.fillText("Score: " + game.score, 10, 590);

	// Draw lives
	context.fillText("Lives: " + game.lives, 150, 590);
};

Game.prototype.drawOver = function(game, context)
{
	context.font = "20pt Arial";
	context.fillText("Game Over :(", 310, 200);

	context.font = "14pt Arial";
	context.fillText("Refresh to play again!", 300, 500);
};