
var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("You don't want to become a Gunslinger?");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("So you've reached Level 30. Have you come to me to become a Gunslinger? Well, you've certainly come to the right person.");
    } else if (status == 1) {
        qm.sendNext("But I can't just let you change jobs right away. You'll have to prove your power and strength to me. A Gunslinger is a kind of pirate who uses guns to drive back enemies. So if you want to become an excellent Gunslinger, you have to be good at using a gun. Be sure to remember this.");
    } else if (status == 2) {
        qm.sendNext("The way to prove yourself is simple. I'll send you to the testing area, where you'll fight the #r Buffy Octopus#k and collect 15 #b Crystals of Mighty Power#k to bring back. You think that's easy? Don't underestimate the enemy! They can only be defeated with the designated attack, so remember that. Any other skills or attacks won't work. It may be a bit difficult, but to become an excellent Gunslinger you'll have to muster your spirit and give it your all...");
    } else if (status == 3) {
        qm.startQuest();
        qm.warp(108000501, 0);
        qm.dispose();
    }
}

	
