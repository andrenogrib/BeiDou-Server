/**
 * 东方神州系列地图脚本
 * 北斗项目组	https://github.com/BeiDouMS/BeiDou-Server
 * 作者：@Magical-H
 *
 */

const QuestMode = true; //true = 采用任务模式，false = 采用脚本模式
const QuestID = 4109;	//任务ID，收集50个黑羊毛
const itemID = 4000194;//黑羊毛
const itemCount = 50;
const mapPortal = 'h000';	//h000 = 传送到 警察 江 旁边（也就是起始位置） ; st07 = 直接传送到 警察 许 旁边（适合速刷省流程）
var mapID;
var mapID_enter;
var mapID_out;
var QuestObj;
var quest;
var text = '';

function start() {
	if(mapID == null) {
		QuestObj = Java.type('org.gms.server.quest.Quest');
		quest = QuestObj.getInstance(QuestID);
		mapID = cm.getMapId();
		mapID_enter = mapID + 1;
		mapID_out = mapID - 1;
		collected = cm.getItemQuantity(itemID);
		collected = (QuestMode && cm.isQuestCompleted(QuestID)) ? (itemCount + collected) : collected;
		text = `You need to collect #e#b#v${itemID}##t${itemID}##k#n × #r#e${itemCount}#k#n  #B${collected / itemCount * 100}#  \r\nto prove you've got some skill, otherwise I can't trust you not to throw your life away!\r\n`;
		text += `#L1#Enter #b#e#m${mapID_enter}##k#n to continue the investigation#l\r\n`;
		text += `#L2#Leave #b#e#m${mapID}##k#n and return to #b#e#m${mapID_out}##k#n#l`;
	}
	if(QuestMode && cm.getQuestStatus(QuestID) == 0) {
		levelQuest1();
	} else {
		cm.sendSelectLevel(text);
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
	resetQuest();
	cm.warp(mapID + 1,mapPortal);	//进入指定地图指定传送点
	leveldispose();

}
function levelOut(){
	resetQuest();
	cm.warp(mapID - 1);
	leveldispose();
}
function resetQuest(){
	if (QuestMode && cm.isQuestCompleted(QuestID)) {
		if(quest != null) quest.reset(cm.getPlayer());//重新开始任务
	}
}
function level1() {
	if ((QuestMode && cm.isQuestCompleted(QuestID)) || (QuestMode == false && cm.haveItem(itemID ,itemCount))) {
		cm.sendYesNoLevel('','Enter',`I'll send you into #b#e#m${mapID_enter}##k#n now. Are you ready?`);
	} else {
		cm.sendOkLevel('','You can't even handle a small request like this? With no skill, do you really think you can go and throw your life away?');
	}
}
function level2() {
	cm.sendYesNoLevel('','Out',`Have you decided to leave?\r\nCome find me again when you're ready to go to #b#e#m${mapID_enter}##k#n.`);
}
function levelQuest1(){
	cm.sendNextLevel('Quest2','Salute!\r\nWe need to run some checks!\r\nThis is a restricted area, no unauthorized personnel allowed.\r\nThose without permission are not permitted to enter!\r\nWhat? You've already been granted permission?');
}
function levelQuest2(){
	cm.sendYesNoLevel('Quest2_no','Quest2_yes','Oh... I just received the message. You're with the special operations team. You must be quite an impressive person. If you'd do me a small favor, I'll let you through. Can you help me?');
}
function levelQuest2_yes(){
	cm.startQuest(QuestID);
	leveldispose();
}
function levelQuest2_no(){
	cm.sendOkLevel('','If you won't assist with official duties, then I can't let you through. Please turn back.');
}