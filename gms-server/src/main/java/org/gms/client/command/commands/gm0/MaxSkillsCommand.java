/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2019 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
   Custom command: @maxskills - learn and max EVERY skill in the player's current
   job advancement path (Beginner/Noblesse/Legend tier + 1st..4th of their branch).
   Scoped variant of the gm2 MaxSkillCommand: it iterates Skill.img but gates each
   skill with GameConstants.isInJobTree(skillId, jobId), so only the player's own
   branch (up to their current advancement) is touched - a Warrior never gets Mage
   skills, a Hero never gets Paladin skills. changeSkillLevel sets BOTH the skill
   level and the master level to max in one call, which unlocks 4th-job skills with
   NO mastery books, and it sends an updateSkill packet per skill (shows live).
   See claude/NPCS-CRIADOS.md (#5).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Character;
import org.gms.client.Client;
import org.gms.client.Job;
import org.gms.client.Skill;
import org.gms.client.SkillFactory;
import org.gms.client.command.Command;
import org.gms.constants.game.GameConstants;
import org.gms.provider.Data;
import org.gms.provider.DataProviderFactory;
import org.gms.provider.wz.WZFiles;

public class MaxSkillsCommand extends Command {
    {
        setDescription("Learn and max every skill in your current job's path (no mastery books needed).");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer();
        int jobId = player.getJob().getId();
        int maxed = 0;

        for (Data skillData : DataProviderFactory.getDataProvider(WZFiles.STRING).getData("Skill.img").getChildren()) {
            int skillId;
            try {
                skillId = Integer.parseInt(skillData.getName());
            } catch (NumberFormatException nfe) {
                continue;   // non-numeric node; skip rather than abort the whole loop
            }
            // Keep only skills this job's tree can actually learn (own branch + lineage, up to current job).
            if (!GameConstants.isInJobTree(skillId, jobId)) {
                continue;
            }
            Skill skill = SkillFactory.getSkill(skillId);
            if (skill == null) {
                continue;   // listed in Skill.img but not loaded
            }
            int max = skill.getMaxLevel();
            if (max <= 0) {
                continue;   // no levels loaded; don't "learn" an empty skill
            }
            // Level AND master level -> max in one call: 4th-job skills unlock with no mastery book.
            player.changeSkillLevel(skill, (byte) max, max, -1);
            maxed++;
        }

        // Defensive: strip the cross-class starter that isn't this character's (mirrors MaxSkillCommand).
        int strayStarter = (player.getJob().isA(Job.ARAN1) || player.getJob().isA(Job.LEGEND)) ? 5001005 : 21001001;
        Skill stray = SkillFactory.getSkill(strayStarter);
        if (stray != null) {
            player.changeSkillLevel(stray, (byte) -1, -1, -1);
        }

        player.yellowMessage("[Max Skills] Maxed " + maxed + " skills for your current job - "
                + "4th-job skills unlocked, no mastery books needed.");
        player.message("Not 4th job yet? Use @jobup first, then @maxskills. Reopen the Skill window (K) to refresh the display.");
    }
}
