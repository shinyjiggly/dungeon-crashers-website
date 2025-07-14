/*:
 * @target MV MZ
 * @plugindesc Faster balloons!
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/160722/
 * @help Free to use and/or modify for any project, no credit required.
 */

// Override! Reduce time between balloon anim updates.
Sprite_Balloon.prototype.speed = function() {
  return 3;  // originally 8
};

// Override! Increase wait time for final balloon anim stage.
Sprite_Balloon.prototype.waitTime = function() {
  return 40;  // originally 12
};

