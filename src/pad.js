// Our hero!! The pad that hits the ball
var Pad = function(game)
{
	this.reset();
	this.game = game;
};

// Pad inherits from Actor
Pad.prototype = Object.create(Actor.prototype);
Pad.prototype.constructor = Pad;

Pad.prototype.reset = function()
{
	this.x = 320;
	this.y = 530;
	this.width = 150;
	this.height = 20;
	this.speedX = 10;
};

Pad.prototype.draw = function()
{
	var context = this.game.context();

	// Blue
	context.fillStyle = "rgb(84, 182, 255)";

	var screen = this.game.screen;

	context.fillRect(this.x, this.y, this.width, this.height);
};

Pad.prototype.move = function(game)
{
	var keyboard = game.keyboard;
	if (keyboard.keyMap().cursorLeft) this.x -= this.speedX;
	if (keyboard.keyMap().cursorRight) this.x += this.speedX;

	var mouseMap = game.mouse.map();
	if (mouseMap.left) this.x -= this.speedX;
	if (mouseMap.right) this.x += this.speedX;
	// Cancel movement, so the pad does not keep moving all the time
	mouseMap.left = false;
	mouseMap.right = false;

	var touchMap = game.touch.map();
	if (touchMap.left) this.x -= this.speedX;
	if (touchMap.right) this.x += this.speedX;

	// The pad must not go out of the screen
	if (this.x < 0) this.x = 0;
	if (this.xWidth() > game.width()) this.x = (game.width() - this.width);
};