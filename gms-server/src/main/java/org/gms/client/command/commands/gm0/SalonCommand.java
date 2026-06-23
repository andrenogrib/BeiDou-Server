/*
   Custom player command: @salon - opens the BeiDouSpecial "Salon" (Beauty Salon) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class SalonCommand extends Command {
    {
        setDescription("Open the beauty salon (hair, face, colors, skin).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "Salon");
    }
}
