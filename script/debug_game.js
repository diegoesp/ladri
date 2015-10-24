// A useful pattern, the debug game class modifies the game classes
// to test varying scenarios quickly.
var DebugGame = function(game)
{
	this.game = game;
};

// The game will have just one level, so the player will win the game
// after passing it
DebugGame.prototype.onlyOneLevel = function()
{
	this.game.levelSelector.levels = [this.game.levelSelector.levels[0]];
};

// The first level will have only one brick, meaning the user
// will jump to the second level automatically
DebugGame.prototype.makeFirstLevelSimple = function()
{	
	var levels = this.game.levelSelector.levels;

	var bricksMap = this.getSimpleBrickMap();
	levels[levels.length - 1].bricksMap = bricksMap;
};

DebugGame.prototype.makeAllLevelsSimple = function()
{	
	var levels = this.game.levelSelector.levels;

	var bricksMap = this.getSimpleBrickMap();
	for (var i = 0; i < levels.length; i++)
	{
		levels[i].bricksMap = bricksMap;
	}
};

DebugGame.prototype.jumpToLevel = function(levelNumber)
{
	for (var i = 0; i < (levelNumber - 1); i++)
	{
		this.game.levelSelector.nextLevel();
	}

};

DebugGame.prototype.getSimpleBrickMap = function()
{
	var bricksMap = "";
	
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "---------";
	bricksMap += "-------X-";

	return bricksMap;
};