/**
 * @description 魔法师教官汉斯，用nextLevel框架实现示例
*/

var job = 210;

const SPAWN_PNPC_FEE = 7000000;
const JOB_TYPE = 2;
const GameConstants = Java.type('org.gms.constants.game.GameConstants');

function start() {
    levelStart();
}

/**
 * @description 脚本开始执行入口
 */
function levelStart() {
    // 是魔法师职业，且能加入名人堂
    if (parseInt(cm.getJobId() / 100) === JOB_TYPE && cm.canSpawnPlayerNpc(GameConstants.getHallOfFameMapid(cm.getJob()))) {
        levelStartHallOfFame();
    } else {
        levelStartChangeJob();
    }
}

/**
 * @description 处理名人堂相关的起始方法
 */
function levelStartHallOfFame() {
    let sendStr = "You've come a long way to gain the strength, wisdom, and courage you possess today, haven't you? How would you like #ran image of your current character displayed in the MapleStory Hall of Fame#k?";
    if (SPAWN_PNPC_FEE > 0) {
        sendStr += "For just #b" + cm.numberWithCommas(SPAWN_PNPC_FEE) + " mesos#k, I can make it happen for you~";
    }
    // 选择否就调用levelDispose，选择是就走levelCheckHallOfFame
    cm.sendYesNoLevel("Dispose", "CheckHallOfFame", sendStr);
}

/**
 * @description 校验并执行名人堂操作
 */
function levelCheckHallOfFame() {
    if (cm.getMeso() < SPAWN_PNPC_FEE) {
        // 点击ok调用dispose
        cm.sendOkLevel("Dispose", "Sorry, you don't have enough mesos to purchase a spot in the Hall of Fame.");
        return;
    }

    const PlayerNPC = Java.type('org.gms.server.life.PlayerNPC');
    let msg;
    if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
        cm.gainMeso(-SPAWN_PNPC_FEE);
        msg = "There you go! I hope you like it.";
    } else {
        msg = "Sorry, the Hall of Fame is currently full...";
    }
    // 点击ok调用levelDispose
    cm.sendOkLevel("Dispose", msg);
}

/**
 * @description 处理转职相关的起始方法
 */
function levelStartChangeJob() {
    if (cm.getJobId() === 0) {
        // 1转，点击下一步进入levelStartFistJob
        cm.sendNextLevel("StartFistJob", "Do you want to become a #rMagician#k? There are some standards to meet, since we can't accept everyone... #byour level should be at least 8#k, and the primary goal is to reach " + cm.getFirstJobStatRequirement(JOB_TYPE) + ". Let's take a look.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
    } else if (cm.getLevel() >= 30 && cm.getJobId() === 200) {
        // 2转
        if (cm.haveItem(4031012)) {
            // 点击下一步进入levelStartSecondJob1
            cm.sendNextLevel("StartSecondJob1", "I see you've done very well. I'll allow you to take the next step on this long journey.");
        } else if (cm.haveItem(4031009)) {
            // 点击ok调用levelDispose
            cm.sendOkLevel("Dispose", "Go find #b#p1072001##k.");
        } else {
            // 点击下一步进入levelStartSecondJob2
            cm.sendNextLevel("StartSecondJob2", "The progress you've made is amazing.");
        }
    } else if ((cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 === 0 && parseInt(cm.getJobId() / 100) === 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
        // 3转，点击下一步进入levelStartThirdJob1
        cm.sendNextLevel("StartThirdJob1", "There you are. A few days ago, #b#p2020009##k of Ossyria spoke to me about you. I see you're interested in making your third job advancement as a Magician. To achieve this goal, I need to test your strength and see whether you're worthy of this promotion. Deep within an evil forest on Victoria Island, there's an opening that leads to a secret passage. Once inside, you'll face a clone of me. Your task is to defeat him and return with #b#t4031059##k.");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
        // 3转，点击ok调用levelDispose
        cm.sendOkLevel("Dispose", "Please bring me #b#t4031059##k, obtained from my clone. You can find him in the spatial cave deep within the evil forest.");
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
        // 3转，点击下一步进入levelStartThirdJob2
        cm.sendNextLevel("StartThirdJob2", "Well done. You defeated my clone and safely brought back #b#t4031059##k. You've now physically proven yourself worthy of the third job advancement. Now you should take this necklace to #b#p2020011##k in Ossyria for the second part of the test. Good luck. You'll need it.");
    } else {
        // 点击ok调用levelDispose
        cm.sendOkLevel("Dispose", "A wise choice");
    }
}

/**
 * @description 1转处理入口
 */
function levelStartFistJob() {
    if (cm.getLevel() >= 8 && cm.canGetFirstJob(JOB_TYPE)) {
        // 点击否调用levelDispose，点击是走levelFinishFirstJob1
        cm.sendYesNoLevel("Dispose", "FinishFirstJob1", "Oh...! You look just like one of us... You just need a little wicked mind, and then... yes... So, what do you think? Do you want to become a Magician?");
    } else {
        // 点击ok调用levelDispose
        cm.sendOkLevel("Dispose", "Train a bit more until you meet the basic requirements, and then I can teach you the ways of the #rMagician#k.");
    }
}

function levelFinishFirstJob1() {
    if (cm.canHold(1372043)) {
        if (cm.getJobId() === 0) {
            cm.changeJobById(200);
            cm.gainItem(1372043, 1);
            cm.resetStats();
        }
        // 点击下一步进入levelFinishFirstJob2
        cm.sendNextLevel("FinishFirstJob2", "Alright, from now on, you're one of us! You'll be living the life of a wanderer for a while... but be patient, and soon you'll live a life of abundance. Now then, it's not much, but I'll pass on some of my abilities to you... Haaaah!!");
    } else {
        // 点击ok调用levelDispose
        cm.sendOkLevel("Dispose", "Clear up some space in your inventory, then come back and talk to me.");
    }
}

function levelFinishFirstJob2() {
    // 点击上一步返回levelFinishFirstJob1，下一步进入levelFinishFirstJob3
    cm.sendLastNextLevel("FinishFirstJob1", "FinishFirstJob3", "You're stronger now. And all of your inventories have gained slots. A whole row, to be exact. Go see for yourself. I just gave you a little bit of #bSP#k. When you open the #bSkill#k menu in the lower-left corner of the screen, you can use SP to learn skills. But keep one thing in mind: you can't level them all up at once. After learning certain skills, you can also unlock some specific ones.");
}

function levelFinishFirstJob3() {
    // 点击上一步返回levelFinishFirstJob2，下一步进入levelFinishFirstJob4
    cm.sendLastNextLevel("FinishFirstJob2", "FinishFirstJob4", "But remember, skills aren't everything. As a Magician, your stats should support your skills. Magicians mainly use INT as their primary stat and LUK as their secondary stat. If allocating stats is difficult, just use #bAuto-Assign#k.");
}

function levelFinishFirstJob4() {
    // 点击上一步返回levelFinishFirstJob3，下一步进入levelFinishFirstJob5
    cm.sendLastNextLevel("FinishFirstJob3", "FinishFirstJob5", "Now, one more word of warning. From now on, if you fall in battle, you'll lose a portion of your total EXP. Pay special attention to this, because your HP is lower than most.");
}

function levelFinishFirstJob5() {
    // 点击上一步返回levelFinishFirstJob4，下一步直接levelDispose
    cm.sendLastNextLevel("FinishFirstJob4", "Dispose", "That's all I can teach you. Good luck on your journey, young Magician.");
}

/**
 * @description 2转处理入口1
 */
function levelStartSecondJob1() {
    // 选择0进入levelSecondJobSelect0，选择1进入levelSecondJobSelect1，选择2进入levelSecondJobSelect2，选择3进入levelSecondJobSelect3
    cm.sendSelectLevel("SecondJobSelect", "Alright, once you've made your decision, click [I'll choose my job] at the bottom.#b\r\n#L0#Please explain what it means to become a Fire/Poison Mage.\r\n#L1#Please explain what it means to become an Ice/Lightning Mage.\r\n#L2#Please explain what it means to become a Cleric.\r\n#L3#I'll choose my job!");
}

function levelSecondJobSelect0() {
    // 点击下一步返回levelStartSecondJob1
    cm.sendNextLevel("StartSecondJob1", "A Magician who masters #rFire/Poison magic#k.\r\n\r\nThe #bFire/Poison Mage#k is an active job capable of dealing elemental magic damage. These skills give them a significant advantage against enemies weak to their element. Through their skills #rMeditation#k and #rSlow#k, the #bFire/Poison Mage#k can boost their magic attack and reduce their opponents' mobility. The #bFire/Poison Mage#k wields powerful fire arrow attacks and poison attacks.");    //f/p mage
}

function levelSecondJobSelect1() {
    // 点击下一步返回levelStartSecondJob1
    cm.sendNextLevel("StartSecondJob1", "A Magician who masters #rIce/Lightning magic#k.\r\n\r\nThe #bIce/Lightning Mage#k is an active job capable of dealing elemental magic damage. These skills give them a significant advantage against enemies weak to their element. Through their skills #rMeditation#k and #rSlow#k, the #bIce/Lightning Mage#k can boost their magic attack and reduce their opponents' mobility. The #bIce/Lightning Mage#k wields freezing attacks and lightning attacks.");    //i/l mage
}

function levelSecondJobSelect2() {
    // 点击下一步返回levelStartSecondJob1
    cm.sendNextLevel("StartSecondJob1", "A Magician who masters #rHoly magic#k.\r\n\r\nThe #bCleric#k is a powerful support job that's sure to be welcomed by any party. This is because of their ability to #rHeal#k themselves and other members of the party. Using #rBless#k, the #bCleric#k can boost stats and reduce the damage taken. If you find survival difficult, this job is worth a try. The #bCleric#k is especially effective against undead monsters.");    //cleric
}

function levelSecondJobSelect3() {
    // 选择4进入levelSecondJobSelect4，选择5进入levelSecondJobSelect5，选择6进入levelSecondJobSelect6
    cm.sendSelectLevel("SecondJobSelect", "Now... have you made your decision? Please choose the job you want for your second job advancement.#b\r\n#L4#Mage (Fire / Poison)\r\n#L5#Mage (Ice / Lightning)\r\n#L6#Cleric");
}

function levelSecondJobSelect4() {
    job = 210;
    // 选择否直接levelDispose，选择是进入levelFinishSecondJob1
    cm.sendYesNoLevel("Dispose", "FinishSecondJob1", "So you want to choose the Fire/Poison Mage for your second job advancement? You know that once you make this choice here, you can't choose a different job for your second job advancement, right?");
}

function levelSecondJobSelect5() {
    job = 220;
    // 选择否直接levelDispose，选择是进入levelFinishSecondJob1
    cm.sendYesNoLevel("Dispose", "FinishSecondJob1", "So you want to choose the Ice/Lightning Mage for your second job advancement? You know that once you make this choice here, you can't choose a different job for your second job advancement, right?");
}

function levelSecondJobSelect6() {
    job = 230;
    // 选择否直接levelDispose，选择是进入levelFinishSecondJob1
    cm.sendYesNoLevel("Dispose", "FinishSecondJob1", "So you want to choose the Cleric for your second job advancement? You know that once you make this choice here, you can't choose a different job for your second job advancement, right?");
}

function levelFinishSecondJob1() {
    if (cm.haveItem(4031012)) {
        cm.gainItem(4031012, -1);
    }
    cm.completeQuest(100008);
    // 下一步进入levelFinishSecondJob2
    cm.sendNextLevel("FinishSecondJob2", "Alright, from now on you're a #b" + getJobName() + "#k. Mages are a clever bunch, possessing incredible magical abilities that can easily pierce through the minds and psyche of monsters... Train yourself every day, and I'll help you become even stronger than you are now.");
    if (cm.getJobId() !== job) {
        cm.changeJobById(job);
    }
}

function levelFinishSecondJob2() {
    // 上一步返回levelFinishSecondJob1，下一步进入levelFinishSecondJob3
    cm.sendLastNextLevel("FinishSecondJob1", "FinishSecondJob3", "I just gave you a book that lists out the skills you can acquire as a " + getJobName() + ". In addition, your Etc inventory has been expanded by one row. Your max HP and MP have also increased. Go check it out and take a look.");
}

function levelFinishSecondJob3() {
    // 上一步返回levelFinishSecondJob2，下一步进入levelFinishSecondJob4
    cm.sendLastNextLevel("FinishSecondJob2", "FinishSecondJob4", "I also gave you a little bit of #bSP#k. Open the #bSkill menu#k in the lower-left corner. You can level up your newly acquired second-job skills. But note that you can't level them all up at once. Some skills can only be used after learning others. Be sure to remember this.");
}

function levelFinishSecondJob4() {
    // 上一步返回levelFinishSecondJob3，下一步直接levelDispose
    cm.sendLastNextLevel("FinishSecondJob3", "Dispose", "A " + getJobName() + " needs to keep growing stronger! But venting your power on the weak is not the right way. Using the power you have for the right things is a more important lesson than simply becoming stronger. Now then! I'm sure that with constant self-training you'll meet me again before long, and I look forward to that day.");
}

/**
 * @description 2转处理入口1
 */
function levelStartSecondJob2() {
    if (!cm.isQuestStarted(100006)) {
        cm.startQuest(100006);
    }
    // 下一步进入levelStartSecondJob3
    cm.sendNextLevel("StartSecondJob3", "Well done. You look strong, but I need to see whether you're truly strong enough to pass the test. It's not a difficult test, so you'll do just fine. Take my letter first... and make sure you don't lose it!");
}

function levelStartSecondJob3() {
    if (cm.canHold(4031009)) {
        if (!cm.haveItem(4031009)) {
            cm.gainItem(4031009, 1);
        }
        // 上一步返回levelStartSecondJob2，下一步直接levelDispose
        cm.sendLastNextLevel("StartSecondJob2", "Dispose", "Please deliver this letter to #b#p1072001##k, who is at #b#m101020000##k near Ellinia. He's filling in for me as an instructor. Give him the letter, and he'll test you on my behalf. Good luck.");
    } else {
        // ok调用levelDispose
        cm.sendOkLevel("Dispose", "Please make some room in your inventory.");
    }
}

/**
 * @description 3转处理入口1
 */
function levelStartThirdJob1() {
    if (cm.getPlayer().gotPartyQuestItem("JB3")) {
        cm.getPlayer().removePartyQuestItem("JB3");
        cm.getPlayer().removePartyQuestItem("JB3");
        cm.getPlayer().setPartyQuestItemObtained("JBP");
    }
    // 点击上一步，返回levelStartChangeJob，下一步直接levelDispose
    cm.sendLastNextLevel("StartChangeJob", "Dispose", "Since he's my clone, you can expect a tough fight. He uses many special attack skills, completely unlike anything you've seen before, and your task is to successfully fight him one-on-one. There's a time limit in the secret passage, so you must defeat him within the allotted time. Good luck, and I hope you return with #b#t4031059##k.");
}

/**
 * @description 3转处理入口2
 */
function levelStartThirdJob2() {
    cm.getPlayer().removePartyQuestItem("JBP");
    cm.gainItem(4031059, -1);
    cm.gainItem(4031057, 1);
    levelDispose();
}

/**
 * @description 执行dispose
 */
function levelDispose() {
    cm.dispose();
}

/**
 * @description 根据jobId获取job名
 *
 * @returns job名
 */
function getJobName() {
    return job === 210 ? "#bMage (Fire/Poison)#k" : (job === 220 ? "#bMage (Ice/Lightning)#k" : "#bCleric#k");
}