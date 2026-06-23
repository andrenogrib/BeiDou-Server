var status;
var jobId = 0;

function start() {
    status = -1;
    //const GameConfig = Java.type('org.gms.config.GameConfig');
    //if (!GameConfig.getServerBoolean("use_rebirth_system"))
      //  cm.sendOk("Rebirth is not allowed on this server. How did you even get here?");
        //cm.dispose();
        //return;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status === 0) {
        cm.sendNext("Whenever you feel ready to be #breborn#k again, come and find me.\r\n\r\nYou currently have a total of #r" + cm.getChar().getReborns() + "#k rebirths.");
    } else if (status === 1) {
        cm.sendSimple("What would you like me to do for you today?\r\n\r\n#L0##bI want to be reborn!#k#l\r\n#L1##bNothing for now...#k#l");
    } else if (status === 2) {
        if (selection === 0) {
            if (cm.getChar().getLevel() === cm.getChar().getMaxClassLevel()) {
                cm.sendSimple("I see... Which path would you like to choose?\r\n\r\n#L0##bExplorer (Beginner)#k#l\r\n");//*#L1##bCygnus Knights (Noblesse)#l\r\n#L2##bAran (Legend)#l
            } else {
                cm.sendOk("It looks like your adventure isn't over yet... Come back when you reach level #r" + cm.getChar().getMaxClassLevel() + "#k.");
                cm.dispose();
            }
        } else if (selection === 1) {
            cm.sendOk("See you soon!");
            cm.dispose();
        }
    } else if (status === 3) {
        // 0 => beginner, 1000 => noblesse, 2000 => legend
        // makes this very easy :-)
        jobId = selection * 1000;

        var job = "";
        if (selection === 0) job = "0";
        else if (selection === 1) job = "1000";
        else if (selection === 2) job = "2000";
        cm.sendYesNo("Are you sure you want to be reborn as an #bExplorer#k?");
    }
    else if (status === 4 && type === 1) {
        cm.getChar().executeRebornAsId(jobId);
        cm.dropMessage(0, "Congratulations #r" + cm.getPlayer() + "#k on completing rebirth number #r" + cm.getChar().getReborns() + "#k!");
        cm.dispose();
    }
}