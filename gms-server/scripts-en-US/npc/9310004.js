/**
 * 东方神州系列地图脚本
 * 北斗项目组	https://github.com/BeiDouMS/BeiDou-Server
 * 作者：@Magical-H
 * 2025-01-02 17:33:23
 */

/*是否允许重复进入*/
const isRepeat = true;	//true = 允许完成任务后重复进入。；false = 不允许完成任务后重复进入。
const isUseItem = false;	//true = 进入时扣除资格证明（需要放弃任务重新领取，降低刷刷效率）； false = 进入时不扣除资格证明（允许玩家原地进入重复刷刷，提高效率）
const itemID = 4031289;		//资格证明
const mapID = 701010321;	//进入的地图
function start() {
	//4103和8512均为寻找赤珠的任务，似乎是不同版本的任务。
	if (isRepeat && (cm.isQuestCompleted(4103) || cm.isQuestCompleted(8512))) {
		cm.sendNextLevel('Sure','Lately the livestock have suddenly become extremely aggressive again. We suspect #b#e#o9300188##k#n has made yet another comeback. Please go take care of it.');
	} else if (cm.haveItem(itemID ,1)) {//资格证明道具
		cm.sendNextLevel('Sure',`Hm?\r\nYou've got more skill than you look, managing to get your hands on even a #b#e#v4031289##t4031289##k#n.\r\nIn that case, go investigate #b#e#m${mapID}##k#n first.`);
	} else {
		cm.sendOkLevel('',`Salute!\r\nHello, #b#h ##k. I'm #e#b#p${cm.getNpc()}##k#n, patrolling this area.\r\nIf you don't have any business here, you'd better hurry back!`);
	}
}

function level() {
	leveldispose();
}
function levelnull() {
	leveldispose();
}
function leveldispose() {
	cm.dispose();
}
function levelEnter() {
	if (!isRepeat && (isUseItem && cm.haveItem(itemID ,1))) cm.gainItem(itemID,-1);	//仅有资格证明进入时是否扣除
	cm.warp(mapID);
	cm.dispose();
}
function levelSure() {
	cm.sendYesNoLevel('Coward','Enter',`I'll send you into #b#e#m${mapID}##k#n now. Are you ready?`);
}
function levelCoward() {
	cm.sendOkLevel('',`Come find me again when you're ready to go to #b#e#m${mapID}##k#n.`);
}