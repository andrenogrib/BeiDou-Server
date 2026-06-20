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
/* Author: Xterminator
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("Do you want to go to Gold Beach? For just #e150 mesos#n, I'll take you to #bLith Harbor#k. #rHowever#k, once you leave this place, you won't be able to come back. Are you ready to set off?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 1) {
            status -= 2;
        } else if (type == 1 || (mode == -1 && type != 1)) {
            if (mode == 0) {
                cm.sendOk("Enjoy your time here.");
            }
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801)) {
            cm.sendNext("Is this Lucas's recommendation letter? Then you can ride this flight for free.");
        } else {
            cm.sendNext("That'll be #e150 mesos#n...");
        }
    } else if (status == 2) {
        if (cm.haveItem(4031801)) {
            cm.sendNextPrev("There's no time to lose. Let's get going!");
        } else if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("You don't have enough mesos to pay for this voyage.");
                cm.dispose();
            } else {
                cm.sendNext("There's no time to lose. Let's get going!");
            }
        } else {
            cm.sendOk("Your level is too low. Please come back after you reach level 7.");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso(-150);
        }
        cm.warp(104000000, 0);
        cm.dispose();
    }
}