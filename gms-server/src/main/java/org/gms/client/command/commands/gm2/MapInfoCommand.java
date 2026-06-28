/*
   Custom command: @mapinfo (GM, rank 2) - turns the GM "map id + name" feedback
   on/off at runtime. The feedback is shown whenever a GM enters a map (MapleMap#addPlayer).
   Usage: @mapinfo        -> flips the current state
          @mapinfo on     -> forces it ON
          @mapinfo off    -> forces it OFF
   State is in-memory only and resets to ON on every server restart (see GmMapInfo).
   Mirrors @npcinfo. See claude/MODIFICACOES-CODIGO.md.
*/
package org.gms.client.command.commands.gm2;

import org.gms.client.Client;
import org.gms.client.command.Command;
import org.gms.client.command.GmMapInfo;
import org.gms.server.maps.MapleMap;

public class MapInfoCommand extends Command {
    {
        setDescription("Toggle the GM map id+name feedback on entry. Optional arg: on/off.");
    }

    @Override
    public void execute(Client c, String[] params) {
        final boolean now;
        if (params.length > 0) {
            String arg = params[0];
            if (arg.equals("on") || arg.equals("1") || arg.equals("true")) {
                GmMapInfo.setEnabled(true);
                now = true;
            } else if (arg.equals("off") || arg.equals("0") || arg.equals("false")) {
                GmMapInfo.setEnabled(false);
                now = false;
            } else {
                now = GmMapInfo.toggle();
            }
        } else {
            now = GmMapInfo.toggle();
        }
        c.getPlayer().yellowMessage("Map info feedback is now " + (now ? "ON" : "OFF") + ".");

        // When turning it on, show the current map right away (the entry hook only fires on the next map change).
        if (now) {
            MapleMap map = c.getPlayer().getMap();
            String name = map.getMapName();
            c.getPlayer().dropMessage(5, "Map ID = " + map.getId()
                    + (name != null && !name.isEmpty() ? " / Name = " + name : ""));
        }
    }
}
