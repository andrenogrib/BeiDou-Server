/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* 
    9201123 - Warrior Statue, Lith Harbor
    |- Warps you to 102000003 (Warriors' Sanctuary)

    Version
    |- 1.0 First Version by Jayd
    |- 1.1 Edited by Ronan - check job requirements
 */

var status;
var map = 102000003;
var job = "Warrior";
var jobType = 1;
var no = "If you want to become a #b" + job + "#k, remember to come back and find me.";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk(no);
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.sendOk(no);
            cm.dispose();
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (cm.getJob().getId() == 0) {
                if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                    cm.sendYesNo("Hello #h #, I can send you to #b#m" + map + "##k to make the #b" + job + "#k job advancement. Do you want to go there?");
                } else {
                    cm.sendOk("If you want to become a #b" + job + "#k, you need to reach #blevel 10, " + cm.getFirstJobStatRequirement(jobType) + "#k.");
                    cm.dispose();
                }
            } else {
                cm.sendOk("I only attend to beginners!");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.warp(map, 0);
            cm.dispose();
        }
    }
}