//=========================================================
// Cae_SlopeMove.js
//=========================================================

/*:
 * @plugindesc v1.5 - Region-based left/right -> diagonal movement conversion for stairs/slopes. Applies to player, followers, and events.
 * @author Caethyril
 *
 * @help Plugin Commands:
 *      SlopeMove [Add|Remove] [Up|Down] [Region ID]
 *   Add or remove slope regions during gameplay. Examples:
 *      SlopeMove Add Up 1       - Add region 1 as a "slope up" region.
 *      SlopeMove Remove Down 5  - Remove region 5 from the "slope down" list.
 *      SlopeMove ADD down 52    - Add region 52 to the "slope down" list.
 *   The plugin commands are not case-sensitive.
 *
 * Help:
 *   'Up' slopes are ones in this direction /
 *   'Down' slopes are in this direction    \
 *   Place slope regions in diagonal lines along passable slopes.
 *   Diagonal movement will be checked when moving from a slope region.
 *   Region type (up or down) determines which tile is checked.
 *   If that tile's region is the same type (up/down) then move diagonally!
 *
 * Compatibility:
 *   Overrides: Game_Player:
 *                moveStraight
 *   Aliases:   Game_CharacterBase:
 *                moveStraight, moveDiagonally, checkEventTriggerTouchFront
 *              Game_Player:
 *                moveDiagonally
 *              Game_Character:
 *                turnTowardCharacter, turnAwayFromCharacter
 *              DataManager:
 *                createGameObjects, makeSaveContents, extractSaveContents
 *   Defines:   Game_CharacterBase:
 *                isSlopeThru, getSlopeNext, slopeCheck
 *
 * Terms of use:
 *   Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.5: Face Away from Player now works when Face Sideways param is ON.
 *   1.4: Added plugin commands to add/remove slope regions during play.
 *        Added save data options to go with the plugin commands.
 *        Code restructure/rewrite for modularity/readability.
 *   1.3: Very minor fix for follower bunching on wide slopes.
 *   1.2: OverpassTile support! On overpass tiles, slope only if on higher level.
 *        Also made player/event touch triggers actually trigger on slopes...
 *   1.1: Mechanical rewrite. Now just put regions on passable slope tiles.
 *        Now also supports multiple up/down slope regions! \o/
 *        And offsets colliding triggers appropriately.
 *   1.0: Initial release.
 * 
 * @param Slope Up Regions
 * @text Slope Up Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region IDs for upward slopes /
 * @default []
 *
 * @param Slope Down Regions
 * @text Slope Down Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region IDs for downward slopes \
 * @default []
 *
 * @param Move Through
 * @text Move Through
 * @type boolean
 * @desc If true, slope moves force through on. Useful for narrow stairs. Same as Characters priority events still block.
 * @default true
 *
 * @param Face Sideways
 * @text Face Sideways
 * @type boolean
 * @desc If true, will prioritise side-facing directions when turning toward characters where x & y distances are equal.
 * @default true
 *
 * @param Add Save Data
 * @text Add Save Data
 * @type boolean
 * @desc If true, will add slope regions to save files.
 * @default false
 */

var Imported = Imported || {};			// Import namespace, var can redefine
Imported.Cae_SlopeMove = 1.4;			// Import declaration

var CAE = CAE || {};				// Author namespace, var can redefine
CAE.SlopeMove = CAE.SlopeMove || {};		// Plugin namespace

(function(_) {

'use strict';

	// Error message patterns
	const ERR_PRE = 'Cae_SlopeMove.js ';
	const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin is named correctly and try again.';
	const ERR_PCOM_SCOM = ERR_PRE + 'encountered unrecognised subcommand \'%1\' when attempting to process plugin command.';
	const ERR_PCOM_TYPE = ERR_PRE + 'encountered unrecognised slope type \'%1\' when attempting to process plugin command.';

	// Plugin command stuff
	const PCOM = 'SLOPEMOVE';		// Command name (uppercase)
	const PCOM_ADD = 'ADD';			// Subcommand names (uppercase)
	const PCOM_REM = 'REMOVE';

	// Names of properties used for saving/loading region data
	const SAVE_UP = 'slopeMoveRegionsUp';
	const SAVE_DN = 'slopeMoveRegionsDn';

	// UTILITY: use with Array.filter to remove duplicates
	_.uniqueOnly = function(e, i, arr) { return arr.indexOf(e) === i; };

// ========== Parameter stuff ========== //

	_.params = PluginManager.parameters('Cae_SlopeMove');
	if (_.params === undefined) throw new Error(ERR_NOPARAM);

	// Function because these may change at runtime via plugin commands etc
	_.initRegions = function() {
		_.rUp = (JSON.parse(_.params['Slope Up Regions'])   || []).map(Number).filter(_.uniqueOnly);
		_.rDn = (JSON.parse(_.params['Slope Down Regions']) || []).map(Number).filter(_.uniqueOnly);
	};

	_.initRegions();
	_.thru = _.params['Move Through'] === 'true';
	_.faceSide = _.params['Face Sideways'] === 'true';
	_.save = _.params['Add Save Data'] === 'true';

// ========== Core Utilities ========== //

	// Converts move direction d {4,6} and gradient m {1,-1} to Y direction {2,8} as appropriate
	_.getYMove = function(d, m) { return 5 + 3 * m * (d - 5); };	// Don't give me that look, it works flawlessly >_>

	// Converts input direction {2,4,6,8} to a tile offset
	_.dirToOffset = function(d) {
		switch (d) {
			case 4: case 8:	return -1;
			case 6: case 2:	return  1;
			default:	return  0;
		}
	};

	// Converts input offsets dx and dy to a facing direction
	// Bias to side-facing directions when offsets are equal
	_.getDirectionByOffset = function(dx, dy) {
		if (Math.abs(dy) > Math.abs(dx)) {
			return dy > 0 ? 8 : 2;
		} else {
			return dx > 0 ? 4 : 6;
		}
	};

	// Converts two input coordinate pairs to a direction (1 facing 2)
	// Biased to side-facing directions on equal x/y separation
	_.getDirectionByCoords = function(x1, y1, x2, y2) {
		let dx = $gameMap.deltaX(x1, x2);
		let dy = $gameMap.deltaY(y1, y2);
		return _.getDirectionByOffset(dx, dy);
	};

	// For compatibility with OverpassTile plugin
	_.isOverpassTile = function(x, y) {
		let tMap = SceneManager._scene._spriteset._tilemap;
		return tMap._isOverpassPosition(x, y);
	}

	// Convenience/readability
	_.isSlopeUp = function(regionId) { return _.rUp.contains(regionId); };
	_.isSlopeDn = function(regionId) { return _.rDn.contains(regionId); };

	// Requirement for applying diagonal movement: move direction left or right and non-zero slope gradient
	_.isSlopeMove = function(d, m) { return [4,6].contains(d) && m !== 0; };

	// Adds a region ID to the appropriate param array. Return value indicates whether operation was successful.
	_.addRegion = function(isUp, regionId) {
		let arr = isUp ? _.rUp : _.rDn;
		if (!arr.contains(regionId)) {
			arr.push(regionId);
			return true;
		}
		return false;
	};

	// Removes a region ID from the appropriate param array. Return value indicates whether operation was successful.
	_.removeRegion = function(isUp, regionId) {
		let arr = isUp ? _.rUp : _.rDn;
		let ix = arr.indexOf(regionId);
		if (ix > -1) {
			arr.splice(ix, 1);
			return true;
		}
		return false;
	};

	// Executes this plugin's plugin command
	_.parsePluginCommand = function(args) {
		let subcommand = args[0], isUp = String(args[1]), value = parseInt(args[2]);
		value = isNaN(value) ? 0 : value.clamp(0, 255);
		if (value > 0) {
			switch (isUp.toUpperCase()) {
				case 'UP': case 'U': case 'TRUE':
					isUp = true;
					break;
				case 'DOWN': case 'DN': case 'D': case 'FALSE':
					isUp = false;
					break;
				default:
					console.error(ERR_PCOM_TYPE.format(isUp));
					return false;
			}
			switch (subcommand.toUpperCase()) {
				case PCOM_ADD:
					return _.addRegion(isUp, value);
				case PCOM_REM:
					return _.removeRegion(isUp, value);
				default:
					console.error(ERR_PCOM_SCOM.format(subcommand));
			}
		}
		return false;
	};

// ============== Extends ============== //

	// New: check non-through events at target, true if no events or only below/above events
	Game_CharacterBase.prototype.isSlopeThru = function(x, y) {
		if (!_.thru) return false;			// Insta-nope if parameter ain't set
		return !this.isCollidedWithCharacters(x, y);	// Collide with characters (player, events, vehicles)
	}

	// New: gets slope move destination tile based on direction & slope gradient
	Game_CharacterBase.prototype.getSlopeNext = function(d, m) {
		return { x: $gameMap.roundXWithDirection(this.x, d),
			 y: $gameMap.roundYWithDirection(this.y, _.getYMove(d, m)) };
	}

	// New: returns gradient of slope: -1 (down), 0 (flat), or 1 (up)
	Game_CharacterBase.prototype.slopeCheck = function(d) {
		if (_.isOverpassTile(this.x, this.y) && !this._higherLevel) return 0;		// No slope moves under overpass
		if (!_.isSlopeMove(d)) return 0;						// Slope only in given direction
		let r0 = $gameMap.regionId(this.x, this.y);					// Get current tile region
		let tU = this.getSlopeNext(d,  1), tD = this.getSlopeNext(d, -1);		// Target up-/down-slope tiles
		let rU = $gameMap.regionId(tU.x, tU.y), rD = $gameMap.regionId(tD.x, tD.y);	// Target tiles' region IDs
		if (_.isSlopeUp(r0) && _.isSlopeUp(rU)) {					// If current and target are up
			return  1;								// Return 1 = up-slope
		} else if (_.isSlopeDn(r0) && _.isSlopeDn(rD)) {				// If current and target are down
			return -1;								// Return -1 = down-slope
		}
		return 0;									// Else zero, no slope
	};

// ============ Alterations ============ //

	// Aliased to force sideways moves to go diagonal if on a slope
	_.Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;	// Alias
	Game_CharacterBase.prototype.moveStraight = function(d) {
		let slope = this.slopeCheck(d);
		if (_.isSlopeMove(d, slope)) {						// If you're slopin' up or down
			this.setDirection(d);						// Make sure you're facing sideways
			let wasThru = this.isThrough();					// Remember if you're passin' thru
			let dest = this.getSlopeNext(d, slope);				// Get destination tile, too
			this.setThrough(wasThru || this.isSlopeThru(dest.x, dest.y));	// Something something through on
			this.moveDiagonally(d, _.getYMove(d, slope));			// Here's the diagonal move you were after!
			this.setThrough(wasThru);					// Restore original through flag
		} else {
			_.Game_CharacterBase_moveStraight.call(this, d);		// Else callback
		}
	};

	// On-slope event trigger: Touch
	_.Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
	Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
		_.Game_CharacterBase_moveDiagonally.call(this, horz, vert);
		if (!this.isMovementSucceeded()) {					// If move was blocked
			let dx = _.dirToOffset(horz), dy = _.dirToOffset(vert);		// Offsets from input directions
			let dest = { x: this.x + dx, y: this.y + dy };			// Get attempted move location
			if (this.isCollidedWithCharacters(dest.x, dest.y)) {		// If collided
				this.checkEventTriggerTouch(dest.x, dest.y);		// Check trigger
			}
		}
	};

	// On-slope event trigger: Touch (normal priority)
	_.Game_CharacterBase_checkEventTriggerTouchFront = Game_CharacterBase.prototype.checkEventTriggerTouchFront;
	Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
		let slope = this.slopeCheck(d);
		if (slope === 0) {
			_.Game_CharacterBase_checkEventTriggerTouchFront.call(this, d);
		} else {
			let dest = this.getSlopeNext(d, slope);
			if (this.isCollidedWithCharacters(dest.x, dest.y)) this.checkEventTriggerTouch(dest.x, dest.y);
		}
	};

	// On-slope event trigger: Action Button
	_.Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
	Game_Player.prototype.checkEventTriggerThere = function(triggers) {		// Checks for activating events on slope
		let d = this.direction();
		let slope = this.slopeCheck(d);
		if (slope === 0) {
			_.Game_Player_checkEventTriggerThere.call(this, triggers);
		} else {								// I'm on a slope!
			if (this.canStartLocalEvents()) {
				let dest = this.getSlopeNext(d, slope);
				this.startMapEvent(dest.x, dest.y, triggers, true);
			}
		}
	};

	// OVERRIDE (default+) to prevent follower glitches like bunching & teleporting
	Game_Player.prototype.moveStraight = function(d) {
		let slope = this.slopeCheck(d);
		if (!_.isSlopeMove(d, slope) && this.canPass(this.x, this.y, d)) {
			this._followers.updateMove();		// Default
		}
		Game_Character.prototype.moveStraight.call(this, d);
	};

	// If option set, prioritise sideways facing over front/back when abs(dx) = abs(dy) (e.g. when colliding on slope)
	_.Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
	Game_Character.prototype.turnTowardCharacter = function(character) {
		if (_.faceSide) {
			let d = _.getDirectionByCoords(this.x, this.y, character.x, character.y);
			this.setDirection(d);
		} else {
			_.Game_Character_turnTowardCharacter.call(this, character);
		}
	};

	// If option set, prioritise sideways facing over front/back when abs(dx) = abs(dy) (e.g. when colliding on slope)
	_.Game_Character_turnAwayFromCharacter = Game_Character.prototype.turnAwayFromCharacter;
	Game_Character.prototype.turnAwayFromCharacter = function(character) {
		if (_.faceSide) {
			let d = _.getDirectionByCoords(this.x, this.y, character.x, character.y);
			this.setDirection(this.reverseDir(d));
		} else {
			_.Game_Character_turnAwayFromCharacter.call(this, character);
		}
	};

	// Setup for new game
	_.DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		_.DataManager_createGameObjects.call(this);
		_.initRegions();
	}

	// Add to save data if flag set
	_.DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function() {
		let contents = _.DataManager_makeSaveContents.call(this);
		if (_.save) {
			contents[SAVE_UP] = _.rUp;
			contents[SAVE_DN] = _.rDn;
		}
		return contents;
	};

	// Set defaults, override with data from save file if found
	_.DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
		_.DataManager_extractSaveContents.call(this, contents);
		_.initRegions();
		let upData = contents[SAVE_UP] === undefined ? false : contents[SAVE_UP];
		let dnData = contents[SAVE_DN] === undefined ? false : contents[SAVE_DN];
		if (_.save && (upData || dnData)) {
			if (upData) _.rUp = upData;
			if (dnData) _.rDn = dnData;
		}
	};

	// Plugin command handler
	_.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toUpperCase() === PCOM) _.parsePluginCommand(args);
	};

})(CAE.SlopeMove);