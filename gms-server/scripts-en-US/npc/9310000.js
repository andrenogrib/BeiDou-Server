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
			cm.sendNext("You don't want to see the beautiful Shanghai Bund? What a shame.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("Hey! I'm #b#ePilot Hong#n#k, and I fly the plane to Shanghai.\r\nAfter years of flying, my piloting skills are second to none.\r\nWould you like to come with me to the beautiful #b#eShanghai Bund#k#n?\r\nIt only costs #r2000 mesos#k!");
		} else if (status == 1) {
			if (cm.getMeso() < 2000) {
				cm.sendNext("Are you sure you have #b2000 mesos#k? If not, I can't take you there for free.");
				cm.dispose();
			} else {
				cm.gainMeso(-2000);
				cm.warp(701000000);
				cm.dispose();
			}
		}
	}
}