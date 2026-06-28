/*
    en-US override for NPC 2030000 (Jeff).

    Two roles, selected by map:
      - On 211042300 (The Door to Zakum): a custom "Zakum Helper" placed next to Adobis
        (see claude/NPCS-CRIADOS.md). It lets a SINGLE player skip the Zakum prequest grind:
          1. Unlock everything  -> grants quest 100200 (masters' approval), completes quest
             100201 (the trials) and hands over Eye of Fire (4001017). The normal Adobis /
             portal Zakum05 flow then works.
          2. Express to the Altar (solo) -> grants the above if missing, resets the altar
             reactor (2111001) so the Eye of Fire drop always triggers, and warps straight to
             280030000 (Zakum's Altar), bypassing the 6-player Expedition wall (NPC 2030013).
             Drop one Eye of Fire on the altar there to summon Zakum.
        The original guild/Zakum NPCs (2030008 / 2030013 / 2030010) are left untouched, so the
        canonical 6-player Expedition flow still works for anyone who wants it.

      - On any other map (the real Jeff on Ice Valley II, 211040200): reproduces the ORIGINAL
        Jeff "Dungeon Guide" behaviour verbatim, so the en-US override does not break him.
*/

var status = -1;
var sel;

var EYE_OF_FIRE = 4001017;
var ALTAR_MAP = 280030000;
var ALTAR_REACTOR = 2111001;
var Q_APPROVAL = 100200;   // masters' approval to attempt Zakum
var Q_TRIALS = 100201;     // the trials are done

function start() {
    if (cm.getMapId() == 211042300) {
        status = -1;
        action(1, 0, 0);
    } else {
        jeffStart();
    }
}

function action(mode, type, selection) {
    if (cm.getMapId() != 211042300) {
        jeffAction(mode, type, selection);
        return;
    }

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {   // backed out of the main menu
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.sendSimple("#e[Zakum Helper]#n\r\nAdobis is busy, so I handle the paperwork. "
            + "I can fast-track your #rZakum#k challenge.\r\n"
            + "#bZakum is Level 50+ content and hits very hard — go prepared!#k\r\n\r\n"
            + "#L0#Unlock everything for Zakum (skip the prequests)#l\r\n"
            + "#L1#Take me straight to Zakum's Altar (solo fight)#l\r\n"
            + "#L2#How does this work?#l");
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {                                   // Unlock everything
            grantZakumQuests();
            if (!cm.haveItem(EYE_OF_FIRE, 1)) {
                cm.gainItem(EYE_OF_FIRE, 5);              // starter pack only if you have none
            }
            cm.sendOk("All set! I've secured the masters' approval and marked the #btrials#k complete, "
                + "and made sure you have some #b#t" + EYE_OF_FIRE + "##k.\r\n\r\n"
                + "You can now take the normal #bDoor to Zakum#k portal here, or come back and pick the "
                + "express option to fight #rZakum#k solo. At the altar, #bdrop one " + "#t" + EYE_OF_FIRE + "##k on it to summon Zakum.");
            cm.dispose();
        } else if (sel == 1) {                            // Express to the Altar (solo)
            cm.sendNext("Off you go to #rZakum's Altar#k — I'll hand you a fresh #b#t" + EYE_OF_FIRE + "##k on the way.\r\n\r\n"
                + "Land on the left, walk to the #baltar in the middle#k, and #bdrop the #t" + EYE_OF_FIRE + "##k on it to summon Zakum. "
                + "When you're done (or want out), talk to #bAmon#k to leave. Good luck!");
        } else {                                          // How does this work?
            cm.sendOk("Normally you'd need the masters' approval, clear three #btrials#k for the "
                + "#t" + EYE_OF_FIRE + "#, then gather a #r6-player Expedition#k to even reach the altar.\r\n\r\n"
                + "I skip all of that for you: I grant the approval + trials + Eye of Fire, and I can warp you "
                + "straight to the altar so you can take #rZakum#k on alone. The normal Expedition route still "
                + "works exactly as before if you'd rather do it with friends.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 1) {                                   // confirmed express warp
            grantZakumQuests();
            if (!cm.haveItem(EYE_OF_FIRE, 1)) {
                cm.gainItem(EYE_OF_FIRE, 1);              // make sure you have an Eye of Fire to drop
            }
            // Fully reset the altar-map reactors BEFORE warping in. resetReactors() restores state 0
            // AND setAlive(true) + shouldCollect, so the summon reactor (2111001) accepts a dropped
            // Eye of Fire even if a previous solo run left it triggered/dead. forceHitReactor alone
            // did NOT revive it (isActive()==false made the 5s activation abort).
            var altarMap = cm.getClient().getChannelServer().getMapFactory().getMap(ALTAR_MAP);
            if (altarMap != null) {
                altarMap.resetReactors();
            }
            cm.warp(ALTAR_MAP);
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

// Grant the Zakum prerequisite quests (idempotent-friendly). The Eye of Fire is handed out
// separately so the express trip can always top you up with a fresh one (it's consumed on the altar).
function grantZakumQuests() {
    if (!(cm.isQuestStarted(Q_APPROVAL) || cm.isQuestCompleted(Q_APPROVAL))) {
        cm.forceStartQuest(Q_APPROVAL);
    }
    if (!cm.isQuestCompleted(Q_TRIALS)) {
        cm.forceCompleteQuest(Q_TRIALS);
    }
}

/* ----------------------------------------------------------------------------
   Original Jeff (Dungeon Guide) - Ice Valley II (211040200), preserved verbatim.
   ---------------------------------------------------------------------------- */
function jeffStart() {
    status = 0;
    if (cm.haveItem(4031450, 1)) {
        cm.warp(921100100, 1);
        cm.dispose();
        return;
    }
    cm.sendNext("Hey, you look like you want to go farther and deeper past this place. Over there, though, you'll find yourself surrounded by aggressive, dangerous monsters, so even if you feel that you're ready to go, please be careful. Long ago, a few brave men from our town went in wanting to eliminate anyone threatening the town, but never came back out...");
}

function jeffAction(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 1 && mode == 0 && cm.getLevel() > 49) {
        cm.sendNext("Even if your level's high it's hard to actually go in there, but if you ever change your mind, please find me. After all, my job is to protect this place.");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 1) {
        if (cm.getLevel() > 49) {
            cm.sendYesNo("If you are thinking of going in, I suggest you change your mind. But if you really want to go in... I'm only letting in the ones that are strong enough to stay alive in there. I do not wish to see anyone else die. Let's see... Hmmm...! You look pretty strong. All right, do you want to go in?");
        } else {
            cm.sendPrev("If you are thinking of going in, I suggest you change your mind. But if you really want to go in... I'm only letting in the ones that are strong enough to stay alive in there. I do not wish to see anyone else die. Let's see... Hmmm... You haven't reached Level 50 yet. I can't let you in, then, so forget it.");
        }
    } else if (status == 2) {
        if (cm.getLevel() >= 50) {
            cm.warp(211040300, 5);
        }
        cm.dispose();
    }
}
