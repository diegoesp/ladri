// Displays a main menu, shown to the user when the game starts
var MenuGame = function(canvas)
{
	// Call parent constructor
	Game.call(this, canvas);

	this.stars = new Stars(this);

	this.audioLibrary = new AudioLibrary();
	this.audioLibrary.add("intro", "intro");
	
	var audio = this.audioLibrary.get("intro");
	audio.loop = true;
	audio.play();
};

MenuGame.prototype = Object.create(Game.prototype);
MenuGame.prototype.constructor = MenuGame;

MenuGame.prototype.loop = function()
{
	if (this.keyboard.keyMap().enter || this.mouse.map().leftClick)
	{
		this.startGame();
		return;
	}

	var context = this.context();	

	context.fillStyle = "black";
	context.fillRect(0, 0, this.width(), this.height());

	this.stars.draw();

	context.font = "60pt rodusround";
	context.fillStyle = "rgb(255, 100, 100)";
	context.fillText("LADRI", 280, 200);

	context.font = "20pt rodusround";
	context.fillStyle = "rgb(255, 255, 255)";
	context.fillText("Press enter to start playing", 245, 370);
};

MenuGame.prototype.startGame = function()
{
	this.stopLoop();
	this.audioLibrary.get("intro").pause();

	var ladriGame = new LadriGame(this.canvas);
	ladriGame.startLoop();
};