/*
    @guild custom menu (Guild Hub).
    Opened by the @guild command (GuildCommand) via openNpc(2010007, "guildmenu").

    Lets a SINGLE player:
      - Create a guild with NO party requirement (cm.createGuildInstant -> bypasses the
        match-confirmation that NPC 2010007 enforces).
      - Create / change the guild emblem (guild leader; emblem APPLY needs the Guild HQ map).
      - Increase guild capacity / disband (guild leader).

    The original guild NPCs (2010007 / 2010008 / 2010009) are left untouched, so a player
    can still create a guild the normal way. See claude/MODIFICACOES-CODIGO.md (#4).
*/

var status = 0;
var sel;

function start() {
    cm.sendSimple("#e[Guild Hub]#n\r\nWhat would you like to do?\r\n\r\n"
        + "#b#L0#Create a Guild (no party needed)#l\r\n"
        + "#L1#Create / Change Guild Emblem#l\r\n"
        + "#L2#Increase Guild capacity#l\r\n"
        + "#L3#Disband Guild#l#k");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 1) {
        sel = selection;
        if (sel == 0) {                                   // Create a guild
            if (cm.getPlayer().getGuildId() > 0) {
                cm.sendOk("You are already in a Guild. Leave or disband it first.");
                cm.dispose();
                return;
            }
            cm.sendGetText("Enter a name for your Guild (3-12 letters or numbers, no spaces or symbols):");
        } else if (sel == 1) {                            // Emblem (works from anywhere)
            if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                cm.sendOk("Only the Guild Leader can create or change the Guild Emblem.");
                cm.dispose();
                return;
            }
            cm.getPlayer().genericGuildMessage(17);       // opens the client emblem editor
            cm.dispose();
        } else if (sel == 2) {                            // Increase capacity
            if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                cm.sendOk("Only the Guild Leader can increase the Guild's capacity.");
                cm.dispose();
                return;
            }
            var Guild = Java.type("org.gms.net.server.guild.Guild");
            cm.sendYesNo("Increase your Guild's capacity by #b5#k for #b"
                + Guild.getIncreaseGuildCost(cm.getPlayer().getGuild().getCapacity()) + " mesos#k. Continue?");
        } else if (sel == 3) {                            // Disband
            if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                cm.sendOk("Only the Guild Leader can disband the Guild.");
                cm.dispose();
                return;
            }
            cm.sendYesNo("Are you sure you want to disband your Guild? This cannot be undone and all your GP will be lost.");
        }
    } else if (status == 2) {
        if (sel == 0) {                                   // Create -> got the name
            var name = cm.getText();
            var result = cm.createGuildInstant(name);
            if (result == 0) {
                cm.sendOk("Your Guild '" + name + "' has been created and you are the #bGuild Master#k. Enjoy!");
            } else if (result == 1) {
                cm.sendOk("You are already in a Guild.");
            } else if (result == 2) {
                cm.sendOk("That name is not valid. Use 3-12 letters or numbers, no spaces or symbols.");
            } else if (result == 3) {
                cm.sendOk("You don't have enough mesos to create a Guild.");
            } else {
                cm.sendOk("That Guild name is already taken. Please try another one.");
            }
            cm.dispose();
        } else if (sel == 2) {                            // Increase capacity -> confirmed
            cm.getPlayer().increaseGuildCapacity();
            cm.dispose();
        } else if (sel == 3) {                            // Disband -> confirmed
            cm.getPlayer().disbandGuild();
            cm.sendOk("Your Guild has been disbanded.");
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}
