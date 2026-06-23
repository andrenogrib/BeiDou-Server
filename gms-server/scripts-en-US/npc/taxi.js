/*
 * taxi.js - Free city teleport (custom)
 *
 * Opened by the @taxi chat command (TaxiCommand.java) via openNpc(1012000, "taxi").
 * Free warp (no meso) to all main towns. Usable by any player.
 * Single-list menu with a header per continent. See claude/NPCS-CRIADOS.md (#2).
 */

var status = 0;
var selectedMap = -1;

// Destinations grouped by continent (header + city map ids), shown as one list.
var regions = [
    { name: "Maple Island",          maps: [10000, 60000, 1000000] },
    { name: "Victoria Island",       maps: [100000000, 101000000, 102000000, 103000000, 104000000, 105040300, 110000000, 120000000, 130000000, 140000000] },
    { name: "Ossyria",               maps: [200000000, 211000000, 220000000, 221000000, 222000000, 230000000, 240000000, 250000000, 251000000, 260000000, 261000000, 270000000] },
    { name: "Ellin Forest",          maps: [300000000] },
    { name: "Singapore / Malaysia",  maps: [540000000, 541000000, 550000000, 551000000] },
    { name: "Masteria",              maps: [600000000, 680000000] },
    { name: "Zipangu",               maps: [800000000, 801000000] }
];

// Flatten to an index -> mapId list aligned with the #L selection indices.
var maps = [];
for (var ri = 0; ri < regions.length; ri++) {
    for (var mi = 0; mi < regions[ri].maps.length; mi++) {
        maps.push(regions[ri].maps[mi]);
    }
}

function buildMenu() {
    var sel = "Where would you like to go? #rThe ride is free!#k";
    var idx = 0;
    for (var r = 0; r < regions.length; r++) {
        // blank line before each continent header, then a clean bold-red title
        sel += "\r\n\r\n#e#r" + regions[r].name + "#k#n";
        for (var m = 0; m < regions[r].maps.length; m++) {
            sel += "\r\n#L" + idx + "##b#m" + regions[r].maps[m] + "##k#l";
            idx++;
        }
        sel += "\r\n"; // extra blank line after each continent's list (spacing between continents)
    }
    return sel;
}

function start() {
    status = 0;
    cm.sendSimple(buildMenu());
}

function action(mode, type, selection) {
    if (mode != 1) {        // closed / back / end chat
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (selection < 0 || selection >= maps.length) {
            cm.dispose();
            return;
        }
        selectedMap = selection;
        status = 1;
        cm.sendYesNo("Travel to #b#m" + maps[selectedMap] + "##k? #r(Free)#k");
    } else if (status == 1) {
        cm.warp(maps[selectedMap], 0);
        cm.dispose();
    }
}
