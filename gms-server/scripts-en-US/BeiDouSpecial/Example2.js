/**
 * @description 示例脚本2-nextLevel实现
 * 注意，所有的输入的nextLevel都是字符串类型的，不一定是数字
 * @author 昨日小睡
 */

const BEI_DOU_SATELLITE_MANUAL = 2430033;
const MAPLE_LEAF = 4001126;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "Use the following items to exchange for #r#t2430033##k #i2430033# (one copy)\r\n\r\n";
    text += "#L0#10 Million Mesos#l\r\n";
    text += "#L1#1000 NX Cash#l\r\n";
    text += "#L2#10,000 Maple Leaves#l\r\n";
    text += "#L3#Redemption Code#l\r\n";
    cm.sendSelectLevel(text);
}

function level0() {
    if (cm.getMeso() < 10000000) {
        cm.sendOk("Not enough mesos.");
        cm.dispose();
    } else if (!cm.canHold(BEI_DOU_SATELLITE_MANUAL, 1)) {
        cm.sendOk("Not enough inventory space.");
        cm.dispose();
    } else {
        cm.gainMeso(-10000000);
        successGain(1);
    }
}

function level1() {
    if (cm.getPlayer().getCashShop().getCash(1) < 1000) {
        cm.sendOk("Not enough NX Cash.");
        cm.dispose();
    } else if (!cm.canHold(BEI_DOU_SATELLITE_MANUAL, 1)) {
        cm.sendOk("Not enough inventory space.");
        cm.dispose();
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -1000);
        successGain(1);
    }
}

/**
 * @description getInputNumberLevel 自定义下一步执行哪个level
 */
function level2() {
    let itemQuantity = cm.getItemQuantity(4001126);
    if (itemQuantity >= 10000) {
        cm.getInputNumberLevel("21", "Please enter the quantity to exchange.", 1, 1, 999);
    } else {
        cm.sendOk("Not enough Maple Leaves.");
        cm.dispose();
    }
}

/**
 * @description 如果是getInputNumberLevel进来的，会自动把玩家输入的数字传入
 *
 * @param inputNum 玩家输入
 */
function level21(inputNum) {
    let itemQuantity = cm.getItemQuantity(MAPLE_LEAF);
    let cost = inputNum * 10000;
    if (itemQuantity < cost) {
        cm.sendOk("Not enough Maple Leaves.");
        cm.dispose();
    } else if (!cm.canHold(BEI_DOU_SATELLITE_MANUAL, inputNum)) {
        cm.sendOk("Not enough inventory space.");
        cm.dispose();
    } else {
        cm.gainItem(MAPLE_LEAF, -cost);
        successGain(inputNum);
    }
}

function level3() {
    cm.getInputTextLevel("31", "Please enter the redemption code.");
}

/**
 * @description 如果是getInputTextLevel进来的，会自动把玩家输入的字符串传入
 *
 * @param inputText 玩家输入
 */
function level31(inputText) {
    if ("BeiDou_YYDS" === inputText) {
        if (cm.canHold(BEI_DOU_SATELLITE_MANUAL, 1)) {
            successGain(1);
        } else {
            cm.sendOk("Not enough inventory space.");
            cm.dispose();
        }
    } else {
        cm.sendOk("Invalid redemption code.");
        cm.dispose();
    }
}

function successGain(quantity) {
    cm.gainItem(BEI_DOU_SATELLITE_MANUAL, quantity);
    cm.sendOk("Exchange successful!");
    cm.dispose();
}