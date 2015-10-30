// Represents a menu that contains menu options
var Menu = function(game)
{
	this.menuOptions = [];
	this.game = game;
};

// Adds a new menu option to this menu
Menu.prototype.addMenuOption = function(menuOption)
{
	this.menuOptions.push(menuOption);
};

// Draws the complete menu
Menu.prototype.draw = function()
{
	var context = this.game.context();

	for (var i = 0; i < this.menuOptions.length; i++)
	{
		this.menuOptions[i].draw(context);
	}
};

// Highlights the next menu. If no menu is highlighted, highlights the
// first one
Menu.prototype.highlightNext = function()
{
	if (this.menuOptions.length === 0) throw new Error("No menu options stored");

	var menuOptionId = this.getHighlighedMenuOptionId();

	this.highlightNone();
		
	var menuOption = null;
	if (menuOptionId === null)
	{
		menuOption = this.menuOptions[0];
	}
	else
	{
		menuOptionId++;
		if (menuOptionId === this.menuOptions.length) menuOptionId = 0;
		menuOption = this.menuOptions[menuOptionId];
	}

	menuOption.setState(MenuOption.STATE.HIGHLIGHTED);
};

// Sets all menu options as not highlighted 
Menu.prototype.highlightNone = function()
{
	for (var i = 0; i < this.menuOptions.length; i++)
	{
		this.menuOptions[i].setState(MenuOption.STATE.NORMAL);
	}
};

// Gets the menu option that is highlighted
Menu.prototype.getHighlightedMenuOption = function()
{
	var menuOptionId = this.getHighlighedMenuOptionId();
	return this.menuOptions[menuOptionId];
};

// Gets the id of the highlighted menu option
Menu.prototype.getHighlighedMenuOptionId = function()
{
	for (var i = 0; i < this.menuOptions.length; i++)
	{
		var menuOption = this.menuOptions[i];
		if (menuOption.getState().isHighlighted()) return i;
	}

	return null;
};

// Highlights the menu that has the mouse pointer on
Menu.prototype.hightlightOnMousePointer = function()
{
	for (var i = 0; i < this.menuOptions.length; i++)
	{
		var menuOption = this.menuOptions[i];
		if (menuOption.isMousePointerOn(this.game))
		{
			this.highlightNone();
			menuOption.setState(MenuOption.STATE.HIGHLIGHTED);
		}
	}
};