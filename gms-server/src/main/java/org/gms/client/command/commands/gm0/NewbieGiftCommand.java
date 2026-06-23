/*
   Custom player command: @newbiegift - opens the BeiDouSpecial "新人福利" (Newbie Welfare) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class NewbieGiftCommand extends Command {
    {
        setDescription("Claim the one-time newbie gift.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "新人福利");
    }
}
