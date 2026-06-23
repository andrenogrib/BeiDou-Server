/*
   Custom player command: @reborn - opens the BeiDouSpecial "转世重生" (Rebirth) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class RebornCommand extends Command {
    {
        setDescription("Rebirth your character (reincarnation).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "转世重生");
    }
}
