var Level01 = function()
{
	Level.call(this);

	// Will use default brick map for this level

	// This is a bricks map used to test level jumping. Should be commented.
	/*
	this.bricksMap = "";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "---------";
	this.bricksMap += "-------X-";
	*/
};

// Inherit from Level
Level01.prototype = Object.create(Level.prototype);
Level01.prototype.constructor = Level01;

Level.prototype.getName = function()
{
	return "01";
};