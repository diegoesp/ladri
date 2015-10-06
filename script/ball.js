// Use the ball to bust bricks!
var Ball = function(game)
{
	this.reset();

	this.game = game;
};

// Ball inherits from Actor
Ball.prototype = Object.create(Actor.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.reset = function()
{
	this.x = 380;
	this.y = 480;
	this.speedX = -3.5;
	this.speedY = -3.5;
};

Ball.prototype.draw = function()
{
	var radius = 7.5;
	var initialAngle = 0;
	var finalAngle = Math.PI * 2;
	var antiClockwise = true;

	var context = this.game.context();

	context.beginPath();
	context.arc(this.x, this.y, radius, initialAngle, finalAngle, antiClockwise);
	context.closePath();
	context.fill();

	// All actors have width and height for collision calculations
	this.width = 15;
	this.height = 15;
};

// Moves the ball by its present speed. Should be called inside the game loop
Ball.prototype.move = function()
{
	this.x += this.speedX;
	this.y += this.speedY;
};