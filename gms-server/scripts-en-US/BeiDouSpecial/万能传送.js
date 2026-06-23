/* ==================
 Script type: Universal Teleport
 Script author: Hamburger
 Contact: BeiDou Project Team
 =====================
 */
//------------------------------------------------------------------------
var bossmaps = Array(			
		Array(230040420,380000,"Pianus #r(costs 380,000 mesos)#k"),
		Array(220080000,380000,"Papulatus #r(costs 380,000 mesos)#k"),
		Array(211042300,380000,"Zakum #r(costs 380,000 mesos)#k"),
        Array(702070400,380000,"Bishop #r(costs 380,000 mesos)#k"),
        Array(541020700,380000,"Nine-Tailed Fox #r(costs 380,000 mesos)#k"),
        Array(105100100,380000,"Crimson Balrog #r(costs 380,000 mesos)#k"),
		Array(240040700,380000,"Horntail #r(costs 380,000 mesos)#k"),
        Array(270000100,380000,"Pink Bean #r(costs 380,000 mesos)#k")
		);
//------------------------------------------------------------------------

var monstermaps = Array(
		Array(104040000,500,"Archer Training Ground #r(500 mesos)#k #gLv 1 ~ 15#k"),
		Array(101010100,580,"The Tree That Grew II #r(580 mesos)#k #gLv 8 ~ 15#k"),
        Array(103000101,680,"Subway <Line 1, Area 1> #r(680 mesos)#k #gLv 20 ~ 25#k"),
		Array(220010500,780,"Terrace Hall #r(780 mesos)#k #gLv 25 ~ 30#k"),
		Array(101030001,880,"Wild Boar Land II #r(880 mesos)#k #gLv 25 ~ 35#k"),
		Array(103000105,980,"Subway <Line 1, Area 4> #r(980 mesos)#k #gLv 35 ~ 50#k"),
		Array(100040103,1080,"Monkey Forest II #r(1,080 mesos)#k #gLv 35 ~ 50#k"),
		Array(220040000,1180,"The Road of Time 1 #r(1,180 mesos)#k #gLv 45 ~ 60#k"),
		Array(105040306,1280,"Forest of the Giants #r(1,280 mesos)#k #gLv 50 ~ 65#k"),
		Array(250010304,2280,"The Nest of the Wandering Bear #r(2,280 mesos)#k #gLv 55 ~ 75#k"),
		Array(251010402,2380,"Pirate Den 2 #r(2,380 mesos)#k #gLv 65 ~ 75#k"),
		Array(541010010,2580,"Ghost Ship 2 #r(2,580 mesos)#k #gLv 60 ~ 80#k"),
		Array(600020300,2680,"Tarantula Cave #r(2,680 mesos)#k #gLv 80 ~ 90#k"),
		Array(240010500,2780,"Goat Canyon #r(2,780 mesos)#k #gLv 85 ~ 100#k"),
		Array(230040100,2880,"Deep Sea Gorge 2 #r(2,880 mesos)#k #gLv 90 ~ 100#k"),
		Array(551030100,2980,"Entrance to the Eerie World #r(2,980 mesos)#k #gLv 95 ~ 120#k"),
		Array(240030102,3080,"The Lost Forest #r(3,080 mesos)#k #gLv 100 ~ 120#k"),
		Array(240040511,3280,"The Forgotten Dragon's Nest #r(3,280 mesos)#k #gLv 105 ~ 130#k"),
		Array(541020000,3580,"Entrance to Ulu City #r(3,580 mesos)#k #gLv 105 ~ 150#k")
		); 

//------------------------------------------------------------------------		

//------------------------------------------------------------------------

var townmaps = Array(
		//Array(910000000,520,"Free Market#r             (costs 520 mesos)#b"),
		//Array(701000210,0,"Big Arena"),
		//Array(1000000,100,"Maple Island Beginner Town#r         (costs 100 mesos)#b"),
		Array(104000000,500,"Lith Harbor #r(costs 500 mesos)#k"),
		Array(100000000,800,"Henesys #r(costs 800 mesos)#k"),
		Array(101000000,800,"Ellinia #r(costs 800 mesos)#k"),
		Array(102000000,800,"Perion #r(costs 800 mesos)#k"),
		Array(103000000,800,"Kerning City #r(costs 800 mesos)#k"),
		Array(120000000,800,"Nautilus Harbor #r(costs 800 mesos)#k"),
		Array(105040300,1000,"Sleepywood #r(costs 1,000 mesos)#k"),
		Array(140000000,1000,"Rien #r(costs 1,000 mesos)#k"),
		Array(200000000,1000,"Orbis #r(costs 1,000 mesos)#k"),
		Array(211000000,5000,"El Nath #r(costs 5,000 mesos)#k"),
		Array(230000000,1000,"Aquarium #r(costs 1,000 mesos)#k"),
		Array(222000000,1000,"Ludibrium Fairy Village #r(costs 1,000 mesos)#k"),
		Array(220000000,5000,"Ludibrium #r(costs 5,000 mesos)#k"),
		Array(701000000,5000,"Mu Lung #r(costs 5,000 mesos)#k"),
		Array(250000000,5000,"Mu Lung #r(costs 5,000 mesos)#k"),
		Array(702000000,1000,"Herb Town #r(costs 1,000 mesos)#k"),
		//Array(500000000,500,"Thailand#r                 (costs 500 mesos)#b"),
		Array(260000000,500,"Ariant #r(costs 500 mesos)#k"),
		Array(600000000,500,"Ellin Forest #r(costs 500 mesos)#k"),
		Array(240000000,5000,"Leafre #r(costs 5,000 mesos)#k"),
		Array(261000000,1000,"Magatia #r(costs 1,000 mesos)#k"),
		Array(221000000,1000,"Omega Sector #r(costs 1,000 mesos)#k"),
		Array(251000000,1000,"Herb Garden #r(costs 1,000 mesos)#k"),
		Array(701000200,10000,"Shanghai Yu Garden #r(costs 10,000 mesos)#k"),
		Array(550000000,10000,"Kuala Lumpur #r(costs 10,000 mesos)#k"),
		Array(130000000,1000,"Sanctuary #r(costs 1,000 mesos)#k"),
		Array(551000000,1000,"Kampung Village #r(costs 1,000 mesos)#k"),
		Array(801000000,1000,"Showa Town #r(costs 1,000 mesos)#k"),
		Array(540010000,1000,"Singapore Airport #r(costs 1,000 mesos)#k"),
		Array(541000000,1000,"Singapore Harbor #r(costs 1,000 mesos)#k"),
		Array(300000000,1000,"Ellin Forest #r(costs 1,000 mesos)#k"),
		Array(270000100,10000,"Temple of Time #r(costs 10,000 mesos)#k"),
		Array(702100000,10000,"Scripture Library #r(costs 10,000 mesos)#k"),
		Array(800000000,10000,"Ancient Shrine #r(costs 10,000 mesos)#k"),
		Array(130000200,10000,"Sanctuary Crossroads #r(costs 10,000 mesos)#k"),
		Array(925020000,1000,"Mu Lung Dojo Entrance #r(costs 1,000 mesos)#k"),
		Array(930000000,5000,"Poison Fog Forest #r(costs 5,000 mesos)#k"),
		Array(930000010,1000,"Forest Entrance #r(costs 1,000 mesos)#k"),
		//Array(702090101,1000,"English Village#r               (costs 1,000 mesos)#b"),
		//Array(700000000,10000,"Hongluan Palace#r               (costs 10,000 mesos)#b")
		//Array(749020000,0,"National Day Cake Map")
		);

//------------------------------------------------------------------------

var fubenmaps = Array(
        Array(109080000,0,"#bCoconut Smash #r(earn BeiDou tokens)#k"),
        //Array(109080010,0,"#bIce Field #r(earn BeiDou tokens)#k"),
        Array(109040001,0,"#bHighland Jump Quest #r(earn BeiDou tokens)#k"),
		Array(109030001,0,"#bClimb Up #r(earn BeiDou tokens)#k"),
		Array(109060000,0,"#bSnowball #r(earn BeiDou tokens)#k"),
		Array(109010000,0,"#bTreasure Hunt #r(earn BeiDou tokens)#k"),
		Array(105040316,10,"#bForest Jump Quest #r(earn BeiDou tokens)#k"),
		Array(103000900,10,"#bSubway Jump Quest #r(earn BeiDou tokens)#k"),
		Array(280020000,10,"#bVolcano Jump Quest #r(earn BeiDou tokens)#k"),
		Array(101000100,10,"#bEndurance Jump Quest #r(earn BeiDou tokens)#k")
		);

//------------------------------------------------------------------------	
		
		
var status;

//Start
function start() 
{
	levelStart();
}

/**
 * @description When sendSelectLevel is used, the player's choice is automatically routed to the matching level+selection method.
 */
function levelStart() {
    let text = "Welcome! Where would you like to #bteleport#k today?\r\n\r\n";
    text += "#L0##bBoss Maps#k#l\r\n";
    text += "#L1##bLeveling Maps#k#l\r\n";
    text += "#L2##bTown Maps#k#l\r\n";
    text += "#L3##bEvent / Jump Quest Maps#k#l\r\n";
    cm.sendSelectLevel(text);
}

function level0() {
	let text = "#r#eBoss Maps#n#k\r\n\r\n";
    for (let i = 0; i < bossmaps.length; i++) {
       text += "#L" + i + "##b" + bossmaps[i][2] + "#l\r\n";
    }
	cm.sendNextSelectLevel("Boss", text);
}

function level1() {
	let text = "#r#eLeveling Maps#n#k\r\n\r\n";
    for (let i = 0; i < monstermaps.length; i++) {
       text += "#L" + i + "##b" + monstermaps[i][2] + "#l\r\n";
    }
	cm.sendNextSelectLevel("LevelUp", text);
}

function level2() {
	let text = "#r#eTown Maps#n#k\r\n\r\n";
    for (let i = 0; i < townmaps.length; i++) {
       text += "#L" + i + "##b" + townmaps[i][2] + "#l\r\n";
    }
	cm.sendNextSelectLevel("Town", text);
}

function level3() {
	let text = "#rNote: Event maps may still have bugs, so proceed with caution!#k\r\n\r\n";
    for (let i = 0; i < fubenmaps.length; i++) {
       text += "#L" + i + "#" + fubenmaps[i][2] + "#l\r\n";
    }
	cm.sendNextSelectLevel("Fuben", text);
}

//----------------------------------------------------------------------------------
function levelBoss(selection) {
	cm.gainMeso(-bossmaps[selection][1]);
	cm.getPlayer().saveLocationOnWarp();
	cm.warp(bossmaps[selection][0]);
	cm.dispose();
}

function levelLevelUp(selection) {
	cm.gainMeso(-monstermaps[selection][1]);
	cm.getPlayer().saveLocationOnWarp();
	cm.warp(monstermaps[selection][0]);
	cm.dispose();
}

function levelTown(selection) {
	cm.gainMeso(-townmaps[selection][1]);
	cm.getPlayer().saveLocationOnWarp();
	cm.warp(townmaps[selection][0]);
	cm.dispose();
}

function levelFuben(selection) {
	cm.gainMeso(-fubenmaps[selection][1]);
	cm.getPlayer().saveLocationOnWarp();
	cm.warp(fubenmaps[selection][0]);
	cm.dispose();
}
//----------------------------------------------------------------------------------