var status = -1;



function start() {

    action(1, 0, 0);

}



function action(mode, type, selection) {

    if (mode == -1 || (status >= 0 && mode == 0)) {

        cm.dispose();

        return;

    }

    if (mode == 1) {

        status++;

    } else {

        status--;

    }



    if (status == 0) {

        cm.sendYesNo("Hey! I'm Xiaopang, the hot air balloon operator. Want to ride the hot air balloon from the Shanghai Bund and head over to #b#m701010320##k to take a look?");

    } else if (status == 1) {

        cm.sendNext("Hold on tight, the hot air balloon is about to take off!");

    } else if (status == 2) {

        cm.warp(701010320, "h-top");

        cm.dispose();

    }

}


