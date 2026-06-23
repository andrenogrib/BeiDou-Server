/*
   Custom player command: @deleteitems - opens the BeiDouSpecial "一键删除道具"
   (One-Click Delete Items) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class DeleteItemsCommand extends Command {
    {
        setDescription("Bulk-delete items from an inventory tab.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "一键删除道具");
    }
}
