-- Register the GM @npcinfo command (toggle the NPC id+script feedback on/off).
-- Java class: org.gms.client.command.commands.gm2.NpcInfoCommand
-- level=2 => requires gmLevel >= 2 (same threshold as isGM); default_level=2 => gm2 package.
-- Usable by GMs as @npcinfo or !npcinfo. Optional arg: on/off (no arg = flip).
-- Idempotent (DELETE first) so a re-run never duplicates the row.
DELETE FROM command_info WHERE syntax = 'npcinfo';
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('npcinfo', 2, 1, 'NpcInfoCommand', 2);
