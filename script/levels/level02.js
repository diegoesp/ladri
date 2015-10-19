var Level02 = function()
{
	Level.call(this);
	
	// Map for bricks. See setBricks for documentation
	this.bricksMap = "";
	this.bricksMap += "---------";
	this.bricksMap += "X--------";
	this.bricksMap += "XX-------";
	this.bricksMap += "XXX------";
	this.bricksMap += "XXXX-----";
	this.bricksMap += "XXXXX----";
	this.bricksMap += "XXXXXX---";
	this.bricksMap += "XXXXXXX--";
	this.bricksMap += "XXXXXXXXX";
};

// Inherit from Level
Level02.prototype = Object.create(Level.prototype);
Level02.prototype.constructor = Level02;

Level.prototype.getName = function()
{
	return "02";
};