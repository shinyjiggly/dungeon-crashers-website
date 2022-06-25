//menuarea
let menuareaHTML = '<h2>Links</h2><ul> <li><a href="' + 'dungeon.html">What is a voidco dungeon?</a></li>' + 
'<li><a href="' + 'crashers.html">Meet the Dungeon Crashers (UNDER CONSTRUCTION!)</a></li>' +
'<li><a href="' + 'locations.html">Locations of Interest (UNDER CONSTRUCTION!)</a></li>' +
'<li><a href="' + 'pokemons.html">Pokemon Data (UNDER CONSTRUCTION!)</a></li>' +
'<li><a href="' + 'missions.html">Unfinished Missions</a></li>' +
'<li><a href="' + 'https://mspfa.com/?s=38989&p=1">None Pizza With Left Beef</a></li>' +
'<li><a href="' + 'https://charcherry-weekly.tumblr.com/">Charcherry Weekly</a></li>' +
'<li><a href="' + 'friend.html">look at my pokemon</a></li></ul>' +
'<hr><hr>' +
'<h2>The Duct-tape Zone</h2><ul> <li><a href="' + 'ooc_dtape.html">...Duct tape?</a></li>' + 
'<li><a href="' + 'ooc_pokencounter.html">Pokemon Encounter Generator</a></li>' +
'<li><a href="' + 'ooc_systems.html">Systems used for combat and such</a></li>' +
'<li><a href="' + 'https://letssosl.boards.net/thread/274/pokemon-world-mage-quest">Mage Quest</a></li>' +
'<li><a href="' + 'http://jingloria.wertercatt.com/oldsite/pichuinfo.htm">Pichu Quest (pre-scratch Mage Quest)</a></li>' +
'<li><a href="' + 'starterclock.html">Current Time</a></li>' +
'<li><a href="' + 'ooc_logs.html">Logs</a></li>' +
'<li><a href="' + 'http://jingloria.wertercatt.com/lostpawns/">Lost Pawns Website</a></li>' + 
'<li><a href="' + 'http://www.ifelse95.xyz/index.html">ifelse95\'s Website</a></li>' + 
'<li><a href="' + 'http://wertercatt.com/">wetercatt\'s Website</a></li>';

//icmenuarea
let icmenuareaHTML = '<h2>Links</h2><ul> <li><a href="' + 'dungeon.html">What is a voidco dungeon?</a></li>' + 
'<li><a href="' + 'crashers.html">Meet the Dungeon Crashers (UNDER CONSTRUCTION!)</a></li>' +
'<li><a href="' + 'locations.html">Locations of Interest (UNDER CONSTRUCTION!)</a></li>' +
'<li><a href="' + 'pokemons.html">Pokemon Data (UNDER CONSTRUCTION!)</a></li>' +
'<li><a href="' + 'missions.html">Unfinished Missions</a></li>' +
'<li><a href="' + 'https://mspfa.com/?s=38989&p=1">None Pizza With Left Beef</a></li>' +
'<li><a href="' + 'https://charcherry-weekly.tumblr.com/">Charcherry Weekly</a></li>' +
'<li><a href="' + 'friend.html">look at my pokemon</a></li></ul>' +
'<hr>' +
'<h2>Other Links</h2><ul> <li><a href="' + 'http://jingloria.wertercatt.com/">Jingloria Website</a></li>' + 
'<li><a href="' + 'desertia.robotics">Desertia Website</a></li>' +
'<li><a href="' + 'spaceport-mall.shop">Spaceport Website</a></li>' ;

//header
let headerHTML = '<a href="index.html"><img src="sitelogo.png" alt="SBARG 2.5: Dungeon Crashers"></a>' ;

//footer
let footerHTML = '<br><hr><br><p>site made by shinyJiggly, photos from Unsplash ((special thanks to ifelse95 and wertercatt))</p>' ;

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