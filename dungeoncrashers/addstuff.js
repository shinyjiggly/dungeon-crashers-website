//menuarea
let menuareaHTML = '<h2>Links</h2>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/index.html">Main page</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/dungeon.html">What is a voidco dungeon?</a><br>' + 
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/crashers.html">Meet the Dungeon Crashers </a> <img src="construct.png" title="Under Construction!" /><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/locations.html">Locations of Interest</a> <img src="construct.png" title="Under Construction!" /><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/pokemons.html">Starter Online Pokedex</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/missions.html">Unfinished Missions</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/leftbeef.html">None Pizza With Left Beef</a><br>' +
'<a href="' + 'https://charcherry-weekly.tumblr.com/">Charcherry Weekly</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/friend.html">look at my pokemon</a><br>' +
'<hr><hr>' +
'<h2>The Duct-tape Zone</h2><a href="' + 'ooc_dtape.html">...Duct tape?</a><br>' + 
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/ooc_pokencounter.html">Pokemon Encounter Generator</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/ooc_systems.html">Systems used for combat and such</a><br>' +
'<a href="' + 'https://letssosl.boards.net/">Let\'s SOSL Forums</a><br>' +
'<a href="' + 'http://jingloria.wertercatt.com/oldsite/pichuinfo.htm">Pichu Quest (pre-scratch Mage Quest)</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/starterclock.html">Current Time</a><br>' +
'<a href="' + 'https://discord.gg/Ykh6hrf">Join our discord server!</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/ooc_logs.html">Logs</a><br>' +
'<a href="' + 'http://jingloria.wertercatt.com/lostpawns/">Lost Pawns Website</a><br>' + 
'<a href="' + 'http://www.ifelse95.xyz/index.html">ifelse95\'s Website</a><br>' + 
'<a href="' + 'http://wertercatt.com/">wetercatt\'s Website</a><br>';

//icmenuarea
let icmenuareaHTML = '<h2>Links</h2><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/index.html">Main page</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/dungeon.html">What is a voidco dungeon?</a><br>' + 
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/crashers.html">Meet the Dungeon Crashers </a> <img src="construct.png" title="Under Construction!" /><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/locations.html">Locations of Interest</a> <img src="construct.png" title="Under Construction!" /><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/pokemons.html">Starter Online Pokedex</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/missions.html">Unfinished Missions</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/leftbeef.html">None Pizza With Left Beef</a><br>' +
'<a href="' + 'https://charcherry-weekly.tumblr.com/">Charcherry Weekly</a><br>' +
'<a href="' + '/dungeon-crashers-website/dungeoncrashers/friend.html">look at my pokemon</a><br>' +
'<hr>' +
'<h2>Other Links</h2><a href="' + 'http://jingloria.wertercatt.com/">Jingloria Website</a><br>' + 
'<a href="' + 'desertia.robotics">Desertia Website</a><br>' +
'<a href="' + 'spaceport-mall.shop">Spaceport Website</a><br>' ;

//header
let headerHTML = '<a href="index.html"><img src="/dungeon-crashers-website/dungeoncrashers/sitelogo.png" alt="SBARG 2.5: Dungeon Crashers"></a>' ;

//footer
let footerHTML = '<br><hr><br><p>site made by shinyJiggly, photos from Unsplash, special thanks to ifelse95 and wertercatt</p>' ;

//check icMode
const urlParams = new URLSearchParams(document.location.search.substring(1));
var icMode = urlParams.get('icMode');
if (typeof icMode === 'object') {
	var icMode = 'False';
}


//teh elements
if (document.getElementById("menuarea") && icMode === 'False') {
  document.getElementById("menuarea").innerHTML = menuareaHTML;
}

if (document.getElementById("menuarea") && icMode === 'True') {
  document.getElementById("menuarea").innerHTML = icmenuareaHTML;
}

if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}

if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}