-- Register the GM @mapinfo command (toggle the "map id + name on entry" feedback on/off).
-- Java class: org.gms.client.command.commands.gm2.MapInfoCommand
-- level=2 => requires gmLevel >= 2 (same threshold as isGM); default_level=2 => gm2 package.
-- Usable by GMs as @mapinfo or !mapinfo. Optional arg: on/off (no arg = flip). Mirrors @npcinfo.
-- Idempotent (DELETE first) so a re-run never duplicates the row.
DELETE FROM command_info WHERE syntax = 'mapinfo';
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('mapinfo', 2, 1, 'MapInfoCommand', 2);
