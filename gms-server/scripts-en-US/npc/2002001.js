/*
 * 2002001 - Rudi, Tree Ornament Merchant
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
        return;
    }

    status++;

    if (status == 0) {
        cm.sendYesNo("Want to decorate your Christmas tree? I have all kinds of ornaments here. Care to take a look?");
    } else if (status == 1) {
        cm.openShopNPC(2090003);
        cm.dispose();
    }
}
