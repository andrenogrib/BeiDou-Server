-- Register the player-usable @menu command (Server Hub).
-- Java class: org.gms.client.command.commands.gm0.MenuCommand
-- Opens scripts-en-US/npc/hub.js (via openNpc(9201051, "hub")) for ALL players.
-- level=0 + default_level=0 => usable by every player, invoked as @menu.
-- Idempotent (DELETE first) so a re-run / manual seed never duplicates the row.
DELETE FROM command_info WHERE syntax = 'menu';
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('menu', 0, 1, 'MenuCommand', 0);
