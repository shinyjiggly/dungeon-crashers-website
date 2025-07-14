/*:
 * @target MV
 * @plugindesc Wand of Blasting action stuff
 * @author Marrend
 * @url https://marrendreikan.itch.io/
 * @help adds is_actionable and addAction. 
 * is_actionable either returns an event ID or 0. 
 * addAction tracks which event ID's have an action in an array
 * wobHasMoved checks coordinate pair 1 with coordinate pair 2
 */

is_actionable = function(x, y) {
    for (let i = 0; i < $gameMap.actions.length; i++) {
        // Cycles through current action array to see if something was hit.
        event_id = $gameMap.actions[i];
        if (event_id != 0) {
            // If the value of event_id is 0, the action is considered removed/nonexistant.
            if ($gameMap._events[event_id].pos(x, y)) {
                return event_id;
            }
        }
    }
    return 0;
}

wobHasMoved = function() {
	return $gameVariables.value(16) === $gameVariables.value(21) && $gameVariables.value(17) === $gameVariables.value(22);
}						  
Game_Map.prototype.addAction = function(params) {
    this.actions = [];
    for (let i = 0; i < params.length; i++) {
        this.actions.push(params[i]);
    }
}