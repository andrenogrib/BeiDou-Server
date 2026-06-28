/*
    en-US override for NPC 2030010 (Amon) - the "leave" NPC on the Zakum maps
    (Breath of Lava 280020000 / 280020001 and Last Mission: Zakum's Altar 280030000).

    Only change vs the base script: the 280030000 branch used to call
    cm.getEventInstance().isEventCleared() unconditionally, which throws a NullPointerException
    (and the NPC silently "does nothing") when a player reaches the altar WITHOUT an active
    Expedition instance — e.g. via the @guild/Zakum Helper express solo warp. We null-guard the
    event instance so leaving always works. All other behaviour is preserved verbatim.

    See claude/MODIFICACOES-CODIGO.md / NPCS-CRIADOS.md (Zakum solo flow).
*/

function start() {
    if (cm.getMapId() == 280030000) {
        var ei = cm.getEventInstance();
        if (ei != null && ei.isEventCleared()) {
            cm.sendYesNo("You guys finally overthrew Zakum, what a superb feat! Congratulations! Are you sure you want to leave now?");
        } else {
            cm.sendYesNo("If you leave now, you'll have to start over. Are you sure you want to leave?");
        }
    } else {
        cm.sendYesNo("If you leave now, you'll have to start over. Are you sure you want to leave?");
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        cm.warp(211042300);
        cm.dispose();
    }
}
