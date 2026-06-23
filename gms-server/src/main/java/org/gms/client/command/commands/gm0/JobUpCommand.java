/*
   Custom player command: @jobup - opens the BeiDouSpecial "快速转职" (Quick Job Advance) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class JobUpCommand extends Command {
    {
        setDescription("Advance your job (1st-4th).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "快速转职");
    }
}
