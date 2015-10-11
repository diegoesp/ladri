// Holds a collection of audios for the game to play
var AudioLibrary = function()
{
	this.audioMap = {};
};

// Adds an audio file to the collection. Must specify the file name (without extension)
// and a friendly name for the file to be searched.
//
// Can provide an onload function (optional) that notifies when the audio file
// was loaded. Useful for large files like music intro and such.
//
// The class determines the correct file extension based on browser support.
AudioLibrary.prototype.add = function(file, friendlyName, onload)
{
	var audio = new Audio();

	if (onload)
	{
		audio.addEventListener("canplaythrough", function() {
			onload();
		});
	}

	audio.src = "assets/" + file + "." + this.preferredExtension();
	this.audioMap[friendlyName] = audio;
};

// Gets an audio object by its friendly name
AudioLibrary.prototype.get = function(friendlyName)
{
	return this.audioMap[friendlyName];
};

// Given a list of possible audios, gets a random one. Useful to add
// a little fuziness to sounds
AudioLibrary.prototype.getRandom = function(friendlyNameArray)
{
	var length = (friendlyNameArray.length - 1);
	var i = Math.round((Math.random() * length));
	var key = friendlyNameArray[i];

	return this.audioMap[key];
};

// Determines the best sound format for this browser
// Throws an error if no format if supported
AudioLibrary.prototype.preferredExtension = function()
{
	if (this.canPlay("audio/mp3")) return "mp3";
	if (this.canPlay("audio/ogg")) return "ogg";
	if (this.canPlay("audio/wav")) return "wav";

	throw new Error("This browser does not support sound effects");
};

AudioLibrary.prototype.canPlay = function(format)
{
	var audio = document.createElement("audio");
	var canPlayType = audio.canPlayType(format);

	if (canPlayType === "probably") return true;
	return false;
};