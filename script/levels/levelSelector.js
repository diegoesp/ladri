// Manages levels so the game can pick new levels
var LevelSelector = function()
{
	this.reset();
};

LevelSelector.prototype.nextLevel = function()
{
	return this.levels.pop();
};

LevelSelector.prototype.reset = function()
{
	this.levels = [];
	this.levels.push(new Level01());
	this.levels.push(new Level02());

	this.levels.reverse();
};