//=============================================================================
// Looping Animations
// by Shaz
// Last Updated: 2015.10.30
//
// Revisions:
// 2015.10.30 Allow animations to play below/behind character
//=============================================================================

/*:
 * @plugindesc Allows animations on the map to loop
 * Also allows animations (normal or looping) to play below/behind characters
 * @author Shaz
 *
 * @help
 *
 * Plugin Command:
 *   LoopAnim start event animid   # Start a looping animation on an event
 *   LoopAnim stop event           # Stop animation loop
 *
 *   SetAnimLoc event location     # Set location of animation
 *
 *   event = number for specific event
 *   event = 0 for "this" event
 *   event = -1 for player
 *   event = $gameVariables.value(x) to get the event id from variable x
 *
 *   location = below or behind - play animation behind character sprite
 *   location = above or front - play animation in front of character sprite
 *              default is to play animation in front of character sprite
 */

(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'LOOPANIM') {
      var character = this.character(eval(args[1]));
      if (character) {
        switch (args[0].toUpperCase()) {
          case 'START':
            character.loopAnimStart(args[2]);
            break;
          case 'STOP':
            character.loopAnimStop();
        }
      }
    }

    if (command.toUpperCase() === 'SETANIMLOC') {
      var character = this.character(eval(args[0]));
      if (character) {
        character.setAnimLoc(args[1] || 'above');
      }
    }
  }

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._loopAnimId = 0;
    this._animZ = 8;
  };

  Game_CharacterBase.prototype.loopAnimStart = function(animId) {
    this._loopAnimId = animId;
    this.requestAnimation(animId);
  };

  Game_CharacterBase.prototype.loopAnimStop = function() {
    this._loopAnimId = 0;
  };

  Game_CharacterBase.prototype.setAnimLoc = function(location) {
    switch (location.toUpperCase()) {
      case 'BELOW':
      case 'BEHIND':
        this._animZ = 3;
        break;
      default:
        this._animZ = 8;
    }
  }

  Game_CharacterBase.prototype.animZ = function() {
    return this._animZ;
  }

  Sprite_Character.prototype.isAnimationPlaying = function() {
    if (this._animationSprites.length > 0) {
      result = true;
    } else if (this._character._loopAnimId > 0) {
      this._character.requestAnimation(this._character._loopAnimId);
      this.setupAnimation();
      this._animationSprites[this._animationSprites.length - 1].z = this._character.animZ();
      result = true;
    } else {
      result = false;
    };
    return result;
  };
})();