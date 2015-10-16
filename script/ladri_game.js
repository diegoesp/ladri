// Our game. Holds the following class variables:
//
// pad: our hero!
// ball: well... the ball
// score: score for the game
// actors: a collection that holds all characters in the game (i.e. things that can collision with each other)
// lives: chances for the player
// audioLibrary: holds the sound effects that we play
// framesPerSecond: holds the FPS utility
var LadriGame = function(canvas)
{
	// Call parent constructor
	Game.call(this, canvas);
	
	this.score = 0;
	this.lives = 2;

	this.audioLibrary = new AudioLibrary();
	this.audioLibrary.add("ball_hit_1", "BALL_HIT_1");
	this.audioLibrary.add("ball_hit_2", "BALL_HIT_2");
	this.audioLibrary.add("life_lost", "LIFE_LOST");
	this.audioLibrary.add("pad_hit_1", "PAD_HIT_1");

	this.stars = new Stars(this);
	this.stars.setSpeed({ x: 0, y: 0.4 });

	// My two featured characters :)
	this.pad = new Pad(this);
	this.ball = new Ball(this);

	this.actors = [];
	this.actors.push(this.pad);
	this.actors.push(this.ball);

	// Hide the mouse cursor inside the canvas.
	this.canvas.style.cursor = "none";

	this.framesPerSecond = new FramesPerSecond();

	// Get the first level...
	this.levelSelector = new LevelSelector();
	var level = this.levelSelector.nextLevel();
	/// ...and add the bricks
	var bricks = level.createBricks(this);
	this.actors = this.actors.concat(bricks);
};

// Inherit from Game
LadriGame.prototype = Object.create(Game.prototype);
LadriGame.prototype.constructor = LadriGame;

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

	context.fillStyle = "black";
	context.fillRect(0, 0, this.width(), this.height());
	// Empty the canvas
	// context.clearRect(0, 0, this.width(), this.height());

	this.stars.draw();
	
	// Draw the actors
	var actors = this.actors;
	for(var j = 0; j < actors.length; j++) actors[j].draw(context);

	this.drawHud();

	this.framesPerSecond.drawn();
};

LadriGame.prototype.drawHud = function()
{
	var context = this.context();

	// Green
	context.fillStyle = "rgb(0, 255, 144)";
	context.font = "12pt rodusround";

	// Draw the score
	context.fillText("Score: " + this.score, 10, 590);

	// Draw lives
	context.fillText("Lives: " + this.lives, 150, 590);

	// Draw FPS
	context.fillText("FPS: " + this.framesPerSecond.calculate(), 280, 590);
};

LadriGame.prototype.drawOver = function()
{
	var context = this.context();

	// Green
	context.fillStyle = "rgb(0, 255, 144)";
	context.font = "20pt rodusround";
	context.fillText("Game Over :(", 320, 280);

	context.font = "14pt rodusround";
	context.fillText("Refresh to play again!", 300, 500);
};