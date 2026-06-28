/*
    en-US override for NPC 2041025 (escape robot).

    Two roles, selected by map:
      - On 240060200 (Horntail's Cave arena): a custom exit for the solo "Horntail Helper" run
        (see claude/NPCS-CRIADOS.md). The arena has no town portal, so this robot warps a solo
        player back to the Cave of Life entrance (240040700) when they're done with Horntail.

      - On its home map 220080000 (the Papulatus gate): reproduces the ORIGINAL escape-robot
        behaviour verbatim (warp out to 220080000), so the Papulatus exit is unaffected.
*/

var HT_ARENA_MAP = 240060200;
var LEAFRE_ENTRANCE = 240040700;

function start() {
    if (cm.getMapId() == HT_ARENA_MAP) {
        cm.sendYesNo("Beep... beep... done with #rHorntail#k? I can warp you back to the #bCave of Life entrance#k. "
            + "Beep... would you like to leave this place?");
    } else {
        cm.sendYesNo("Beep... beep... you can make your escape to a safer place through me. Beep... beep... would you like to leave this place?");
    }
}

function action(mode, type, selection) {
    if (mode > 0) {
        if (cm.getMapId() == HT_ARENA_MAP) {
            cm.warp(LEAFRE_ENTRANCE);
        } else {
            cm.warp(220080000);
        }
    }
    cm.dispose();
}
