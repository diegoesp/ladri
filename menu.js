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

// Highlights the menu next to the currently highlighted. If no menu is highlighted, 
// highlights the first one
Menu.prototype.highlightNext = function()
{
	var enabledMenuOptions = this.getEnabledMenuOptions();
	if (enabledMenuOptions.length === 0) throw new Error("No enabled menu options available");

	var menuOptionId = this.getHighlighedMenuOptionId(enabledMenuOptions);

	this.highlightNone();
		
	var menuOption = null;
	if (menuOptionId === null)
	{
		menuOption = enabledMenuOptions[0];
	}
	else
	{
		menuOptionId++;
		if (menuOptionId === enabledMenuOptions.length) menuOptionId = 0;
		menuOption = enabledMenuOptions[menuOptionId];
	}

	menuOption.setState(MenuOption.STATE.HIGHLIGHTED);
};

// Sets all menu options as not highlighted 
Menu.prototype.highlightNone = function()
{
	for (var i = 0; i < this.menuOptions.length; i++)
	{
		var menuOption = this.menuOptions[i];
		if (!menuOption.isDisabled())
		{
			this.menuOptions[i].setState(MenuOption.STATE.NORMAL);
		}
	}
};

Menu.prototype.getEnabledMenuOptions = function()
{
	var enabledMenuOptions = [];
	for(var i = 0; i < this.menuOptions.length; i++)
	{
		var menuOption = this.menuOptions[i];

		if (!menuOption.isDisabled())
		{
			enabledMenuOptions.push(menuOption);
		}
	}

	return enabledMenuOptions;
};

// Gets the menu option that is highlighted
Menu.prototype.getHighlightedMenuOption = function()
{
	var menuOptionId = this.getHighlighedMenuOptionId();
	return this.menuOptions[menuOptionId];
};

// Gets the id of the highlighted menu option. Can optionally provide
// another menuOptions to search the highlighted one.
Menu.prototype.getHighlighedMenuOptionId = function(menuOptions)
{
	if (!menuOptions) menuOptions = this.menuOptions;
	
	for (var i = 0; i < menuOptions.length; i++)
	{
		var menuOption = menuOptions[i];
		if (menuOption.isHighlighted()) return i;
	}

	return null;
};

// Highlights the menu that has the mouse pointer on
Menu.prototype.highlightOnMousePointer = function()
{
	for (var i = 0; i < this.menuOptions.length; i++)
	{
		var menuOption = this.menuOptions[i];
		if (menuOption.isMousePointerOn(this.game) && !menuOption.isDisabled())
		{
			this.highlightNone();
			menuOption.setState(MenuOption.STATE.HIGHLIGHTED);
		}
	}
};