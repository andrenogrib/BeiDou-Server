-- Register the player-usable @taxi command (free city teleport).
-- Java class: org.gms.client.command.commands.gm0.TaxiCommand
-- Script:     scripts-en-US/npc/taxi.js (opened via openNpc(1012000, "taxi"))
-- level=0 + default_level=0 => usable by ALL players, invoked as @taxi.
-- Idempotent (DELETE first) so a re-run / manual seed never duplicates the row.
DELETE FROM command_info WHERE syntax = 'taxi';
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('taxi', 0, 1, 'TaxiCommand', 0);
