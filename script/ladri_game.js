// Our game. Holds the following class variables:
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
// screen: Useful class for responsive screen purposes
// audioLibrary: holds the sound effects that we play
// framesPerSecond: holds the FPS utility
var LadriGame = function(canvas)
{
	// Call parent constructor
	Game.call(this, canvas);
	
	// Input methods (player can use keyboard, mouse or touchscreen)
	this.keyboard = new Keyboard();
	this.mouse = new Mouse();
	this.touch = new Touch();

	this.score = 0;
	this.lives = 2;

	this.audioLibrary = new AudioLibrary();
	this.audioLibrary.add("ball_hit_1", "BALL_HIT_1");
	this.audioLibrary.add("ball_hit_2", "BALL_HIT_2");
	this.audioLibrary.add("life_lost", "LIFE_LOST");
	this.audioLibrary.add("pad_hit_1", "PAD_HIT_1");

	// My two featured characters :)
	this.pad = new Pad(this);
	this.ball = new Ball(this);

	this.actors = [];
	this.actors.push(this.pad);
	this.actors.push(this.ball);
	this.createBricks();

	// Hide the mouse cursor inside the canvas.
	this.canvas.style.cursor = "none";

	this.framesPerSecond = new FramesPerSecond();
};

// Inherit from Game
LadriGame.prototype = Object.create(Game.prototype);
LadriGame.prototype.constructor = LadriGame;

// Create bricks for the player to bust. We start at the upper left corner
// and then iterate through each line until we have all the bricks.
// We will probably replace this for a level creator in the future
LadriGame.prototype.createBricks = function()
{
	var x = 12.5;
	var y = 10;
	var colors = Brick.colors();

	for(var i = 0; i < 8; i++)
	{
		var color = colors.pop();

		for (var j = 0; j < 9; j++)
		{
			var brick = new Brick(this, x, y, color);
			this.actors.push(brick);

			// Next brick in line
			x += (brick.width + 12.5);
		}

		// Next line
		x = 12.5;
		y += 30;
	}
};

// The game loop! good ol' times :D
LadriGame.prototype.loop = function()
{
	// First we do all the cool math and processing to prepare us to draw
	// stuff on the screen

	// Move the pad
	this.pad.move(this);

	var ball = this.ball;

	// Check if the user lost a life?
	if (ball.isAtScreenBottom(this))
	{
		this.lives--;
		this.audioLibrary.get("LIFE_LOST").play();
		ball.reset();
	}

	// Check if the ball is touching screen edges
	if (ball.isAtScreenEdgeX(this)) ball.speedX = -ball.speedX;
	if (ball.isAtScreenEdgeY(this)) ball.speedY = -ball.speedY;
	ball.move();

	// Check for collisions
	var collisions = ball.collisions(this);
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
			var index = this.actors.indexOf(actor);
			if (index < 0)
			{
				console.log("Error!: busted brick could not be found as an actor");
			}
			else
			{
				this.actors.splice(index, 1);
				this.score += 100;

				// Play the brick collision sound
				this.audioLibrary.getRandom(["BALL_HIT_1", "BALL_HIT_2"]).play();
			}
		}

		if (actor instanceof Pad)
		{
			// Play the pad collision sound
			this.audioLibrary.get("PAD_HIT_1").play();
		}
	}

	// We finished calculations. Now we have to draw.
	this.draw();

	// Uncoment to use requestAnimationFrame
	// var game = this;
	// window.requestAnimationFrame(function() { game.loop(); });
};

// Draws a game frame
LadriGame.prototype.draw = function()
{
	var context = this.context();

	// If game is over... then game is over! :D
	if (this.lives < 0)
	{
		this.drawOver();
		this.stopLoop();
		return;
	}

	// Empty the canvas
	context.clearRect(0, 0, this.width(), this.height());

	// Draw the actors
	var actors = this.actors;
	for(var j = 0; j < actors.length; j++) actors[j].draw(context);

	this.drawHud();

	this.framesPerSecond.drawn();
};

LadriGame.prototype.drawHud = function()
{
	var context = this.context();

	context.fillStyle = "green";
	context.font = "12pt Arial";

	// Draw the score
	context.fillText("Score: " + this.score, 10, 590);

	// Draw lives
	context.fillText("Lives: " + this.lives, 150, 590);

	// Draw FPS
	context.fillText("FPS: " + this.framesPerSecond.calculate(), 300, 590);
};

LadriGame.prototype.drawOver = function()
{
	var context = this.context();

	context.font = "20pt Arial";
	context.fillText("Game Over :(", 310, 200);

	context.font = "14pt Arial";
	context.fillText("Refresh to play again!", 300, 500);
};