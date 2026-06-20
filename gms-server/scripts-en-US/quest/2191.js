
var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("You don't want to become a Brawler?");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("So you've reached level 30. Did you come to me to become a Brawler? Then you've definitely come to the right person.");
    } else if (status == 1) {
        qm.sendNext("But I can't just let you advance right away. You must prove your strength and power to me. A Brawler is a pirate who uses their whole body and fists to drive back enemies. So if you want to be an excellent Brawler, you must learn to make good use of your fists. Be sure to remember that.");
    } else if (status == 2) {
        qm.sendNext("The way to prove it is simple. I'll send you to the testing area, where you must fight the #r Poison Octopus#k and collect 15 #b Crystals of Mighty Power#k to bring back. You think it's simple? Don't underestimate them! They can only use single-target attacks, you must remember that. No other techniques or attacks will work. It might be a bit tough, but to become an excellent Brawler you still need to muster your spirit and give it your all...");
    } else if (status == 3) {
        qm.startQuest();
        qm.warp(108000502, 0);
        qm.dispose();
    }
}

	
