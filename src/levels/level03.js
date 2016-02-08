var Level03 = function()
{
	Level.call(this);
	
	this.bricksMap = "";
	this.bricksMap += "---------";
	this.bricksMap += "XXXXXXXXX";
	this.bricksMap += "XXXXXXX--";
	this.bricksMap += "XXXXXX---";
	this.bricksMap += "XXXXX----";
	this.bricksMap += "XXXX-----";
	this.bricksMap += "XXX------";
	this.bricksMap += "XX-------";
	this.bricksMap += "X--------";
	
	this.incrementBallSpeed = 2;
};

// Inherit from Level
Level03.prototype = Object.create(Level.prototype);
Level03.prototype.constructor = Level03;