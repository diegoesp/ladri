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

	this.game.levelSelector.levels[0].bricksMap = bricksMap;
};