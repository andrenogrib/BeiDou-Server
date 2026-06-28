/*
    en-US override for NPC 2081005 (Keroben, the Gatekeeper) - Cave of Life - Entrance (240040700).

    Keroben only lets you past if you are dragon-morphed (buff 2210003) OR hold the Dragon Squad pass
    #t4001086#. The dragon-morph portals on this map (cs00..cs05, script "hontale_morph") have no
    script implementation, so the pass is effectively the ONLY way in. Vanilla you earn it from quest
    7302 ("Honorary Dragon Squad Member") by turning in the squad marks + Zakum/Papulatus/Pianus marks.

    This override keeps Keroben's original behaviour (potion shop + "let me in") and, when he would
    normally just shoo a player away, adds an option to GRANT the pass (#t4001086#) and mark quest 7302
    complete - unlocking the authentic Horntail expedition route (Keroben -> 240050000 -> slate 2083000
    -> recruiter 2083004) for a solo player. The custom "Horntail Helper" (NPC 2081000) next to him also
    offers an instant solo summon and a direct warp to the recruiter.
*/

var price = 100000;
var SQUAD_PASS = 4001086;
var SQUAD_QUEST = 7302;

function isTransformed(ch) {
    const BuffStat = Java.type('org.gms.client.BuffStat');
    return ch.getBuffSource(BuffStat.MORPH) == 2210003;
}

function start() {
    if (isTransformed(cm.getPlayer()) || cm.haveItem(SQUAD_PASS)) {
        cm.sendSimple("Welcome to Cave of Life - Entrance ! Would you like to go inside and fight #rHorntail#k ? If you want to fight him, you may might need some #b#v2000005##k, so you can recover some HP if you have been hit by #rHorntail#k.\r\n#L1#I would like to buy 10 for 100,000 Mesos!#l\r\n#L2#No thanks, let me in now!#l");
    } else {
        cm.sendSimple("This is the cave of the mighty Horntail, supreme ruler of the Leafre Canyons. Only those #bdeemed worthy#k may pass, and #boutsiders#k are not welcome. Grrr...\r\n\r\n"
            + "#b...Still, you carry yourself like a fighter. I can vouch for you and grant you the #t" + SQUAD_PASS + "# so you may challenge #rHorntail#k.#k\r\n"
            + "#L3#Grant me the #t" + SQUAD_PASS + "# (unlock the Horntail expedition)#l");
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else if (selection == 1) {
        if (cm.getMeso() >= price) {
            if (!cm.canHold(2000005)) {
                cm.sendOk("Sorry, you don't have a slot on your inventory for the item!");
            } else {
                cm.gainMeso(-price);
                cm.gainItem(2000005, 10);
                cm.sendOk("Thank you for buying the potion. Use it as well!");
            }
        } else {
            cm.sendOk("Sorry, you don't have enough mesos to buy them!");
        }
        cm.dispose();
    } else if (selection == 2) {
        if (cm.getLevel() > 99) {
            cm.warp(240050000, 0);
        } else {
            cm.sendOk("I'm sorry. You need to be atleast level 100 or above to enter.");
        }
        cm.dispose();
    } else if (selection == 3) {
        // Grant the Dragon Squad pass (what Keroben + the slate 2083000 check) and mark the squad
        // prequest complete so the quest log reflects it. The pass is the real unlock; complete the
        // quest first in case its Act already hands the pass over, then top up only if still missing.
        if (!cm.isQuestCompleted(SQUAD_QUEST)) {
            cm.forceCompleteQuest(SQUAD_QUEST);
        }
        if (!cm.haveItem(SQUAD_PASS)) {
            cm.gainItem(SQUAD_PASS, 1);
        }
        cm.sendOk("Hmph... very well. I vouch for you. Here is the #b#t" + SQUAD_PASS + "##k - proof that you are an "
            + "honorary #bDragon Squad#k member.\r\n\r\nTalk to me again and I'll let you into the #rCave of Life#k. "
            + "Inside, the squad will receive you for the #rHorntail#k expedition (#bLevel 100+#k).");
        cm.dispose();
    } else {
        cm.dispose();
    }
}
