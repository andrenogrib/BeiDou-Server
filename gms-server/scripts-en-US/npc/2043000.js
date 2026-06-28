/*
    en-US override for NPC 2043000.

    Two roles, selected by map:
      - On 220080000 (The Path of Time, just before the Papulatus gate / NPC 2041024): a custom
        "Papulatus Helper" placed next to the gate. It lets a SINGLE player skip the Cracked-Dimension
        grind needed to summon Papulatus (see claude/NPCS-CRIADOS.md):
          1. Get the Piece of Cracked Dimension -> gives #t4031179# (the item you drop to summon).
          2. Express into the Machine Room (solo) -> warps straight to 220080001 (Origin of
             Clocktower), bypassing the party-only entry portal, and summons Papulatus directly
             by replicating reactor 2201004's act() (spawnMonster 8500000 @ -410,-400). We do NOT
             rely on the item drop here because reactor 2201004's item-trigger zone is a ~8px-wide
             spot on the elevated cracked-dimension ledge (WZ lt(53,-119)/rb(61,-84) + reactor pos
             (-181,-439) => abs x[-128..-120] y[-558..-523]); dropping off that exact spot - e.g.
             on the main floor where the default warp lands - never triggers it. Zakum's altar
             reactor (2111001) uses a 384px-wide zone, which is why the Zakum helper's drop is easy.
        Leaving the boss map works solo via NPC 2041025 (the escape robot) - no fix needed. The
        normal party flow (portal Populatus00 / PapulatusBattle event) is left untouched.

      - On any other map (the real 2043000 at Origin of Clock Tower, 922020300): reproduces the
        ORIGINAL behaviour verbatim, so the en-US override does not break it.
*/

var status = -1;
var sel;

var CRACKED_PIECE = 4031179;   // Piece of Cracked Dimension (dropped to summon Papulatus)
var BOSS_MAP = 220080001;      // Origin of Clocktower (boss map)
var SUMMON_REACTOR = 2201004;  // reactor that consumes the piece and summons Papulatus
var PAP_FIRST_STAGE = 8500000; // Papulatus first form; WZ revive chain 8500000 -> 8500001 -> 8500002
var PAP_SPAWN_X = -410;        // boss spawn point used by reactor 2201004's act()
var PAP_SPAWN_Y = -400;

function start() {
    if (cm.getMapId() == 220080000) {
        status = -1;
        action(1, 0, 0);
    } else {
        papStart();
    }
}

function action(mode, type, selection) {
    if (cm.getMapId() != 220080000) {
        papAction(mode, type, selection);
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
        cm.sendSimple("#e[Papulatus Helper]#n\r\nThe gate ahead leads to #rPapulatus#k, the Time Sphere. "
            + "I can give you the #b#t" + CRACKED_PIECE + "##k you need to summon it.\r\n"
            + "#bPapulatus is tough end-game content - go prepared!#k\r\n\r\n"
            + "#L0#Give me a #t" + CRACKED_PIECE + "##l\r\n"
            + "#L1#Take me into the Machine Room (solo fight)#l\r\n"
            + "#L2#How does this work?#l");
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {                                   // Get the piece
            cm.gainItem(CRACKED_PIECE, 1);
            cm.sendOk("Here's your #b#t" + CRACKED_PIECE + "##k. Head through the gate to the #bMachine Room#k "
                + "(#bOrigin of Clocktower#k). The trigger spot is small: #bjump up onto the elevated ledge#k and "
                + "#bstand right on the glowing crack#k, then #bdrop the #t" + CRACKED_PIECE + "##k there to summon "
                + "#rPapulatus#k. If dropping is fiddly, just use my #bMachine Room (solo)#k option instead - that "
                + "summons it for you automatically.");
            cm.dispose();
        } else if (sel == 1) {                            // Express to the boss map (solo)
            cm.sendNext("Off you go to the #rOrigin of Clocktower#k. I'll #bsummon #rPapulatus#k#b for you the moment you arrive#k - "
                + "no need to find the cracked dimension or drop anything.\r\n\r\n"
                + "Kill its first form and it morphs into the real #rPapulatus#k. "
                + "When you're done (or want out), talk to the #bescape robot#k to leave. Good luck!");
        } else {                                          // How does this work?
            cm.sendOk("Normally you'd clear the Forgotten/Warped Passage for the entry pass and the dimension pieces, "
                + "and bring a party through the gate. I skip all that: I give you the #t" + CRACKED_PIECE + "# and can warp "
                + "you straight into the Machine Room so you can take #rPapulatus#k on alone. Drop the piece on the cracked "
                + "dimension to summon the boss. The normal party route still works exactly as before.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 1) {                                   // confirmed express warp
            // Why we summon directly instead of relying on the item-drop reactor:
            // reactor 2201004's trigger zone is a tiny ~8px-wide spot (WZ lt(53,-119)/rb(61,-84),
            // i.e. abs x[-128..-120] y[-558..-523]) sitting on the elevated "cracked dimension"
            // ledge (foothold y=-538). Dropping anywhere else - including the main floor where the
            // default warp lands you - never enters that rectangle, so the drop silently does
            // nothing. Zakum's altar reactor uses a 384px-wide zone, which is why that one is easy.
            // To make the solo express reliable we replicate reactor 2201004's act() ourselves:
            // spawn the first Papulatus form at its canonical spot; the WZ revive chain
            // (8500000 -> 8500001 -> 8500002) then plays out as the full multi-stage fight.
            cm.warp(BOSS_MAP);
            cm.spawnMonster(PAP_FIRST_STAGE, PAP_SPAWN_X, PAP_SPAWN_Y);
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

/* ----------------------------------------------------------------------------
   Original NPC 2043000 - Origin of Clock Tower (922020300), preserved verbatim.
   ---------------------------------------------------------------------------- */
function papStart() {
    status = -1;
    papAction(1, 0, 0);
}

function papAction(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0 && type > 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.sendNext("You don't belong to this world... Return now.");
    } else if (status == 1) {
        cm.warp(220080000);
        cm.dispose();
    }
}
