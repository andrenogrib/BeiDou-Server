var status;
var text;
var column = ["Equip", "Use", "Setup", "Etc", "Cash"];
var sel;


function start() {
    levelStart();
}

// 对话开始
function levelStart() {
    text = "#eDelete Items#n\r\n\r\n";
    for (let i = 1; i <= 5; i++) {
        text += "#L" + i + "#Delete items in the " + column[i-1] + " tab#l\r\n";
    }
    // 选择删除哪一栏
    cm.sendNextSelectLevel("ChooseInventory", text);
}

// 选择了背包栏
function levelChooseInventory(choose) {
    sel = choose;
    // 选择全部清除，还是删除指定
    cm.sendSelectLevel("ChooseType", "#L1#Clear all items#l\r\n#L2#Delete a specific item#l\r\n");
}

// 选择了删除方式1
function levelChooseType1() {
    // 选择否回到levelStart，选择是执行levelDoClear
    cm.sendYesNoLevel("Start", "DoClear", "#rDo you want to clear all items in the " + column[sel-1] + " tab??? This action cannot be undone!#k");
}

// 选择了删除方式2
function levelChooseType2() {
    text = "Choose the item to delete\r\n\r\n";
    let hasVal = false;
    for (let i = 0; i < 96; i++) {
        let item = cm.getInventory(sel).getItem(i);
        if (item) {
            hasVal = true;
            text += "#L" + item.getPosition() + "##t" + item.getItemId() + "##i" + item.getItemId() + "##l\r\n";
        }
    }
    if (!hasVal) {
        // 回到levelStart
        cm.sendNextLevel("Start", "There are no items in this inventory tab!");
        return;
    }
    // 选择单个道具
    cm.sendNextSelectLevel("DoRemove", text);
}

// 是否清除选择了是
function levelDoClear() {
    cm.removeAllByInventory(sel);
    // 回到levelStart
    cm.sendOkLevel("Start", "Cleared!");
}

// 执行删除操作
function levelDoRemove(choose) {
    cm.removeAllByInventorySlot(sel, choose);
    // 回到选择单个道具
    cm.sendNextLevel("ChooseType2", "Cleared!");
}
