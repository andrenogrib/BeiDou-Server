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

/**
 * @description Drop Rate Lookup center script
 */
var mogu = "#fUI/UIWindow.img/Minigame/Omok/stone/0/black/0#";
var ui = "#fUI/Basic.img/BtCoin/normal/0#";


var OldTitle ="\t\t\t\t\t"+mogu+"#e Welcome to the #rMapleStory#k Script Center "+mogu+"#n\t\t\t\t\r\n\r\n";
var status = -1;
var i = 0;


function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
		let text = OldTitle;
        text += ""+ui+"Current NX Cash: #b" + cm.getPlayer().getCashShop().getCash(1) + "#k\r\n";
        text += ""+ui+"Current Maple Points: #b" + cm.getPlayer().getCashShop().getCash(2) + "#k\r\n";
        text += ""+ui+"Current Nexon Points: #b" + cm.getPlayer().getCashShop().getCash(4) + "#k\r\n";
        text += ""+ui+"Current Mesos: #b" + cm.getPlayer().getMeso() + "#k\r\n";
        text += " \r\n\r\n";
		text += "#r#eDrop Rate Lookup#n#k\r\n\r\n";
		text += "#L1##bCurrent Map Drop Rate#k#l\r\n";
		text += "#L2##bItem Drop Rate Search#k#l\r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        doSelect(selection);
    } else {
        cm.dispose();
    }
}

function doSelect(selection) {
    switch (selection) {
        // Non-GM features
        case 1:
            openNpc("当前地图掉落_当前地图");
            break;
        case 2:
            openNpc("当前地图掉落_物品查询");
            break;
        


        default:
            cm.sendOk("This feature is #rnot available yet#k. Please stay tuned!");
            cm.dispose();
    }
}

function openNpc(scriptName) {
    cm.dispose();
    cm.openNpc(9900001, scriptName);
}