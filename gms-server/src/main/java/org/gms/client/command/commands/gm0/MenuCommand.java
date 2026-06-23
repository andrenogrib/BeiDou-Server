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
   Custom command: @menu - opens the Server Hub for every player.
   Routes to scripts-en-US/npc/hub.js (forced, regardless of the player's map)
   via the "hub" fileName; the npc id 9201051 only lends the dialog a face.
   The hub lists all player commands (info) and every custom shop. The placed
   "Server Hub" NPC in Henesys (sprite 9201051) reaches the same hub through
   npc/9201051.js. See claude/NPCS-CRIADOS.md (#4).
*/
package org.gms.client.command.commands.gm0;

import org.gms.client.Client;
import org.gms.client.command.Command;

public class MenuCommand extends Command {
    {
        setDescription("Open the Server Hub: every player command and shop in one menu.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9201051, "hub");
    }
}
