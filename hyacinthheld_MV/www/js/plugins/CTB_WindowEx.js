/*=============================================================================
 * CTB WindowEx [Free Version]
 * By CT_Bolt
 * CTB_WindowEx.js
 * Version: 0.80
 * Terms of Use:
 *   Free to use commercial or non-commercial
 *   Credit would be nice.
 *
 *  Copyright [2020] [N. Giem] (Aka. CT_Bolt)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
/*=============================================================================*/
var CTB = CTB || {}; CTB.WindowEx  = CTB.WindowEx || {};
var Imported = Imported || {}; Imported["CT_Bolt WindowEx"] = 0.80;

/*~struct~arrow:
 * @param isVisible
 * @text Displayed?
 * @desc Is the arrow displayed?
 * Default: 
 * @default 
 *
 */

/*~struct~arrows: 
 * @param Down Arrow
 * @text Down
 * @type struct<arrow>
 * @desc Down Arrow
 * Default: maxTopRow > 0 && topRow < maxTopRow
 * @default
 *
 * @param Left Arrow
 * @text Left
 * @type struct<arrow>
 * @desc Left Arrow
 * Default: maxTopCol > 0 && topCol < maxTopCol
 * @default
 *
 * @param Right Arrow
 * @text Right
 * @type struct<arrow>
 * @desc Right Arrow
 * Default: topCol > 0
 * @default 
 *
 * @param Up Arrow
 * @text Up
 * @type struct<arrow>
 * @desc Up Arrow
 * Default: topRow > 0
 * @default 
 *
 */

/*~struct~fontSettings:
 * @param Font Face
 * @text Font File
 * @desc Font File (ex. 'mplus-1m-regular')
 * @default 
 *
 * @param Font Ext
 * @text Font Extension
 * @desc Font Extension (ex. 'ttf')
 * @default 'ttf'
 *
 */

/*~struct~tone:
 * @param Red 
 * @text Red 
 * @type number
 * @min 0
 * @max 255
 * @desc Red (0 - 255)  
 * @default 0
 *
 * @param Green
 * @text Green
 * @type number
 * @min 0
 * @max 255
 * @desc Green (0 - 255)  
 * @default 0
 *
 * @param Blue
 * @text Blue 
 * @type number
 * @min 0
 * @max 255
 * @desc Blue (0 - 255)  
 * @default 0
 */

/*~struct~windowSettings:
 * @param Window Name
 * @text Window Name
 * @desc Window Name 
 * Parentheses = Scene Containing Window (default ones)
 * @type select
 * @option Actor Command (Battle)
 * @value Window_ActorCommand
 * @option Battle Actor (Battle)
 * @value Window_BattleActor
 * @option Battle Enemy (Battle)
 * @value Window_BattleEnemy
 * @option Battle Item (Battle)
 * @value Window_BattleItem
 * @option Battle Log (Battle)
 * @value Window_BattleLog
 * @option Battle Skill (Battle)
 * @value Window_BattleSkill
 * @option Battle Status (Battle)
 * @value Window_BattleStatus
 * @option Choice List (Battle, Map)
 * @value Window_ChoiceList
 * @option Command (Map)
 * @value Window_Command
 * @option Debug Edit (Debug)
 * @value Window_DebugEdit
 * @option Debug Range (Debug)
 * @value Window_DebugRange
 * @option Equip Command (Equip)
 * @value Window_EquipCommand
 * @option Equip Item (Equip)
 * @value Window_EquipItem
 * @option Equip Slot (Equip)
 * @value Window_EquipSlot
 * @option Equip Status (Equip)
 * @value Window_EquipStatus
 * @option Event Item (Battle, Map)
 * @value Window_EventItem
 * @option Game End (GameEnd)
 * @value Window_GameEnd
 * @option Gold (Battle, Map, Menu, Shop)
 * @value Window_Gold
 * @option Help (Battle, File, Menu)
 * @value Window_Help
 * @option Item Category (Item, Shop)
 * @value Window_ItemCategory
 * @option Item List (Item)
 * @value Window_ItemList
 * @option Map Name (Map)
 * @value Window_MapName
 * @option Menu Actor (Menu)
 * @value Window_MenuActor
 * @option Menu Command (Menu)
 * @value Window_MenuCommand
 * @option Menu Status (Menu)
 * @value Window_MenuStatus
 * @option Message (Battle, Map)
 * @value Window_Message
 * @option Name Box (Map)
 * @value Window_NameBox
 * @option Name Edit (Name)
 * @value Window_NameEdit
 * @option Name Input (Name)
 * @value Window_NameInput
 * @option Number Input (Battle, Map)
 * @value Window_NumberInput
 * @option Options (Options)
 * @value Window_Options
 * @option Party Command (Battle)
 * @value Window_PartyCommand
 * @option Save File List (File)
 * @value Window_SavefileList
 * @option Scroll Text (Battle, Map)
 * @value Window_ScrollText
 * @option Shop Buy (Shop)
 * @value Window_ShopBuy
 * @option Shop Command (Shop)
 * @value Window_ShopCommand
 * @option Shop Number (Shop)
 * @value Window_ShopNumber
 * @option Shop Sell (Shop)
 * @value Window_ShopSell
 * @option Shop Status (Shop)
 * @value Window_ShopStatus
 * @option Skill List (Skill)
 * @value Window_SkillList
 * @option Skill Status (Skill)
 * @value Window_SkillStatus
 * @option Skill Type (Skill)
 * @value Window_SkillType
 * @option Status (Status)
 * @value Window_Status
 * @option Title Command (Title)
 * @value Window_TitleCommand
 * Default: Window_Message
 * @default Window_Message
 *
 * @param Scene Name
 * @text Scene Name
 * @type select
 * @option Battle
 * @value Scene_Battle
 * @option Debug
 * @value Scene_Debug
 * @option Equip
 * @value Scene_Equip
 * @option File
 * @value Scene_File
 * @option Game End
 * @value Scene_GameEnd
 * @option Gameover
 * @value Scene_Gameover
 * @option Item
 * @value Scene_Item
 * @option Load
 * @value Scene_Load
 * @option Map
 * @value Scene_Map
 * @option Menu
 * @value Scene_Menu
 * @option Name
 * @value Scene_Name
 * @option Options
 * @value Scene_Options
 * @option Save
 * @value Scene_Save
 * @option Shop
 * @value Scene_Shop
 * @option Skill
 * @value Scene_Skill
 * @option Status
 * @value Scene_Status
 * @option Title
 * @value Scene_Title
 * @desc Scene Name
 * Default: Scene_Map
 * @default Scene_Map
 *
 * @param Image File
 * @text Image File
 * @type file
 * @desc Image File
 * Default: img/system/Window
 * @default img/system/Window
 *
 * @param Font
 * @text Font
 * @type struct<fontSettings>
 * @desc Font Settings
 * Default: 
 * @default
 *
 * @param Dimmed Opacity
 * @text Dimmed Opacity
 * @desc Dimmed opacity of the the windows background. (0-255) 
 * Note: This is an eval statement.
 * Default: 192
 * @default 192
 *
 * @param Tone 
 * @text Tone
 * @type struct<tone>
 * @desc Tone (Red, Green, Blue)
 * Default:
 * @default 
 *
 * @param Arrows
 * @text Arrows
 * @type struct<arrows>
 * @desc Arrow Settings
 * Default: 
 * @default 
 *
 */

//=============================================================================
/*:
 * @plugindesc CT_Bolt's WindowEx System v0.80
 * @author CT_Bolt
 *
 * @param ---Main Settings---
 * @text Main Settings
 *
 * @param Window Settings
 * @text Window Settings
 * @type struct<windowSettings>[]
 * @parent ---Main Settings---
 * @desc Window Settings
 * @default
 *
 * @help
 *
 * CT_Bolt's WindowEx
 * Version 0.80
 
 * CT_Bolt
 *
 * ***************** Description **********************
 * Customizable Windows! Yay!
 *
 * ****************** How to Use **********************
 * Adjust Parameters to Suit your needs.
 * 
 * How to change skin In-Game:
 *  In the Parameter "Image File" use the following:
 *       eval:CTB.WindowEx.customSkin(file, id)
 *
 *	   Example:
 *       eval:CTB.WindowEx.customSkin("img/system/NewWindowFilename", "Window_MapMessage")
 *
 *  Then to change use the script call:
 *		CTB.WindowEx.customSkinValue[id] = "'filename'"
 *
 *     Example:
 *		CTB.WindowEx.customSkinValue["Window_MapMessage"] = "'img/pictures/FunWindow'"
 *
 * ****************************************************
 * History Log:
 *    v0.20 Alpha Release (01/25/2020)
 *    v0.30 Added more features (01/25/2020)
 *    v0.40 Even more features (tone, dimmed opacity, arrows [animated])  (01/26/2020)
 *    v0.50 Features (tone, dimmed opacity, arrows [animated])  (01/26/2020)
 *    v0.60 Major Fix (Duplicate Window Names now can be used for multiple scenes) (02/01/2020)
 *    v0.70 Added Feature (Custom Font! Yay!) Bugfixes too.(02/07/2020)
 *    v0.80 Added Sub-Feature (Can now separate  window settings with any text) (02/10/2020)
 *
 */

//=============================================================================
// Parameter Variables
//=============================================================================
CTB.Parameters = PluginManager.parameters('CTB_WindowEx');
CTB.Param = CTB.Param || {};

CTB.Param.WindowEx = CTB.Param.WindowEx || {};
CTB.Param.WindowEx.sceneSettings = [];

// Core
String.prototype.isJSON = function(){if (/^[\],:{}\s]*$/.test(this.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {return true;}return false;}

var tempSettings = CTB.Parameters['Window Settings'] ? (JSON.parse(CTB.Parameters['Window Settings']) || []) : [];
tempSettings.forEach(function(i){
	if (i.isJSON()){
		CTB.Param.WindowEx.sceneSettings[JSON.parse(i)["Window Name"].replace('\r','')] = JSON.parse(i);
		CTB.Param.WindowEx.sceneSettings[JSON.parse(i)["Window Name"].replace('\r','')] = CTB.Param.WindowEx.sceneSettings[JSON.parse(i)["Window Name"].replace('\r','')] || {};
		CTB.Param.WindowEx.sceneSettings[JSON.parse(i)["Window Name"].replace('\r','')][JSON.parse(i)["Scene Name"].replace('\r','')] = JSON.parse(i);
		var font = JSON.parse(i)['Font'] || "0";
		var ext = (eval(JSON.parse(font)['Font Ext']) !== undefined) ? '.'+eval(JSON.parse(font)['Font Ext']) || '.ttf' : '.ttf';

		if (eval(JSON.parse(font)['Font Face']) !== undefined){
			Graphics.loadFont(eval(JSON.parse(font)['Font Face']), window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/fonts/' + eval(JSON.parse(font)['Font Face'])+ext);
		}
	}
});
	
	//=============================================================================
	// Game_Interpreter
	//=============================================================================
    // New
    Game_Interpreter.prototype.changeWindowskinEx = function(a, b) {
        var name = String(a || 'Window');
		$gameSystem.windowEx  = $gameSystem.windowEx || {};
		$gameSystem.windowEx[b]=$gameSystem.windowEx[b] || {};
		
		if (name){
			$gameSystem.windowEx[b].skinName = name;
			ImageManager.loadSystem(name);
			this.setWaitMode('image');
		}
		
    };
	//=============================================================================
	// Game_Interpreter: End
	//=============================================================================
	
	//=============================================================================
	// Scene_Boot
	//=============================================================================
	// Alias
	var _sb_lswi_ctb_winCustom = Scene_Boot.prototype.loadSystemWindowImage;
	Scene_Boot.prototype.loadSystemWindowImage = function() {
		_sb_lswi_ctb_winCustom.call(this);			
		for (var v in CTB.Param.WindowEx.sceneSettings) {
			if (Object.prototype.hasOwnProperty.call(CTB.Param.WindowEx.sceneSettings, v)) {
				var i = CTB.Param.WindowEx.sceneSettings[v]['Image File'];		
				if (i.toLowerCase().startsWith('eval:')){
					i = i.replace(/eval:/i, '');	
					ImageManager.reserveNormalBitmap(eval(i)+'.png');
				}else{
					ImageManager.reserveNormalBitmap(i+'.png');
				}
				
				
			}
		}
	};
	//=============================================================================
	// Scene_Boot: End
	//=============================================================================
	
	//=============================================================================
	// Window
	//=============================================================================
	// Alias
	var _w_i_ctb_winArrows = Window.prototype.initialize; Window.prototype.initialize = function() {
	  _w_i_ctb_winArrows.call(this);
	  this.leftArrowVisible = false;
	  this.rightArrowVisible = false;
	};


	// Alias
	var _w_cap_ctb_winArrows = Window.prototype._createAllParts; Window.prototype._createAllParts = function() {
	  _w_cap_ctb_winArrows.call(this);
	  this._leftArrowSprite = new Sprite();
	  this._rightArrowSprite = new Sprite();
	  this._leftArrowSprite.visible = false;
	  this._rightArrowSprite.visible = false;
	  this.addChild(this._leftArrowSprite);
	  this.addChild(this._rightArrowSprite);
	};

	// Alias
	var _w_ra_ctb_winArrows = Window.prototype._refreshArrows; Window.prototype._refreshArrows = function() {
	  _w_ra_ctb_winArrows.call(this);

	  var w = this._width, h = this._height;
	  var p = 24;
	  var q = p / 2;
	  var sx = 96 + p, sy = p;

	  this._leftArrowSprite.bitmap = this._windowskin;
	  this._leftArrowSprite.anchor.x = 0.5;
	  this._leftArrowSprite.anchor.y = 0.5;
	  this._leftArrowSprite.setFrame(sx, sy+q, q, p);
	  this._leftArrowSprite.move(q, h/2);
	  this._rightArrowSprite.bitmap = this._windowskin;
	  this._rightArrowSprite.anchor.x = 0.5;
	  this._rightArrowSprite.anchor.y = 0.5;
	  this._rightArrowSprite.setFrame(sx+p+q, sy+q, q, p);
	  this._rightArrowSprite.move(w-q, h/2);

	  // Set Original Location
	  this._downArrowSprite.originalx = this._downArrowSprite.x;
	  this._downArrowSprite.originaly = this._downArrowSprite.y;
	  this._leftArrowSprite.originalx = this._leftArrowSprite.x;
	  this._leftArrowSprite.originaly = this._leftArrowSprite.y;
	  this._rightArrowSprite.originalx = this._rightArrowSprite.x;
	  this._rightArrowSprite.originaly = this._rightArrowSprite.y;
	  this._upArrowSprite.originalx = this._upArrowSprite.x;
	  this._upArrowSprite.originaly = this._upArrowSprite.y;

	  this._downArrowSprite.isDirStarted = false;
	  this._leftArrowSprite.isDirStarted = false;
	  this._rightArrowSprite.isDirStarted = false;
	  this._upArrowSprite.isDirStarted = false;
	};

	var _w_rb_ctb_winArrows = Window.prototype._refreshBack; Window.prototype._refreshBack = function() {
		if (this.isItWindowEx("Tone")){
			var m = this._margin;
			var w = this._width - m * 2;
			var h = this._height - m * 2;
			var bitmap = new Bitmap(w, h);

			this._windowBackSprite.bitmap = bitmap;
			this._windowBackSprite.setFrame(0, 0, w, h);
			this._windowBackSprite.move(m, m);

			if (w > 0 && h > 0 && this._windowskin) {
				var p = 96;
				bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
				for (var y = 0; y < h; y += p) {
					for (var x = 0; x < w; x += p) {
						bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
					}
				}
				
				var tone = JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]["Tone"]);
				
				this._colorTone = [eval(tone['Red']), eval(tone['Green']), eval(tone['Blue'])] || this._colorTone;				
				tone = this._colorTone;
				bitmap.adjustTone(tone[0], tone[1], tone[2]);
			}
			
		}else{
			_w_rb_ctb_winArrows.call(this);
		}
	};

	// New
	Window.prototype._updateSpriteMovement = function(spr, min, max, xory, mode, spd, amnt, center, startDir1) {
		
	// Set Defaults
	min = min || 0;
	max = max || 0;
	spd = spd ? eval(spd) : 1;
	amnt = amnt ? eval(amnt) : 1;
	xory = xory || 'x';
	mode = mode || 'oscillation';
	center = (center === true) ? spr['original'+xory] : center || 0;

	spr[String(mode)] = spr[String(mode)] || {};
	if (startDir1 && !spr.isDirStarted) {spr[String(mode)].isDir1 = true; spr.isDirStarted = true;}
	spr[String(mode)].countAmount = spr[String(mode)].countAmount || spd;
	spr[String(mode)].count = spr[String(mode)].count || 0; spr[String(mode)].count++;
	if (spr[String(mode)].count > spr[String(mode)].countAmount) {spr[String(mode)].count = 0; spr[String(mode)].canMove = true;}
	if (spr[String(mode)].canMove){
		spr[String(mode)].canMove = false;
		if (mode.toLowerCase().includes('oscillation')){
			spr[String(mode)].isDir1 ? spr[String(xory)] = spr[String(xory)] + amnt : spr[String(xory)] = spr[String(xory)] - amnt;
			if (spr[String(xory)] <= center+min) {spr[String(mode)].isDir1 = true;}
			if (spr[String(xory)] >= center+max){spr[String(mode)].isDir1 = false;}
		}
	  }
	}

	var _w_tr_ctb_winArrows = Window.prototype.topRow || function(){return null;}; Window.prototype.topRow = function() {return _w_tr_ctb_winArrows.call(this);}
	var _w_mtr_ctb_winArrows = Window.prototype.maxTopRow || function(){return null;}; Window.prototype.maxTopRow = function() {return _w_mtr_ctb_winArrows.call(this);}

	// Alias
	var _w_ua_ctb_winArrows = Window.prototype._updateArrows; Window.prototype._updateArrows = function() {
		_w_ua_ctb_winArrows.call(this);
		var topRow = this.topRow(), maxTopRow = this.maxTopRow();
		
		// Movement
		this._updateSpriteMovement(this._downArrowSprite,  -4,  4, 'y', null, null, null, true, true);
		this._updateSpriteMovement(this._leftArrowSprite,  -4,  4, 'x', null, null, null, true);
		this._updateSpriteMovement(this._rightArrowSprite, -4,  4, 'x', null, null, null, true, true);
		this._updateSpriteMovement(this._upArrowSprite,    -4,  4, 'y', null, null, null, true);

		// Visibility	  		
		if (this.isItWindowEx("Arrows")) {if (JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Left Arrow']) this._leftArrowSprite.visible  = eval(JSON.parse(JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Left Arrow']).isVisible)}
		if (this.isItWindowEx("Arrows")) {if (JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Right Arrow']) this._rightArrowSprite.visible = eval(JSON.parse(JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Right Arrow']).isVisible)}
		if (this.isItWindowEx("Arrows")) {if (JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Down Arrow'])this._downArrowSprite.visible = eval(JSON.parse(JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Down Arrow']).isVisible)}
		if (this.isItWindowEx("Arrows")) {if (JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Up Arrow'])this._upArrowSprite.visible  = eval(JSON.parse(JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Arrows'])['Up Arrow']).isVisible)}
	
	};

	//=============================================================================
	// Window: End
	//=============================================================================

	//=============================================================================
	// Window_Base
	//=============================================================================
	
	// Alias
	var _wb_cc_ctb = Window_Base.prototype.createContents; Window_Base.prototype.createContents = function() {
	  _wb_cc_ctb.call(this);	  
	};
	
    // New
	Window_Base.prototype.changeWindowskinEx = function(a) {
		var skinPropName = "Image File";

		a = a || CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][skinPropName];
		$gameSystem.windowEx[this.constructor.name] = $gameSystem.windowEx[this.constructor.name] || {};
		$gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name] = $gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name] || {};
		$gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name].skinName = a;
		if ($gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name].skinName) {
			if (this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] !== $gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name].skinName) {
				this.loadWindowskinEx($gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name].skinName);
			}
		}		
	};
	
	// New	
	Window.prototype.isItWindowEx = function(a) {
		if (CTB.Param.WindowEx.sceneSettings[this.constructor.name]){
			if (CTB.Param.WindowEx.sceneSettings[this.constructor.name] !== undefined){
				if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]){
					if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name] !== undefined){
						if (a){
							if (a==='Tone'){
								if (!CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][a]){
									CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][a] = '{"Red":"0","Green":"0","Blue":"0"}'
								};
							};
							if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][a]){
								if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][a] !== undefined) {						
									return true;						
								}
							}
						}else{
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	
	// Old
	Window.prototype.isItWindowEx_old = function(a) {
		if (CTB.Param.WindowEx.sceneSettings[this.constructor.name]){
			if (CTB.Param.WindowEx.sceneSettings[this.constructor.name] !== undefined){
				if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]["Scene Name"]){
					if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]["Scene Name"] === SceneManager._scene.constructor.name){								
						if (a){
							if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][a]){
								if (CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name][a] !== undefined) {						
									return true;						
								}
							}
						}else{
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	
    // New
    Window_Base.prototype.loadWindowskinEx = function(a) {
		this._windowskinName = this._windowskinName || {};
		this._windowskinName[this.constructor.name] = this._windowskinName[this.constructor.name] || {};
		this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] = this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] || {};
		
        this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] = a || $gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name].skinName || 'Window';
		var i = this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name];

		if (i){
			if (i.toLowerCase().startsWith('eval:')){
				i = i.replace(/eval:/i, '');	
				this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] = eval(i);
				this.windowskin = ImageManager.loadNormalBitmap(eval(i)+'.png');
			}else{
				this.windowskin = ImageManager.loadNormalBitmap(i+'.png');
			}
		}
    };
	
	// New
    CTB.WindowEx.customSkin = function(d, id){		
		d = d || "img/system/Window";
		id = String(id) || 0;
		CTB.WindowEx.customSkinValue = CTB.WindowEx.customSkinValue || [];
		return CTB.WindowEx.customSkinValue[id] ? eval(CTB.WindowEx.customSkinValue[id]) : d;
	};
	
	var _WindowBase_drawText_ctb_customFont = Window_Base.prototype.drawText;
	Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
		if (this.isItWindowEx("Font")) {
			if (JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Font'])['Font Face']) {
				if (eval(JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Font'])['Font Face']) !== undefined){this.contents.fontFace = eval(JSON.parse(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]['Font'])['Font Face']);}
			}
		}
		_WindowBase_drawText_ctb_customFont .apply(this, arguments);
	};

	// New
	Window_Base.prototype.windowEx_DimmedOpacity = function() {
		return eval(CTB.Param.WindowEx.sceneSettings[this.constructor.name][SceneManager._scene.constructor.name]["Dimmed Opacity"]);
	};

	// Alias
	var _wb_sbo_ctb = Window_Base.prototype.standardBackOpacity; Window_Base.prototype.standardBackOpacity = function() {
		return this.isItWindowEx("Dimmed Opacity") ? this.windowEx_DimmedOpacity() : _wb_sbo_ctb.call(this);
	};

    // Alias
    var _wb_u_ctb = Window_Base.prototype.update; Window_Base.prototype.update = function() {
		_wb_u_ctb.call(this);
		$gameSystem.windowEx  = $gameSystem.windowEx || {};
		$gameSystem.windowEx[this.constructor.name] = $gameSystem.windowEx[this.constructor.name] || {}
		$gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name] = $gameSystem.windowEx[this.constructor.name][SceneManager._scene.constructor.name] || {};
		
		// Window Skin
		this._windowskinName = this._windowskinName || {};
		this._windowskinName[this.constructor.name] = this._windowskinName[this.constructor.name] || {};	 	  
		this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] = this._windowskinName[this.constructor.name][SceneManager._scene.constructor.name] || {};	 	  
		
		if (this.isItWindowEx("Image File")) {this.changeWindowskinEx();}

    };	
	//=============================================================================
	// Window_Base: End
	//=============================================================================