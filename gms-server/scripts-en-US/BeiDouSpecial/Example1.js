/**
 * @description 示例脚本1-非nextLevel实现
 * @author 昨日小睡
 */

var status;
var firstSelection;
const BEI_DOU_SATELLITE_MANUAL = 2430033;
const MAPLE_LEAF = 4001126;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    if (status === 0) {
        let text = "Use the following items to exchange for #r#t2430033##k #i2430033# one copy\r\n\r\n";
        text += "#L0#10 Million Mesos#l\r\n";
        text += "#L1#1000 NX#l\r\n";
        text += "#L2#10,000 Maple Leaves#l\r\n";
        text += "#L3#Redeem Code#l\r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        firstSelection = selection;
        if (selection === 0) {
            if (cm.getMeso() < 10000000) {
                cm.sendOk("Not enough Mesos");
                cm.dispose();
            } else if (!cm.canHold(BEI_DOU_SATELLITE_MANUAL, 1)) {
                cm.sendOk("Not enough inventory space");
                cm.dispose();
            } else {
                cm.gainMeso(-10000000);
                successGain(1);
            }
        } else if (selection === 1) {
            if (cm.getPlayer().getCashShop().getCash(1) < 1000) {
                cm.sendOk("Not enough NX");
                cm.dispose();
            } else if (!cm.canHold(BEI_DOU_SATELLITE_MANUAL, 1)) {
                cm.sendOk("Not enough inventory space");
                cm.dispose();
            } else {
                cm.getPlayer().getCashShop().gainCash(1, -1000);
                successGain(1);
            }
        } else if (selection === 2) {
            let itemQuantity = cm.getItemQuantity(MAPLE_LEAF);
            if (itemQuantity >= 10000) {
                cm.sendGetNumber("Please enter the exchange quantity", 1, 1, 999);
            } else {
                cm.sendOk("Not enough Maple Leaves");
                cm.dispose();
            }
        } else if (selection === 3) {
            cm.sendGetText("Please enter the redeem code");
        } else {
            cm.dispose();
        }
    } else if (status === 2) {
        if (firstSelection === 2) {
            let itemQuantity = cm.getItemQuantity(MAPLE_LEAF);
            let cost = selection * 10000;
            if (itemQuantity < cost) {
                cm.sendOk("Not enough Maple Leaves");
                cm.dispose();
            } else if (!cm.canHold(BEI_DOU_SATELLITE_MANUAL, selection)) {
                cm.sendOk("Not enough inventory space");
                cm.dispose();
            } else {
                cm.gainItem(MAPLE_LEAF, -cost);
                successGain(selection);
            }
        } else if (firstSelection === 3) {
            const inputCode = cm.getText();
            if ("BeiDou_YYDS" === inputCode) {
                if (cm.canHold(BEI_DOU_SATELLITE_MANUAL, 1)) {
                    successGain(1);
                } else {
                    cm.sendOk("Not enough inventory space");
                    cm.dispose();
                }
            } else {
                cm.sendOk("Invalid redeem code");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

function successGain(quantity) {
    cm.gainItem(BEI_DOU_SATELLITE_MANUAL, quantity);
    cm.sendOk("Exchange successful");
    cm.dispose();
}