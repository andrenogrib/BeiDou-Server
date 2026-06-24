/*
   Custom command: @guild - opens the Guild Hub for every player.
   Routes to scripts-en-US/npc/guildmenu.js (forced, regardless of map) via the
   "guildmenu" fileName; npc id 2010007 (Heracle, the guild NPC) only lends a face.
   The hub lets a SINGLE player create a guild (no party requirement), edit the guild
   emblem, and manage the guild (increase capacity / disband). The original guild NPCs
   2010007/2010008/2010009 keep their normal restrictions untouched.
   See claude/MODIFICACOES-CODIGO.md (#4).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class GuildCommand extends Command {
    {
        setDescription("Open the Guild Hub: create a guild solo, edit emblem, manage your guild.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(2010007, "guildmenu");
    }
}
