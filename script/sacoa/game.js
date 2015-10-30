// Base class for games. Runs the game loop. To implement,
//
// 1) Must supply a canvas for the constructor
// 2) May supply an optional argument options that contains:
// 		.animationMethod: one of the two possible values from Game.ANIMATION_METHOD
//		.fullScreen: if true, then the game will require full screen
// 3) Implement loop() that is called to execute the game loop.
//
// Instance variables:
//
// canvas: holds the canvas for drawing
// keyboard: a Keyboard controller, so we know what is pressed inside the game loop
// mouse: a Mouse controller, so we know it is moved inside the game loop
// touch: a Touch controller, so we know it is used inside the game loop
// timer: holds the setInterval timer for the game loop
var Game = function(canvas, options)
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

	this.animationMethod = Game.ANIMATION_METHOD.TIMER;
	if (options)
	{
		if (options.animationMethod)
		{
			if (!Game.ANIMATION_METHOD[options.animationMethod]) throw new Error("animationMethod not valid. Use Game.ANIMATION_METHOD");

			this.animationMethod = options.animationMethod;
		}
	}
};

Game.ANIMATION_METHOD = { TIMER: "TIMER", ANIMATION_FRAME: "ANIMATION_FRAME" };

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
	if (this.animationMethod === Game.ANIMATION_METHOD.TIMER)
	{
		this.timer = window.setInterval(function() { game.loop(); }, 15);
	}
	else
	{
		this.animationFrameRequest = window.requestAnimationFrame(function() { game.requestAnimationFrameLoop(); });
	}

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
	if (this.animationMethod === Game.ANIMATION_METHOD.TIMER)
	{
		window.clearInterval(this.timer);
	}
	else
	{
		window.cancelAnimationFrame(this.animationFrameRequest);
	}

	this.canvas.parentNode.removeEventListener("keydown", this);
	this.canvas.parentNode.removeEventListener("keyup", this);
	this.canvas.parentNode.removeEventListener("mousemove", this);
	this.canvas.parentNode.removeEventListener("click", this);
	this.canvas.parentNode.removeEventListener("touchmove", this);
};

Game.prototype.requestAnimationFrameLoop = function() 
{
	this.loop();
	var game = this;
	this.animationFrameRequest = window.requestAnimationFrame(function() { game.requestAnimationFrameLoop(); });
};

// Please implement
Game.prototype.loop = function() {};