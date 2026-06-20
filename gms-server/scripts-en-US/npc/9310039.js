/**
 * 通用组队副本脚本
 * 北斗项目组
 * @author: @Magical-H
 */
const EventName = 'YaoSengPQ' , PartyName = 'Shaolin Secret Chamber';
const EventLevel = 1;           //怪物HP倍率，提高此值可以成倍提高怪物血量。
const entryMap = 702060000;     //进入的地图ID
const recruitMap = 702070400;   //必须在此地图才能接任务
const OpenRemotely = false;     //是否允许远程打开，只允许在指定地图打开，其它地图无法打开。
const QuestID = 8534;           //需要完成的前置任务ID
var status = 0;
var state;
var em = null;
var PartyInfo = null;

function start(){
    if(!OpenRemotely && cm.getMapId() != recruitMap) {  //防止远程打开
        level();
        return;
    }
    if(QuestID != null && QuestID > 0 && !cm.isQuestCompleted(QuestID)) {
        cm.sendOkLevel('','...');
        return;
    }
    if(em == null) {
        em = cm.getEventManager(EventName);
        PartyInfo = em.getProperty("party");
    }

    if (em == null || em.getName() != EventName) {
        cm.sendOkLevel('',`#e#b<Party Quest> ${PartyName}#k#n encountered an error.`);
    } else {
        levelStart();
    }
}

function level() {
    cm.dispose();
}
function levelnull() {
    level();
}
function levelStart() {
    let msg = `#e#b<Party Quest> ${PartyName}#n\r\n${PartyInfo}#k\r\n\r\n`;
        msg += `How about completing this quest together with your party members?\r\nHere you will face obstacles and challenges, and without great teamwork you won't be able to clear it.\r\nIf you'd like to give it a try, tell your #bparty leader#k to come talk to me.#b\r\n`;
        msg += `#L0#I want to take on the party quest.#l\r\n`;
        msg += `#L1#I want to ${(cm.getPlayer().isRecvPartySearchInviteEnabled() ? "disable" : "enable")} Party Search.#l\r\n`;
        msg += `#L2#I want to learn more details.#l`;
    cm.sendSelectLevel(msg);
}
function level0() {
    let msg;
    if (cm.getParty() == null) {
        msg = "You can only take on the party quest when you have joined a party.";
    } else if (!cm.isLeader()) {
        msg = "Only your party leader can talk to me to start this party quest.";
    } else {
        let eli = em.getEligibleParty(cm.getParty());
        if (eli.size() > 0) {
            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), EventLevel)) {//开始事件
                msg = "Another party has already entered the #rparty quest#k on this channel. Please try another channel, or wait for the current party to finish.";
            }
        } else {
            list = em.getEligibleParty(cm.getParty());
            msg = "You can't start this party quest right now, because your party may not meet the required number of members, some members may not meet the participation requirements, or they may not be on this map. If you can't find members, you can try using the Party Search feature.\r\n";
        }
    }
    if(msg) {
        cm.sendOkLevel('',msg);
    } else {
        level();
    }
}

function level1() {
    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
    cm.sendOkLevel('',"Your Party Search status is now: #b" + (psState ? "Enabled" : "Disabled") + "#k. Come talk to me anytime you want to change it.");
}
function level2() {
    cm.sendOkLevel('',`#e#b<Party Quest> ${PartyName}#k#n\r\nLead your party members to #e#b#m${entryMap}##n#k to investigate and deal with the source of the problem.`);
}