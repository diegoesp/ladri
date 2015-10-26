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

	this.lastLevel = null;

	this.menuOptionContinue = new MenuOption("Continue", 344, 320, this);
	this.menuOptionNewGame = new MenuOption("New game", 335, 390, this);
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
			if (this.menuOptionNewGame.isSelected() && State.LAST_LEVEL)
			{
				this.menuOptionNewGame.setStatus(MenuOption.STATUS.NORMAL);
				this.menuOptionContinue.setStatus(MenuOption.STATUS.HIGHLIGHTED);
			}
			else
			{
				this.menuOptionNewGame.setStatus(MenuOption.STATUS.HIGHLIGHTED);
				if (State.LAST_LEVEL)
				{
					this.menuOptionContinue.setStatus(MenuOption.STATUS.NORMAL);
				}
			}
		}
	}
};

MenuGame.prototype.loop = function()
{
	// Logic for menues: determine how each menu is drawn
	if (State.LAST_LEVEL)
	{
		if (this.menuOptionContinue.isMousePointerOn(this))
		{
			this.menuOptionContinue.setStatus(MenuOption.STATUS.HIGHLIGHTED);
			this.menuOptionNewGame.setStatus(MenuOption.STATUS.NORMAL);
		}
	}
	else
	{
		this.menuOptionContinue.setStatus(MenuOption.STATUS.DISABLED);
	}
			
	if (this.menuOptionNewGame.isMousePointerOn(this)) 
	{
		this.menuOptionNewGame.setStatus(MenuOption.STATUS.HIGHLIGHTED);
		if (State.LAST_LEVEL)
		{
			this.menuOptionContinue.setStatus(MenuOption.STATUS.NORMAL);
		}
		else
		{
			this.menuOptionContinue.setStatus(MenuOption.STATUS.DISABLED);	
		}
	}

	// Execute the action if the menu is clicked
	var keyMap = this.keyboard.keyMap();
	if (keyMap.enter || this.mouse.map().leftClick)
	{
		if (this.menuOptionNewGame.isSelected())
		{
			this.startGame();
			return;
		}
		if (this.menuOptionContinue.isSelected())
		{
			this.startGame(true);
			return;
		}
	}

	var context = this.context();	

	context.fillStyle = "black";
	context.fillRect(0, 0, this.width(), this.height());

	this.stars.draw();

	context.font = "60pt rodusround";
	context.fillStyle = "rgb(255, 100, 100)";
	context.fillText("LADRI", 280, 140);

	this.menuOptionContinue.draw();
	this.menuOptionNewGame.draw();
};

MenuGame.prototype.startGame = function(continueGame)
{
	this.stopLoop();
	this.audioLibrary.get("intro").pause();

	var ladriGame = new LadriGame(this.canvas);
	ladriGame.start(continueGame);
};