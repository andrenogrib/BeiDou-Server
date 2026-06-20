/* ==================
 脚本类型: 万能传送   
 脚本作者：汉堡  
 联系方式：北斗项目组
 =====================
 */
//------------------------------------------------------------------------
var bossmaps = Array(			
		Array(230040420,380000,"Pianus BOSS                  #r（costs 380k mesos）#b"),
		Array(220080000,380000,"Papulatus BOSS                  #r（costs 380k mesos）#b"),
		Array(211042300,380000,"Zakum BOSS                  #r（costs 380k mesos）#b"),
        Array(702070400,380000,"Bishop BOSS                  #r（costs 380k mesos）#b"),
        Array(541020700,380000,"Nine-Tailed Fox BOSS                  #r（costs 380k mesos）#b"),
        Array(105100100,380000,"Crimson Balrog                  #r（costs 380k mesos）#b"),
		Array(240040700,380000,"Horntail                  #r（costs 380k mesos）#b"),
        Array(270000100,380000,"Pink Bean BOSS                #r（costs 380k mesos）#b")
		);
//------------------------------------------------------------------------

var monstermaps = Array(
		Array(104040000,500,"Archer Training Ground#r（500 mesos）#b　　 　　Suitable for Lv 1 ~ 15 players"),
		Array(101010100,580,"The Tree That Grew Ⅱ#r（580 mesos）#b 　　　   　 Suitable for Lv 8 ~ 15 players"),
        Array(103000101,680,"Subway <Line 1, Area 1>#r（680 mesos）#b　  　Suitable for Lv 20 ~ 25 players"),
		Array(220010500,780,"Terrace Hall#r（780 mesos）#b           Suitable for Lv 25 ~ 30 players"),
		Array(101030001,880,"Wild Boar Land Ⅱ#r（880 mesos）#b　 　  Suitable for Lv 25 ~ 35 players"),
		Array(103000105,980,"Subway <Line 1, Area 4>#r（980 mesos）#b　  　Suitable for Lv 35 ~ 50 players"),
		Array(100040103,1080,"Monkey Forest Ⅱ#r（1080 mesos）#b 　　　 Suitable for Lv 35 ~ 50 players"),
		Array(220040000,1180,"The Road of Time 1#r（1180 mesos）#b　 　　　Suitable for Lv 45 ~ 60 players"),
		Array(105040306,1280,"Forest of the Giants#r（1280 mesos）#b　　 　 　Suitable for Lv 50 ~ 65 players"),
		Array(250010304,2280,"The Nest of the Wandering Bear#r（2280 mesos）#b 　 　Suitable for Lv 55 ~ 75 players"),
		Array(251010402,2380,"Pirate Den 2#r（2380 mesos）#b　　 　Suitable for Lv 65 ~ 75 players"),
		Array(541010010,2580,"Ghost Ship 2#r（2580 mesos）#b　　　 　　Suitable for Lv 60 ~ 80 players"),
		Array(600020300,2680,"Tarantula Cave#r（2680 mesos）#b　　　  　Suitable for Lv 80 ~ 90 players"),
		Array(240010500,2780,"Goat Canyon#r（2780 mesos）#b　　  　　Suitable for Lv 85 ~ 100 players"),
		Array(230040100,2880,"Deep Sea Gorge 2#r（2880 mesos）#b　　 　　Suitable for Lv 90 ~ 100 players"),
		Array(551030100,2980,"Entrance to the Eerie World#r（2980 mesos）#b　　　Suitable for Lv 95 ~ 120 players"),
		Array(240030102,3080,"The Lost Forest#r（3080 mesos）#b　  　　Suitable for Lv 100 ~ 120 players"),
		Array(240040511,3280,"The Forgotten Dragon's Nest#r（3280 mesos）#b  　Suitable for Lv 105 ~ 130 players"),
		Array(541020000,3580,"Entrance to Ulu City#r（3580 mesos）#b　　  　Suitable for Lv 105 ~ 150 players")
		); 

//------------------------------------------------------------------------		

//------------------------------------------------------------------------

var townmaps = Array(
		//Array(910000000,520,"自由市场#r             （消耗520金币）#b"), 
		//Array(701000210,0,"大擂台"), 
		//Array(1000000,100,"彩虹岛新手村#r         （消耗1百金币）#b"), 
		Array(104000000,500,"Lith Harbor#r               （costs 500 mesos）#b"),
		Array(100000000,800,"Henesys#r               （costs 800 mesos）#b"),
		Array(101000000,800,"Ellinia#r             （costs 800 mesos）#b"),
		Array(102000000,800,"Perion#r             （costs 800 mesos）#b"),
		Array(103000000,800,"Kerning City#r             （costs 800 mesos）#b"),
		Array(120000000,800,"Nautilus Harbor#r       （costs 800 mesos）#b"),
		Array(105040300,1000,"Sleepywood#r             （costs 1000 mesos）#b"),
		Array(140000000,1000,"Rien#r                 （costs 1000 mesos）#b"),
		Array(200000000,1000,"Orbis#r             （costs 1000 mesos）#b"),
		Array(211000000,5000,"El Nath#r             （costs 5000 mesos）#b"),
		Array(230000000,1000,"Aquarium#r             （costs 1000 mesos）#b"),
		Array(222000000,1000,"Ludibrium Fairy Village#r               （costs 1000 mesos）#b"),
		Array(220000000,5000,"Ludibrium#r               （costs 5000 mesos）#b"),
		Array(701000000,5000,"Mu Lung#r             （costs 5000 mesos）#b"),
		Array(250000000,5000,"Mu Lung#r                 （costs 5000 mesos）#b"),
		Array(702000000,1000,"Herb Town#r               （costs 1000 mesos）#b"),
		//Array(500000000,500,"泰国#r                 （消耗5百金币）#b"),
		Array(260000000,500,"Ariant#r             （costs 500 mesos）#b"),
		Array(600000000,500,"Ellin Forest#r               （costs 500 mesos）#b"),
		Array(240000000,5000,"Leafre#r               （costs 5000 mesos）#b"),
		Array(261000000,1000,"Magatia#r             （costs 1000 mesos）#b"),
		Array(221000000,1000,"Omega Sector#r         （costs 1000 mesos）#b"),
		Array(251000000,1000,"Herb Garden#r               （costs 1000 mesos）#b"),
		Array(701000200,10000,"Shanghai Yu Garden#r             （costs 10000 mesos）#b"),
		Array(550000000,10000,"Kuala Lumpur#r           （costs 10000 mesos）#b"),
		Array(130000000,1000,"Sanctuary#r                 （costs 1000 mesos）#b"),
		Array(551000000,1000,"Kampung Village#r             （costs 1000 mesos）#b"),
		Array(801000000,1000,"Showa Town#r               （costs 1000 mesos）#b"),
		Array(540010000,1000,"Singapore Airport#r           （costs 1000 mesos）#b"),
		Array(541000000,1000,"Singapore Harbor#r           （costs 1000 mesos）#b"),
		Array(300000000,1000,"Ellin Forest#r             （costs 1000 mesos）#b"),
		Array(270000100,10000,"Temple of Time#r             （costs 10000 mesos）#b"),
		Array(702100000,10000,"Scripture Library#r               （costs 10000 mesos）#b"),
		Array(800000000,10000,"Ancient Shrine#r             （costs 10000 mesos）#b"),
		Array(130000200,10000,"Sanctuary Crossroads#r             （costs 10000 mesos）#b"),
		Array(925020000,1000,"Mu Lung Dojo Entrance#r         （costs 1000 mesos）#b"),
		Array(930000000,5000,"Poison Fog Forest#r             （costs 5000 mesos）#b"),
		Array(930000010,1000,"Forest Entrance#r             （costs 1000 mesos）#b"),
		//Array(702090101,1000,"英语村#r               （消耗1千金币）#b"),  
		//Array(700000000,10000,"红鸾宫#r               （消耗1万金币）#b")
		//Array(749020000,0,"国庆蛋糕地图")
		);

//------------------------------------------------------------------------

var fubenmaps = Array(
        Array(109080000,0,"#bCoconut Smash                   #r（earn BeiDou tokens）#k "),
        //Array(109080010,0,"#冰地                      #r（获得北斗纪念币）#k "),
        Array(109040001,0,"#bHighland Jump Quest                 #r（earn BeiDou tokens）#k "),
		Array(109030001,0,"#bClimb Up                     #r（earn BeiDou tokens）#k "),
		Array(109060000,0,"#bSnowball                   #r（earn BeiDou tokens）#k "),
		Array(109010000,0,"#bTreasure Hunt                     #r（earn BeiDou tokens）#k "),
		Array(105040316,10,"#bForest Jump Quest                #r（earn BeiDou tokens）#k "),
		Array(103000900,10,"#bSubway Jump Quest                #r（earn BeiDou tokens）#k "),
		Array(280020000,10,"#bVolcano Jump Quest                #r（earn BeiDou tokens）#k "),
		Array(101000100,10,"#bEndurance Jump Quest                #r（earn BeiDou tokens）#k ")
		);

//------------------------------------------------------------------------	
		
		
var status;

//Start
function start() 
{
	levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "Honorable GM, where would you like to go?\r\n";
    text += "#L0#BOSS Maps#l\r\n";
    text += "#L1#Leveling Maps#l\r\n";
    text += "#L2#Town Maps#l\r\n";
    text += "#L3#Event / Jump Quest Maps#l\r\n";
    cm.sendSelectLevel(text);
}

function level0() {
	let text = "#b";
    for (let i = 0; i < bossmaps.length; i++) {  
       text += "#L" + i + "#" + bossmaps[i][2] + "#l\r\n";
    }	
	cm.sendNextSelectLevel("Boss", text);
}

function level1() {
	let text = "#b";
    for (let i = 0; i < monstermaps.length; i++) {  
       text += "#L" + i + "#" + monstermaps[i][2] + "#l\r\n";
    }	
	cm.sendNextSelectLevel("LevelUp", text);
}

function level2() {
	let text = "#b";
    for (let i = 0; i < townmaps.length; i++) {  
       text += "#L" + i + "#" + townmaps[i][2] + "#l\r\n";
    }	
	cm.sendNextSelectLevel("Town", text);
}

function level3() {
	let text = "#rNote: Event maps still have bugs, proceed with caution!#k\r\n#b";
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