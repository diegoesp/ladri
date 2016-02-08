// Holds general shared state for the game. This could be persisted in the future
// as local storage
var State = {};

// Holds the last level the user had access to. If null, it means the user
// never played before.
State.LAST_LEVEL = null;