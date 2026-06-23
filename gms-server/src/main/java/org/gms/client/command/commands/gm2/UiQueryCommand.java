/*
   Custom GM command: !uiquery - opens the BeiDouSpecial "UI查询" (UI Resource Lookup) script.
   GM-only (level 2) builder/scripting reference tool.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm2;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class UiQueryCommand extends Command {
    {
        setDescription("UI/icon resource lookup (GM tool).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "UI查询");
    }
}
