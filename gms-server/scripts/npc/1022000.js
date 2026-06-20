/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Dances with Balrog
	Warrior Job Advancement
	Victoria Road : Warriors' Sanctuary (102000003)

	Custom Quest 100003, 100005
*/

let status = -1;
let actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
let job = 110;

let spawnPnpc = false;
let spawnPnpcFee = 7000000;
let jobType = 1;

function start() {
    const GameConstants = Java.type('org.gms.constants.game.GameConstants');
    if (parseInt(cm.getJobId() / 100) === jobType && cm.canSpawnPlayerNpc(GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        let sendStr = "You look quite powerful already. #rWould you like to create your own statue in the Hall of Fame?";
        if (spawnPnpcFee > 0) {
            sendStr += "It will only cost you #b " + cm.numberWithCommas(spawnPnpcFee) + " mesos.#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() === 0) {
            actionx["1stJob"] = true;
            cm.sendNext("You want to become a #rWarrior#k? #bYou need to be at least level 10 and " + cm.getFirstJobStatRequirement(jobType) + "#k. Let me see if you qualify.");
        } else if (cm.getLevel() >= 30 && cm.getJobId() === 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012)) {
                cm.sendNext("You've returned safely! I knew I wasn't wrong about you, you're a true Warrior! Now you can make your second job advancement. Come ask me if you have any questions.");
            } else if (cm.haveItem(4031008)) {
                cm.sendOk("Go find #b#p1072000##k. He's near #b#m102020300##k.");
                cm.dispose();
            } else {
                cm.sendNext("You've made amazing progress.");
            }
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 === 0 && parseInt(cm.getJobId() / 100) === 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("I've been waiting for you! A few days ago, I heard about you from #b#p2020008##k. You can become even stronger now, but you must pass my test. There is a dimensional portal in the Ant Tunnel Park, and inside is my clone. Defeat it and bring back #b#t4031059##k.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("You don't have #b#t4031059##k yet.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("You've defeated my clone and brought back #b#t4031059##k! It looks like you're ready for your third job advancement. Take #b#t4031057##k to #b#p2020008##k, and he will help you make your third job advancement. Good luck!");
        } else {
            cm.sendOk("You've made a wise choice!");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode === -1 && selection === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && type !== 1) {
        status -= 2;
    }

    if (status === -1) {
        start();
        return;
    } else {
        if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("You don't have enough mesos.");
                    cm.dispose();
                    return;
                }

                const PlayerNPC = Java.type('org.gms.server.life.PlayerNPC');
                const GameConstants = Java.type('org.gms.constants.game.GameConstants');
                if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("Your statue has successfully been placed in the Hall of Fame.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("Sorry, the Hall of Fame is currently full.");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode !== 1 || status === 7 && type !== 1 || (actionx["1stJob"] && status === 4) || (cm.haveItem(4031008) && status === 2) || (actionx["3thJob"] && status === 1)) {
                if (mode === 0 && status === 2 && type === 1) {
                    cm.sendOk("Come find me once you've made up your mind.");
                }
                if (!(mode === 0 && type !== 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status === 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendNextPrev("It looks like you qualify. Please note: #ronce you advance, you cannot change your job again#k. If you're not sure yet, click #bEnd Chat#k.");
            } else {
                cm.sendOk("You don't meet the requirements to become a #rWarrior#k. Keep working at it.");
                cm.dispose();
            }
        } else if (status === 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() === 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("From this moment on, you have officially set foot on the path of the Warrior. It won't be easy, but as long as you have enough courage and confidence, you will overcome all hardships.");
            } else {
                cm.sendNext("#rYour inventory is full");
                cm.dispose();
            }
        } else if (status === 2) {
            cm.sendNextPrev("As a job advancement reward, I've #radded 4 slots to each of your inventory tabs#k. I've also given you #rsome SP#k that you can use to improve your skills.");
        } else if (status === 3) {
            cm.sendNextPrev("There you go, you're now a true Warrior!");
        } else {
            cm.dispose();
        }
    } else if (actionx["2ndJob"]) {
        if (status === 0) {
            if (cm.haveItem(4031012)) {
                cm.sendSimple("Very good. So what would you like to do next?#b\r\n#L0#Learn about Fighter\r\n#L1#Learn about Page\r\n#L2#Learn about Spearman\r\n#L3#Choose a job");
            } else {
                cm.sendNext("Now you can prepare for your second job advancement test.");
                if (!cm.isQuestStarted(100003)) {
                    cm.startQuest(100003);
                }
            }
        } else if (status === 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008)) {
                        cm.gainItem(4031008, 1);
                    }
                    cm.sendNextPrev("Please take this letter to #b#p1072000##k. He's near #b#m102020300##k.");
                } else {
                    cm.sendNext("#rYour Etc inventory is full");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection === 0) {// 介绍剑客
                        cm.sendNext("A Warrior who uses a #rsword or axe#k.\r\n\r\nThe Fighter can boost the party's physical damage and gains impressive damage output after the fourth job advancement.");
                    } else if (selection === 1) {// 介绍准骑士
                        cm.sendNext("A Warrior who uses a #rsword or blunt weapon#k.\r\n\r\nThe Page can lower a monster's stats and gains elemental attack abilities after the third job advancement.");
                    } else {// 介绍枪战士
                        cm.sendNext("A Warrior who uses a #rpolearm or spear#k.\r\n\r\nThe Spearman can boost the party's survivability and gains impressive damage output after the third job advancement.");
                    }

                    status -= 2;
                } else {
                    cm.sendSimple("Please choose your job path#b\r\n#L0#Fighter\r\n#L1#Page\r\n#L2#Spearman");
                }
            }
        } else if (status === 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("Are you sure you want to advance to " + (job === 110 ? "#bFighter#k" : job === 120 ? "#bPage#k" : "#bSpearman#k") + "? Once you choose, it cannot be changed.");
        } else if (status === 3) {
            if (cm.haveItem(4031012)) {
                cm.gainItem(4031012, -1);
            }
            cm.completeQuest(100005);

            if (job === 110) {
                cm.sendNext("Congratulations on becoming a #bFighter#k!");
            } else if (job === 120) {
                cm.sendNext("Congratulations on becoming a #bPage#k!");
            } else {
                cm.sendNext("Congratulations on becoming a #bSpearman#k!");
            }
            if (cm.getJobId() !== job) {
                cm.changeJobById(job);
            }
        } else if (status === 4) {
            cm.sendNextPrev("Now you can start learning #b" + (job === 110 ? "Fighter" : job === 120 ? "Page" : "Spearman") + "#k skills. I've expanded your HP and inventory space.");
        } else if (status === 5) {
            cm.sendNextPrev("I've also given you some second-job #bSP#k. Open your skill window to learn your second-job skills.");
        } else if (status === 6) {
            cm.sendNextPrev("Alright, continue on your journey. Come find me again at level 70 for your next job advancement.");
        }
    } else if (actionx["3thJobI"]) {
        if (status === 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("My clone is quite powerful and uses special skills. You should fight him one-on-one, defeat him, and bring back #b#t4031059##k. Good luck!");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}

/* 3th Job Part
	PORTAL 20 MINUTES.
 */