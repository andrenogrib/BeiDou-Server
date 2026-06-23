/*
   Custom GM command: !spawnitem - opens the BeiDouSpecial "一键刷道具" (One-Click Item Spawn) script.
   GM-only (level 2): the script gainItem's any entered item ID with NO validation.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm2;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class SpawnItemCommand extends Command {
    {
        setDescription("Spawn any item by ID (GM tool).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "一键刷道具");
    }
}
