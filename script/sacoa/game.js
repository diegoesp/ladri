// Base class for games. Runs the game loop. To implement,
//
// Supply a canvas for the constructor
// Implement loop() that is called to execute the game loop.
//
// Instance variables:
//
// canvas: holds the canvas for drawing
// keyboard: a Keyboard controller, so we know what is pressed inside the game loop
// mouse: a Mouse controller, so we know it is moved inside the game loop
// touch: a Touch controller, so we know it is used inside the game loop
// timer: holds the setInterval timer for the game loop
var Game = function(canvas)
{
	this.canvas = canvas;

	// Input methods (player can use keyboard, mouse or touchscreen)
	this.keyboard = new Keyboard();
	this.mouse = new Mouse(this);
	this.touch = new Touch();

	// Adjust canvas to fit present window...
	this.resizeCanvas();
	// ... and ask the window to resize it whenever the window changes
	var game = this;
	window.onresize = function() { game.resizeCanvas(); };

	// Cache the 2D context
	this.cachedContext = this.canvas.getContext("2d");
	this.cachedContext.textBaseline = "top";
};

Game.prototype.width = function()
{
	return this.canvas.width;
};

Game.prototype.height = function()
{
	return this.canvas.height;
};

Game.prototype.scaledWidth = function()
{
	return Number.parseInt(this.canvas.style.width.replace("px", ""));
};

Game.prototype.scaledHeight = function()
{
	return Number.parseInt(this.canvas.style.height.replace("px", ""));
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
	// Fills the action maps
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
			this.mouse.interact(event);
			break;
		}
		case "click":
		{
			this.mouse.interact(event);
			break;
		}
		case "touchmove":
		{
			this.touch.interact(event);
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
	this.canvas.parentNode.addEventListener("click", this, true);
	this.canvas.parentNode.addEventListener("touchmove", this, true);
};

// Stops the game loop. That means no more key/mouse/touch events, no more
// physics and no more drawing. The game stops.
Game.prototype.stopLoop = function()
{
	// Uncomment to use a timer to draw
	window.clearInterval(this.timer);

	this.canvas.parentNode.removeEventListener("keydown", this);
	this.canvas.parentNode.removeEventListener("keyup", this);
	this.canvas.parentNode.removeEventListener("mousemove", this);
	this.canvas.parentNode.removeEventListener("click", this);
	this.canvas.parentNode.removeEventListener("touchmove", this);

	// Uncomment to use requestAnimationFrame
	// window.cancelAnimationFrame();
};

// Please implement
Game.prototype.loop = function() {};