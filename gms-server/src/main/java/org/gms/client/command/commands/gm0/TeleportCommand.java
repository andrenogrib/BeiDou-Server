/*
   Custom player command: @teleport - opens the BeiDouSpecial "万能传送" (Universal Teleport) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class TeleportCommand extends Command {
    {
        setDescription("Open the universal teleporter (boss / leveling / town maps).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "万能传送");
    }
}
