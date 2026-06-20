/**
 * 东方神州系列地图脚本
 * 北斗项目组	https://github.com/BeiDouMS/BeiDou-Server
 * 作者：@Magical-H
 * 2025-01-02 17:33:23
 */
const isRepeat = true;	//true = 允许完成任务后重复进入。；false = 不允许完成任务后重复进入。
const mapID = 701010324;        //可怕的山丘
const EventName = 'WuGongPQ';   //事件名称
const EventLevel = 1;           //怪物HP倍率，提高此值可以成倍提高怪物血量。
const LevelMin = 25 , LevelMax = 90;        //等级范围限制
var em = null;     //事件实例

function start() {
    if(em == null) {
        em = cm.getEventManager(EventName);
    }
    if(em.getName() != EventName) {
        cm.sendOkLevel('','Due to some mysterious force, I cannot send you over there for now. Please contact an administrator to resolve this.');
    } else {
        cm.sendSelectLevel('',`Salute!\r\nHello, #e#b#h ##k#n, I am #b#e#p${cm.getNpc()}##k#n\r\n\r\n#L0##bSecret Mission#l\r\b\r\n#L1#Leave#l#k`);
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
    let msg;
    //4103和8512均为寻找赤珠的任务，似乎是不同版本的任务。
    if(!isRepeat && (cm.isQuestCompleted(4103) || cm.isQuestCompleted(8512))) {//完成了赤珠任务将传送到一个地图
        let level = cm.getLevel();
        if(level >= LevelMin && level <= LevelMax) {
            cm.warp(mapID);
        } else {
            msg = 'You cannot undertake this #bSecret Mission#k right now because you do not meet the requirements:\r\n\r\n';
            msg += `Level requirement: ${LevelMin} ~ ${LevelMax}`;
        }
    } else {
        var eli = em.getEligibleParty(cm.getParty());
        if (eli.size() > 0) {
            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), EventLevel)) {
                msg = 'Someone else is already undertaking the #bSecret Mission#k. Please try again later.';
            }
        } else {
            msg = 'You cannot undertake this #bSecret Mission#k right now because you do not meet the requirements: ' + em.getProperty('party');
        }
    }
    if(msg) cm.sendOk(msg);
    leveldispose();
}
function level0(){
    cm.sendNextLevel('0_1',`You actually managed to get here... You're no ordinary person!\r\nBut have you heard about the very dangerous monsters nearby?`);
}
function level0_1() {
    if (cm.getParty() == null) {
        cm.sendOkLevel('','This #bSecret Mission#k is very dangerous. You need to form a party before you can enter and take it on.');
    } else if (!cm.isLeader()) {
        cm.sendOkLevel('','Please have your party leader start this mission.');
    } else {
        cm.sendNextLevel('Enter', `When you move on to the next area, you will encounter very dangerous monsters. Be extremely careful.\r\nGoodbye!`);
    }
}
function level1(){
    level();
    cm.openNpc(9310006,'9310007');
}