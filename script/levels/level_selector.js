// Manages levels so the game can pick new levels
var LevelSelector = function()
{
	this.reset();
	this.levelNumber = 0;
};

LevelSelector.prototype.nextLevel = function()
{
	this.levelNumber++;
	return this.levels.pop();
};

LevelSelector.prototype.reset = function()
{
	this.levels = [];
	this.levels.push(new Level01());
	this.levels.push(new Level02());
	this.levels.push(new Level03());

	this.levels.reverse();
};

// Returns true if there are more levels pending to be shown. If false,
// the user must be playing the final level
LevelSelector.prototype.hasNextLevel = function()
{
	return (this.levels.length > 0);
};

// Gets the level number for the last returned level. Returns 0 if
// no level has been yet returned
LevelSelector.prototype.getLevelNumber = function()
{
	return this.levelNumber;
};