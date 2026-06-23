/**
 * Feature: look up drop rates by item category
 * Combined version (50 per page, shows IDs, no sub-categories, includes job skill books)
 * Version: 1.0
 * Author: Jason
 * Date: February 13, 2026
 */

// Import Java classes
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var MonsterInformationProvider = Java.type('org.gms.server.life.MonsterInformationProvider');
var QuestInfo = Java.type('org.gms.server.quest.Quest');
var DatabaseConnection = Java.type('org.gms.util.DatabaseConnection');

// Constants
const ITEMS_PER_PAGE = 50;

// Global variables
var currentCategory = "";
var categoryItems = [];
var currentPage = 0;
var totalResults = 0;
var currentMainCategory = 0; // Stores the main category ID (used for going back)

// Main category ID ranges (merged intervals)
var categoryRanges = {
    1: { name: "Warrior Weapons", ranges: [[1302000,1302999], [1402000,1402999], [1312000,1312999], [1412000,1412999], [1322000,1322999], [1422000,1422999], [1432000,1432999], [1442000,1442999]] },
    2: { name: "Mage Weapons", ranges: [[1372000,1372999], [1382000,1382999]] },
    3: { name: "Bowman Weapons", ranges: [[1452000,1452999], [1462000,1462999]] },
    4: { name: "Thief Weapons", ranges: [[1332000,1332999], [1472000,1472999], [1342000,1342999]] },
    5: { name: "Pirate Weapons", ranges: [[1482000,1482999], [1492000,1492999]] },
    6: { name: "Armor", ranges: [[1002000,1003999], [1042000,1042999], [1052000,1052999], [1062000,1062999], [1072000,1072999], [1082000,1082999], [1092000,1092999], [1102000,1102999]] },
    7: { name: "Accessories", ranges: [[1112000,1112999], [1122000,1122999], [1132000,1132999], [1152000,1152999], [1032000,1032999], [1022000,1022999], [1012000,1012999]] },
    8: { name: "Use Items", ranges: [[2000000,2999999]] },
    9: { name: "Scrolls/Enhancement", ranges: [[2040000,2049999]] },
    10: { name: "Etc Items", ranges: [[4000000,4039999]] },
    11: { name: "Job Skill Books", ranges: [[2280000,2299999]] } // Added: skill books (228) and mastery books (229)
};

function start() {
    levelStart();
}

/**
 * Main menu
 */
function levelStart() {
    var text = "Welcome to the #bDrop Lookup#k! Pick an item category and I'll show you which monsters drop it.\r\n\r\n";
    text += "#r#eItem Categories#n#k\r\n";
    text += "#L1##bWarrior Weapons#k#l\r\n";
    text += "#L2##bMage Weapons#k#l\r\n";
    text += "#L3##bBowman Weapons#k#l\r\n";
    text += "#L4##bThief Weapons#k#l\r\n";
    text += "#L5##bPirate Weapons#k#l\r\n";
    text += "#L6##bArmor#k#l\r\n";
    text += "#L7##bAccessories#k#l\r\n";
    text += "#L8##bUse Items#k#l\r\n";
    text += "#L9##bScrolls / Enhancement#k#l\r\n";
    text += "#L10##bEtc Items#k#l\r\n";
    text += "#L11##bJob Skill Books#k#l\r\n\r\n";
    text += "#L12##bClose#k#l";

    cm.sendNextSelectLevel('handleMainSelection', text, 2);
}

/**
 * Handle main menu selection
 */
function levelhandleMainSelection(selection) {
    var sel = parseInt(selection);
    if (sel >= 1 && sel <= 11) {
        currentMainCategory = sel;
        loadCategoryItems(sel);
    } else if (sel == 12) {
        cm.dispose();
    } else {
        levelStart();
    }
}

// ============ Load item list ============
function loadCategoryItems(categoryId) {
    var category = categoryRanges[categoryId];
    currentCategory = category.name;
    categoryItems = [];
    currentPage = 0;

    try {
        var con = DatabaseConnection.getConnection();
        // Build dynamic SQL: join multiple BETWEEN clauses with OR
        var sql = "SELECT itemid FROM drop_data WHERE ";
        var conditions = [];
        var params = [];
        for (var i = 0; i < category.ranges.length; i++) {
            conditions.push("(itemid BETWEEN ? AND ?)");
            params.push(category.ranges[i][0], category.ranges[i][1]);
        }
        sql += conditions.join(" OR ");
        sql += " GROUP BY itemid LIMIT 200"; // Fetch at most 200 items
        
        var ps = con.prepareStatement(sql);
        for (var i = 0; i < params.length; i++) {
            ps.setInt(i+1, params[i]);
        }
        var rs = ps.executeQuery();
        
        while (rs.next()) {
            var itemId = rs.getInt("itemid");
            var itemName = ItemInformationProvider.getInstance().getName(itemId);
            if (itemName != null && itemName != "MISSINGNO") {
                categoryItems.push({
                    id: itemId,
                    name: itemName
                });
            }
        }
        
        rs.close();
        ps.close();
        con.close();
        
        if (categoryItems.length == 0) {
            cm.sendOkLevel('levelStart', "#rNo items with drop records were found in this category.#k", 2);
            return;
        }

        // Sort by name
        categoryItems.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        totalResults = categoryItems.length;
        showCategoryItems();

    } catch (e) {
        cm.sendOkLevel('levelStart', "#rAn error occurred while loading the item list:#k " + e, 2);
    }
}

/**
 * Show item list (paged, with IDs)
 */
function showCategoryItems() {
    var start = currentPage * ITEMS_PER_PAGE;
    var end = Math.min(start + ITEMS_PER_PAGE, totalResults);

    var text = "#r#e" + currentCategory + "#n#k  -  Item List (Total: #b" + totalResults + "#k)\r\n\r\n";

    for (var i = start; i < end; i++) {
        var item = categoryItems[i];
        text += "#L" + item.id + "##v" + item.id + "# #b" + item.name + "#k (ID: " + item.id + ")#l\r\n";
    }

    text += "\r\n";

    // Pagination controls (use large numbers to avoid clashing with item IDs)
    if (currentPage > 0) {
        text += "#L9000001##b<< Previous Page#k#l\r\n";
    }
    if (end < totalResults) {
        text += "#L9000002##bNext Page >>#k#l\r\n";
    }

    if (totalResults > ITEMS_PER_PAGE) {
        text += "\r\nPage #b" + (currentPage + 1) + "#k of #b" + Math.ceil(totalResults / ITEMS_PER_PAGE) + "#k\r\n";
    }

    text += "\r\n#L9000003##bBack to Previous Menu#k#l\r\n";
    text += "#L9000004##bBack to Main Menu#k#l";

    cm.sendNextSelectLevel('handleItemSelection', text, 2);
}

/**
 * Handle item list selection
 */
function levelhandleItemSelection(selection) {
    var sel = parseInt(selection);
    
    if (sel == 9000001) {
        currentPage--;
        showCategoryItems();
    } else if (sel == 9000002) {
        currentPage++;
        showCategoryItems();
    } else if (sel == 9000003) {
        // Back to previous menu: return to main menu (there are no sub-categories)
        levelStart();
    } else if (sel == 9000004) {
        levelStart();
    } else if (sel > 0) {
        // Handle item ID
        var itemId = sel;
        var itemName = ItemInformationProvider.getInstance().getName(itemId);
        if (itemName) {
            showItemDropInfo(itemId, itemName);
        } else {
            cm.sendOkLevel('showCategoryItems', "#rFailed to retrieve item information.#k", 2);
        }
    } else {
        cm.sendOkLevel('showCategoryItems', "#rInvalid selection.#k", 2);
    }
}

/**
 * Show item drop information
 */
function showItemDropInfo(itemId, itemName) {
    var msg = "#r#e" + itemName + "#n#k (ID: " + itemId + ")  -  Drop Information\r\n\r\n";
    
    try {
        var con = DatabaseConnection.getConnection();
        var ps = con.prepareStatement("SELECT dropperid, chance, questid FROM drop_data WHERE itemid = ? ORDER BY chance DESC LIMIT 30");
        ps.setInt(1, itemId);
        var rs = ps.executeQuery();
        
        var hasResults = false;
        var dropList = [];
        
        while (rs.next()) {
            hasResults = true;
            var mobId = rs.getInt("dropperid");
            var chance = rs.getInt("chance") / 10000;
            var questId = rs.getInt("questid");
            
            dropList.push({
                mobId: mobId,
                chance: chance,
                questId: questId
            });
        }
        
        rs.close();
        ps.close();
        con.close();
        
        if (!hasResults) {
            msg += "#rNo monsters are known to drop this item.#k";
        } else {
            for (var i = 0; i < dropList.length; i++) {
                var drop = dropList[i];
                var mobName = MonsterInformationProvider.getInstance().getMobNameFromId(drop.mobId);
                
                if (mobName != null) {
                    msg += "#b" + mobName + "#k (ID: " + drop.mobId + ")\r\n";
                    msg += "  #gDrop Rate: " + drop.chance.toFixed(4) + "%#k";
                    
                    var playerRate = drop.chance * cm.getPlayer().getDropRate() * cm.getPlayer().getFamilyDrop();
                    if (Math.abs(playerRate - drop.chance) > 0.0001) {
                        msg += " → #d" + playerRate.toFixed(4) + "%#k";
                    }
                    
                    if (drop.questId > 0) {
                        msg += " #r[Quest Item]#k";
                    }
                    msg += "\r\n\r\n";
                }
            }
        }
        
        msg += "\r\n#L9000003##bBack to Item List#k#l   #L9000004##bBack to Main Menu#k#l";

        cm.sendNextSelectLevel('handleDropInfo', msg, 2);

    } catch (e) {
        cm.sendOkLevel('showCategoryItems', "#rAn error occurred during the query:#k " + e, 2);
    }
}

/**
 * Handle selection on the drop-rate detail page
 */
function levelhandleDropInfo(selection) {
    var sel = parseInt(selection);
    if (sel == 9000003) {
        showCategoryItems();
    } else if (sel == 9000004) {
        levelStart();
    }
}

// Return target used for error handling
function levelshowCategoryItems() {
    showCategoryItems();
}