// Base class for games. Runs the game loop. To implement,
//
// Supply a canvas for the constructor
// Implement loop() that is called to execute the game loop.
var Game = function(canvas)
{
	this.canvas = canvas;

	// Adjust canvas to fit present window...
	this.resizeCanvas();
	// ... and ask the window to resize it whenever the window changes
	var game = this;
	window.onresize = function() { game.resizeCanvas(); };

	// Cache the 2D context
	this.cachedContext = this.canvas.getContext("2d");
};

Game.prototype.width = function()
{
	return this.canvas.width;
};

Game.prototype.height = function()
{
	return this.canvas.height;
};

// Resizes the game in screen to the best possible size based on original
// dimensions and the current screen resolution
Game.prototype.resizeCanvas = function()
{
	var scale = ScreenScaler.scale(this);
	this.canvas.style.width = scale.width + "px";
	this.canvas.style.height = scale.height + "px";
};

// Gets a 2D context for drawing
Game.prototype.context = function()
{
	return this.cachedContext;
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
			this.mouse.move(event);
			break;
		}
		case "touchmove":
		{
			this.touch.move(event);
			break;
		}
	}
};

// Starts the game loop
Game.prototype.startLoop = function()
{
	var game = this;

	// Uncomment to use a timer to draw
	this.timer = window.setInterval(function() { game.loop(); }, 15);
	// Uncomment to use  requestAnimationFrame
	// window.requestAnimationFrame(function() { game.loop(); });

	this.canvas.parentNode.addEventListener("keydown", this, true);
	this.canvas.parentNode.addEventListener("keyup", this, true);
	this.canvas.parentNode.addEventListener("mousemove", this, true);
	this.canvas.parentNode.addEventListener("touchmove", this, true);
};

Game.prototype.stopLoop = function()
{
	// Uncomment to use a timer to draw
	window.clearInterval(this.timer);

	this.canvas.parentNode.removeEventListener("keydown", this);
	this.canvas.parentNode.removeEventListener("keyup", this);
	this.canvas.parentNode.removeEventListener("mousemove", this);
	this.canvas.parentNode.removeEventListener("touchmove", this);

	// Uncomment to use requestAnimationFrame
	// window.cancelAnimationFrame();
};

// Please implement
LadriGame.prototype.loop = function() {};