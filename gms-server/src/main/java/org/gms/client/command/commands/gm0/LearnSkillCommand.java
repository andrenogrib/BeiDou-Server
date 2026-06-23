/*
   Custom player command: @learnskill - opens the BeiDouSpecial "技能学习" (Skill Learning) script.
   Wired like @taxi (openNpc(face, scriptName)). See claude/NPCS-CRIADOS.md (#3).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class LearnSkillCommand extends Command {
    {
        setDescription("Learn the movement skills (Double Jump, Teleport).");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9000000, "技能学习");
    }
}
