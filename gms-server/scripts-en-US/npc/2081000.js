/*
    en-US override for NPC 2081000.

    Two roles, selected by map:
      - On 240040700 (Cave of Life - Entrance): a custom "Horntail Helper" (see
        claude/NPCS-CRIADOS.md) placed on the left side of the entrance floor, clear of the gate
        NPC 2081005 and the dragon-morph portals. Horntail is normally a 6-player Expedition reached
        through a trial maze; this lets a SINGLE player take him on:
          1. Instant solo fight -> warps you into Horntail's arena (240060200) and summons the full
             Horntail right away (spawnHorntailOnGroundBelow at 71,260, exactly what the @horntail
             command / reactor 2401000 do). Leave via the escape robot.
          2. Authentic expedition (solo) -> warps you straight to the recruiter map (240050400),
             skipping the entrance gate + trial maze. With use_enable_solo_expeditions enabled the
             recruiter (NPC 2083004) lets a single player create + start the real HorntailBattle
             (two heads, then Horntail) with the native exit and rewards.

      - On any other map (its real home, the Leafre "Magic Seed" merchant): reproduces the ORIGINAL
        2081000 behaviour verbatim, so the en-US override does not break it.
*/

var status = -1;
var sel;
var temp;
var cost;

var HELPER_MAP = 240040700;
var ARENA_MAP = 240060200;     // Horntail's arena (final stage of the HorntailBattle event)
var RECRUIT_MAP = 240050400;   // authentic HorntailBattle recruiter (NPC 2083004)
var HT_SPAWN_X = 71;           // canonical Horntail spawn point (reactor 2401000 act)
var HT_SPAWN_Y = 260;

function start() {
    if (cm.getMapId() == HELPER_MAP) {
        status = -1;
        action(1, 0, 0);
    } else {
        origStart();
    }
}

function action(mode, type, selection) {
    if (cm.getMapId() != HELPER_MAP) {
        origAction(mode, type, selection);
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
        cm.sendSimple("#e[Horntail Helper]#n\r\nBeyond this cave lies #rHorntail#k, ruler of the Leafre canyons. "
            + "Normally you'd need a #r6-player Expedition#k and the trial maze to even reach him.\r\n"
            + "#bHorntail is Level 100+ end-game content - go prepared!#k\r\n\r\n"
            + "#L0#Take me straight to Horntail (instant solo fight)#l\r\n"
            + "#L1#Take me to the Horntail Expedition (authentic)#l\r\n"
            + "#L2#How does this work?#l");
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {                                   // Instant solo fight
            cm.sendNext("I'll drop you into #rHorntail's Cave#k and #bsummon Horntail right away#k.\r\n\r\n"
                + "Fight him where you land. When you're done (or want out), talk to the #bescape robot#k on the "
                + "left side of the cave to leave. Good luck!");
        } else if (sel == 1) {                            // Authentic expedition (solo)
            cm.warp(RECRUIT_MAP);
            cm.dispose();
        } else {                                          // How does this work?
            cm.sendOk("Normally #rHorntail#k is a #r6-player Expedition#k: you clear the entrance gate, then a "
                + "trial maze, then recruit a full squad. This server can do it #bsolo#k.\r\n\r\n"
                + "#bInstant#k summons Horntail directly so you can fight him alone right now. #bExpedition#k drops "
                + "you at the recruiter so you can run the real fight (two heads, then Horntail) by yourself with the "
                + "proper exit and rewards. The normal party route still works exactly as before.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 0) {                                   // confirmed instant fight
            // Warp into the arena, then summon the full Horntail (body 8810018 + every part) exactly
            // like reactor 2401000's act() / the @horntail GM command. No event instance needed.
            cm.warp(ARENA_MAP);
            cm.getPlayer().getMap().spawnHorntailOnGroundBelow(new java.awt.Point(HT_SPAWN_X, HT_SPAWN_Y));
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

/* ----------------------------------------------------------------------------
   Original NPC 2081000 - Leafre "Magic Seed" merchant, preserved verbatim.
   ---------------------------------------------------------------------------- */
function origStart() {
    status = 0;
    cm.sendSimple("...Can I help you?\r\n#L0##bBuy the Magic Seed#k#l\r\n#L1##bDo something for Leafre#k#l");
}

function origAction(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("Please think carefully. Once you have made your decision, let me know.");
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
        if (selection == 0) {
            cm.sendSimple("You don't seem to be from out town. How can I help you?#L0##bI would like some #t4031346#.#k#l");
        } else {
            cm.sendNext("Under development...");
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendGetNumber("#b#t4031346##k is a precious iteml I cannot give it to you just like that. How about doing me a little favor? Then I'll give it to you. I'll sell the #b#t4031346##k to you for #b30,000 mesos#k each. Are you willing to make the purchase? How many would you like, then?", 0, 0, 99);
    } else if (status == 3) {
        if (selection == 0) {
            cm.sendOk("I can't sell you 0.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 30000;
            cm.sendYesNo("Buying #b" + temp + " #t4031346#(s)#k will cost you #b" + cost + " mesos#k. Are you sure you want to make the purchase?");
        }
    } else if (status == 4) {
        if (cm.getMeso() < cost || !cm.canHold(4031346)) {
            cm.sendOk("Please check and see if you have enough mesos to make the purchase. Also, I suggest you check the etc. inventory and see if you have enough space available to make the purchase.");
        } else {
            cm.sendOk("See you again~");
            cm.gainItem(4031346, temp);
            cm.gainMeso(-cost);
        }
        cm.dispose();
    }
}
