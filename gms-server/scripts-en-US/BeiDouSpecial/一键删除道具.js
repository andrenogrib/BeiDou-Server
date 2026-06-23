var status;
var text;
var column = ["Equip", "Use", "Setup", "Etc", "Cash"];
var sel;


function start() {
    levelStart();
}

// Conversation start
function levelStart() {
    text = "#r#eDelete Items#n#k\r\n\r\nWhich inventory tab would you like to clean up?\r\n\r\n";
    for (let i = 1; i <= 5; i++) {
        text += "#L" + i + "##bDelete items in the " + column[i-1] + " tab#k#l\r\n";
    }
    // Choose which inventory tab to clear
    cm.sendNextSelectLevel("ChooseInventory", text);
}

// Inventory tab selected
function levelChooseInventory(choose) {
    sel = choose;
    // Choose between clearing everything or deleting a specific item
    cm.sendSelectLevel("ChooseType", "How would you like to clean up the #b" + column[sel-1] + "#k tab?\r\n\r\n#L1##bClear all items#k#l\r\n#L2##bDelete a specific item#k#l\r\n");
}

// Delete method 1 selected
function levelChooseType1() {
    // "No" returns to levelStart, "Yes" runs levelDoClear
    cm.sendYesNoLevel("Start", "DoClear", "Are you sure you want to clear #rall#k items in the #b" + column[sel-1] + "#k tab?\r\n\r\n#rThis action cannot be undone!#k");
}

// Delete method 2 selected
function levelChooseType2() {
    text = "#r#eSelect an Item#n#k\r\n\r\nChoose the item you would like to delete:\r\n\r\n";
    let hasVal = false;
    for (let i = 0; i < 96; i++) {
        let item = cm.getInventory(sel).getItem(i);
        if (item) {
            hasVal = true;
            text += "#L" + item.getPosition() + "##i" + item.getItemId() + "# #b#t" + item.getItemId() + "##k#l\r\n";
        }
    }
    if (!hasVal) {
        // Return to levelStart
        cm.sendNextLevel("Start", "There are no items in the #b" + column[sel-1] + "#k tab!");
        return;
    }
    // Choose a single item
    cm.sendNextSelectLevel("DoRemove", text);
}

// "Yes" was chosen for clearing
function levelDoClear() {
    cm.removeAllByInventory(sel);
    // Return to levelStart
    cm.sendOkLevel("Start", "The #b" + column[sel-1] + "#k tab has been #rcleared#k!");
}

// Perform the delete operation
function levelDoRemove(choose) {
    cm.removeAllByInventorySlot(sel, choose);
    // Return to the single-item selection
    cm.sendNextLevel("ChooseType2", "The item has been #rdeleted#k!");
}
