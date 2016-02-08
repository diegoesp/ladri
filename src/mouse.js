// Handles mouse events so we can use the mouse to guide characters
var Mouse = function(game)
{
	this.movementMap = {
		x: 0,
		y: 0,
		left: false,
		right: false,
		leftClick: false
	};

	this.game = game;
};

Mouse.prototype.getCoordinates = function(event)
{
	var clientX = event.x;
	var clientY = event.y;

	// Transform mouse position to relative to canvas
	var canvasLeft = this.game.canvas.getBoundingClientRect().left;
	var canvasTop = this.game.canvas.getBoundingClientRect().top;

	clientX = clientX - canvasLeft;
	clientY = clientY - canvasTop;

	// Scale if the canvas was resized using simple third rule
	clientX = (this.game.width() * clientX) / this.game.scaledWidth();
	clientY = (this.game.height() * clientY) / this.game.scaledHeight();


	return { x: clientX, y: clientY };
};

Mouse.prototype.interact = function(event)
{
	var coordinates = this.getCoordinates(event);

	var diff = coordinates.x - this.movementMap.x;

	if (diff < 0) 
	{
		this.movementMap.left = true;
		this.movementMap.right = false;
	}
	else 
	{
		this.movementMap.left = false;
		this.movementMap.right = true;
	}

	this.movementMap.x = coordinates.x;
	this.movementMap.y = coordinates.y;

	if (event.which === 1) 
	{
		this.movementMap.leftClick = true; 
	}
	else 
	{
		this.movementMap.leftClick = false;
	}
};

// Gets the mouse map movement. Try to not call more than once per cycle,
// as it is a costly call for the loop.
Mouse.prototype.map = function()
{	
	return this.movementMap;
};