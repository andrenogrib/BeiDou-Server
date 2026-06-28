-- Place the "Welcome NPC" (#1 in claude/NPCS-CRIADOS.md) on Maple Road / Mushroom Town (10000),
-- sprite 9201051. Clicking it runs scripts-en-US/npc/9201051.js which, on map 10000, shows the
-- welcome message; on map 600020000 it stays the original John Barricade; elsewhere the Server Hub.
--
-- This row was originally inserted live (no migration existed), so a fresh DB on another machine
-- would NOT recreate it. This migration backfills it so the whole plife placement is reproducible
-- from the bundled migrations alone. Foothold 37 (x[45..135], y=485) on the lower floor.
-- Idempotent (DELETE first) so re-runs never duplicate.
DELETE FROM plife WHERE world = 0 AND map = 10000 AND life = 9201051;
INSERT INTO plife (world, map, life, type, cy, f, fh, rx0, rx1, x, y, hide, mobtime, team)
VALUES (0, 10000, 9201051, 'n', 485, 0, 37, 85, 185, 135, 485, 0, 0, -1);
