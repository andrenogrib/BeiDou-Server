var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendNext("The #b#eWarrior Tribe of Gold and Silver Island#k#n is brimming with the spirit of heroes. Don't you want to go back and take a look! What a shame.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("Hey! I'm #b#ePilot Hong#n#k, and I'm in charge of flying the plane to #bGold and Silver Island#k.\r\nAfter many years of flying, my piloting skills have become quite remarkable.\r\nAre you interested in heading to the quaint #b#eWarrior Tribe#k#n with me?\r\nIt only costs #r2000 mesos#k!");
		} else if (status == 1) {
			if (cm.getMeso() < 2000) {
				cm.sendNext("Are you sure you have #b2000 mesos#k? If not, I can't take you there for free.");
				cm.dispose();
			} else {
				cm.gainMeso(-2000);
				cm.warp(102000000);
				cm.dispose();
			}
		}
	}
}