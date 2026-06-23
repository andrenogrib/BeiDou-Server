/*
   Custom player command: @mapdrops - opens the BeiDouSpecial "当前地图掉落"
   (Current Map Drops) parent menu script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class MapDropsCommand extends Command {
    {
        setDescription("View the current map's drops.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "当前地图掉落");
    }
}
