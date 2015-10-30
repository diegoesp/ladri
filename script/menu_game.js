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

	var menuOptionContinue = new MenuOption("Continue", 344, 320, this.continueGame);
	var menuOptionNewGame = new MenuOption("New game", 335, 390, this.newGame);
	
	this.menu = new Menu(this);
	this.menu.addMenuOption(menuOptionContinue);
	this.menu.addMenuOption(menuOptionNewGame);

	if (!State.LAST_LEVEL)
	{
		menuOptionContinue.setState(MenuOption.STATE.DISABLED);
	}
};

MenuGame.prototype = Object.create(Game.prototype);
MenuGame.prototype.constructor = MenuGame;

MenuGame.prototype.handleEvent = function(event)
{
	Game.prototype.handleEvent.call(this, event);

	// Switch menues every time the user presses a cursor. We cannot use
	// the keyboard map since it is too high def, switches too fast. Even
	// orienting works best
	if (event.type === "keyup")
	{
		if (event.keyCode === this.keyboard.codes.cursorUp || event.keyCode === this.keyboard.codes.cursorDown)
		{
			this.menu.highlightNext();
		}
	}
};

MenuGame.prototype.loop = function()
{
	this.menu.highlightOnMousePointer();

	// Execute the action if the menu is clicked
	var keyMap = this.keyboard.keyMap();
	if (keyMap.enter || this.mouse.map().leftClick)
	{
		var menuOption = this.menu.getHighlightedMenuOption();
		if (menuOption) menuOption.execute(this);
	}

	var context = this.context();	

	context.fillStyle = "black";
	context.fillRect(0, 0, this.width(), this.height());

	this.stars.draw();

	context.font = "60pt rodusround";
	context.fillStyle = "rgb(255, 100, 100)";
	context.fillText("LADRI", 280, 140);

	this.menu.draw();
};

MenuGame.prototype.continueGame = function(game)
{
	game.startGame(true);
};

MenuGame.prototype.newGame = function(game)
{
	game.startGame();
};

MenuGame.prototype.startGame = function(continueGame)
{
	this.stopLoop();
	this.audioLibrary.get("intro").pause();

	var ladriGame = new LadriGame(this.canvas);
	ladriGame.start(continueGame);
};