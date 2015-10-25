// Our game
//
// Instance level variables
// ========================
//
// pad: our hero!
// ball: well... the ball
// score: score for the game
// actors: a collection that holds all characters in the game (i.e. things that can collision with each other)
// lives: chances for the player
// audioLibrary: holds the sound effects that we play
// framesPerSecond: holds the FPS utility
//
// Class static variables
// ======================
//
// LAST_LEVEL: the last level the user had access to, so he can continue
//
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
	this.audioLibrary.add("level_won", "LEVEL_WON");

	this.stars = new Stars(this);
	this.stars.setSpeed({ x: 0, y: 0.4 });

	// My two featured characters :)
	this.pad = new Pad(this);
	this.ball = new Ball(this);

	this.actors = [];
	this.actors.push(this.pad);
	this.actors.push(this.ball);

	// Hide the mouse cursor inside the canvas.
	// this.canvas.style.cursor = "none";

	this.framesPerSecond = new FramesPerSecond();

	this.levelSelector = new LevelSelector();

	// var debugGame = new DebugGame(this);
	// debugGame.onlyOneLevel();
	// debugGame.makeFirstLevelSimple();
	// debugGame.makeAllLevelsSimple();
	// debugGame.jumpToLevel(3);
	// debugGame.godMode();
	// debugGame.lighspeedBall(this);
};

// Inherit from Game
LadriGame.prototype = Object.create(Game.prototype);
LadriGame.prototype.constructor = LadriGame;

// Starts the game.
//
// Accepts an optional boolean parameter continueGame. If true, then the game
// will start on the level stated by LAST LEVEL
LadriGame.prototype.start = function(continueGame)
{
	var level = null;

	if (continueGame)
	{
		if (!State.LAST_LEVEL) throw new Error("Cannot continue without State.LAST_LEVEL");
		this.levelSelector.setLevelNumber(State.LAST_LEVEL);
	}

	level = this.levelSelector.nextLevel();
	this.displayLevel(level);
	this.startLoop();
};

// Sets up a new level so the user can start playing
LadriGame.prototype.displayLevel = function(level)
{
	// Add the bricks
	var bricks = level.createBricks(this);	
	this.actors = this.actors.concat(bricks);

	var ball = this.ball;
	ball.reset();

		// Set the initial ball speed
	ball.setSpeed(level.ballSpeed);
	// Set a timeout for ball speed increment
	this.incrementSpeedInterval = window.setInterval(function() 
	{
		ball.incrementSpeed(level.incrementBallSpeed);
	}, level.secondsToIncrementBallSpeed * 1000);

	this.level = level;

	// Save for continue
	State.LAST_LEVEL = this.levelSelector.getLevelNumber();

	this.pad.reset();
};

// The game loop! good ol' times :D
LadriGame.prototype.loop = function()
{
	// First we do all the cool math stuff and processing to prepare us to draw
	// a frame on the screen
	switch(this.getStatus())
	{
		case this.STATUS.PLAYING:
		{
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

			// Check if the ball is touching screen edges. If that is the case, we have
			// to revert speed so it "collides" to the border
			if (ball.x < 0) ball.speedX = Math.abs(ball.speedX);
			if (ball.x > this.width()) ball.speedX = -Math.abs(ball.speedX);
			if (ball.y < 0) ball.speedY = Math.abs(ball.speedY);
			if (ball.y > this.height()) ball.speedY = -Math.abs(ball.speedY);

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

			break;
		}
		case this.STATUS.LEVEL_WON:
		{
			// If level is  complete, then draw a small animation, play
			// a sound and instance the new level.

			if (this.incrementSpeedInterval)
			{
				window.clearInterval(this.incrementSpeedInterval);
				this.incrementSpeedInterval = null;

				this.audioLibrary.get("LEVEL_WON").play();
			}

			this.pad.y -= 10;

			if (this.pad.y < 15)
			{
				var level = this.levelSelector.nextLevel();
				this.displayLevel(level);
			}

			break;
		}
		case this.STATUS.WON:
		{
			this.end();
			break;
		}
		case this.STATUS.LOST:
		{
			this.end();
			break;
		}
	}

	// We finished calculations. Now we have to draw the frame
	this.draw();
};

// Ends the game, returning the user to the main menu
LadriGame.prototype.end = function()
{
	// Set a timer that redirects me to the menu after a time of showing an end message
	// or animation
	if (!this.endInterval)
	{
		var game = this;
		this.endInterval = window.setInterval(function() {
			window.clearInterval(game.endInterval);
			game.stopLoop();

			var menuGame = new MenuGame(game.canvas);
			menuGame.startLoop();
		}, 5000);
	}
};

// Draws a game frame
LadriGame.prototype.draw = function()
{
	var context = this.context();
	
	context.fillStyle = "black";
	context.fillRect(0, 0, this.width(), this.height());
	// Empty the canvas
	// context.clearRect(0, 0, this.width(), this.height());

	this.stars.draw();
	
	// Draw the actors
	var actors = this.actors;
	for(var j = 0; j < actors.length; j++)
	{
		var actor = actors[j];
		// If I lost, do not draw the ball again
		if (this.getStatus() === this.STATUS.LOST && actor instanceof Ball) continue;

		actor.draw(context);
	}

	if (this.getStatus() === this.STATUS.WON) this.drawWon();
	if (this.getStatus() === this.STATUS.LOST) this.drawOver();

	this.drawHud();

	this.framesPerSecond.drawn();
};

LadriGame.prototype.drawHud = function()
{
	var context = this.context();

	// Green
	context.fillStyle = "rgb(0, 255, 144)";
	context.font = "12pt rodusround";

	// Draw Level
	context.fillText("Level: " + this.levelSelector.getLevelNumber(), 10, 582);

	// Draw the score
	context.fillText("Score: " + this.score, 140, 582);

	// Draw lives
	context.fillText("Lives: " + this.lives, 280, 582);

	// Draw FPS
	context.fillText("FPS: " + this.framesPerSecond.calculate(), 735, 582);
};

LadriGame.prototype.drawWon = function()
{
	var context = this.context();

	context.fillStyle = "rgb(255, 124, 163)";
	context.font = "25pt rodusround";
	context.fillText("Congratulations! You won! :D", 200, 92);

	context.font = "14pt rodusround";
	context.fillText("Final score: " + this.score, 330, 217);
};

LadriGame.prototype.drawOver = function()
{
	var context = this.context();

	// Green
	context.fillStyle = "rgb(0, 255, 144)";
	context.font = "20pt rodusround";
	context.fillText("Game Over :(", 320, 312);

	context.font = "14pt rodusround";
	context.fillText("Final score: " + this.score, 330, 417);
};

LadriGame.prototype.STATUS = { PLAYING: 1, LEVEL_WON: 2, WON: 3, LOST: 4 };

// Gets the status of the game. Possible statuses are determined by STATUS hash
LadriGame.prototype.getStatus = function()
{	
	if (this.actors.length <= 2 && !this.levelSelector.hasNextLevel()) return this.STATUS.WON;
	if (this.actors.length <= 2) return this.STATUS.LEVEL_WON;
	if (this.lives < 0) return this.STATUS.LOST;

	return this.STATUS.PLAYING;
};