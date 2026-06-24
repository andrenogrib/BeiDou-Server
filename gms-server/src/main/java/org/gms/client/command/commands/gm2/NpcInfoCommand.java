/*
   Custom command: @npcinfo (GM, rank 2) - turns the GM "NPC id + script" feedback
   on/off at runtime. The feedback is shown whenever a GM opens an NPC, by clicking it
   (NPCTalkHandler) or via a command/script that calls openNpc (AbstractPlayerInteraction).
   Usage: @npcinfo        -> flips the current state
          @npcinfo on     -> forces it ON
          @npcinfo off    -> forces it OFF
   State is in-memory only and resets to ON on every server restart (see GmNpcInfo).
   See claude/MODIFICACOES-CODIGO.md (#3).
*/
package org.gms.client.command.commands.gm2;

import org.gms.client.Client;
import org.gms.client.command.Command;
import org.gms.client.command.GmNpcInfo;

public class NpcInfoCommand extends Command {
    {
        setDescription("Toggle the GM NPC id+script feedback. Optional arg: on/off.");
    }

    @Override
    public void execute(Client c, String[] params) {
        final boolean now;
        if (params.length > 0) {
            String arg = params[0];
            if (arg.equals("on") || arg.equals("1") || arg.equals("true")) {
                GmNpcInfo.setEnabled(true);
                now = true;
            } else if (arg.equals("off") || arg.equals("0") || arg.equals("false")) {
                GmNpcInfo.setEnabled(false);
                now = false;
            } else {
                now = GmNpcInfo.toggle();
            }
        } else {
            now = GmNpcInfo.toggle();
        }
        c.getPlayer().yellowMessage("NPC info feedback is now " + (now ? "ON" : "OFF") + ".");
    }
}
