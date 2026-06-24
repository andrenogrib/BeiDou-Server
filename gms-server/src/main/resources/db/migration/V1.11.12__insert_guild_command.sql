-- Register the player-usable @guild command (Guild Hub).
-- Java class: org.gms.client.command.commands.gm0.GuildCommand
-- Opens scripts-en-US/npc/guildmenu.js: create a guild solo (no party requirement),
-- edit emblem, increase capacity, disband. The original guild NPCs are untouched.
-- level=0 + default_level=0 => usable by ALL players, invoked as @guild.
-- Idempotent (DELETE first) so a re-run never duplicates the row.
DELETE FROM command_info WHERE syntax = 'guild';
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('guild', 0, 1, 'GuildCommand', 0);
