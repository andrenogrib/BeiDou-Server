let status = -1;
let map = 910310000;
let num = 5;
let maxp = 5;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        if (status <= 1) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status === 0) {
        if (cm.getLevel() >= 20) {
            cm.sendOk("#rOnly characters below level 20 can enter the Training Center.");
            cm.dispose();
            return;
        }

        let selStr = "Do you want to enter the Training Center?";
        for (let i = 0; i < num; i++) {
            selStr += "\r\n#b#L" + i + "#Training Center " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
        }
        cm.sendSimple(selStr);
    } else if (status === 1) {
        if (selection < 0 || selection >= num) {
            cm.dispose();
        } else if (cm.getPlayerCount(map + selection) >= maxp) {
            cm.sendNext("#rIt's full inside. Try another Training Center or channel.");
            status = -1;
        } else {
            cm.warp(map + selection, 0);
            cm.dispose();
        }
    }
}