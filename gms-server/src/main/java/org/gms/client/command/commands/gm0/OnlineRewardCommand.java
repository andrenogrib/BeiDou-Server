/*
   Custom player command: @onlinereward - opens the BeiDouSpecial "在线奖励_nextlevel"
   (Online-time Reward, NextLevel edition) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class OnlineRewardCommand extends Command {
    {
        setDescription("Claim your online-time rewards.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "在线奖励_nextlevel");
    }
}
