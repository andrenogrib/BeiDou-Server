/*
   Custom player command: @checkin - opens the BeiDouSpecial "每日签到" (Daily Check-in) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
   NOTE: the daily flag relies on an external daily-reset job clearing the
   '每日签到' extend value, otherwise a player can only claim once ever.
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class CheckinCommand extends Command {
    {
        setDescription("Daily check-in reward.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "每日签到");
    }
}
