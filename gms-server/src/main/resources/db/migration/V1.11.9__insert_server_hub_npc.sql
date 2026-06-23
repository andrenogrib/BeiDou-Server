-- Place the "Server Hub" NPC (#4) in Henesys (map 100000000), sprite 9201051.
-- Clicking it runs scripts-en-US/npc/9201051.js which, on any map other than
-- 10000 (Welcome) / 600020000 (John Barricade), shows the Server Hub menu.
-- Foothold 332 is a clear flat platform (x[-158..41], y=218) with no nearby NPCs.
-- type='n' = NPC. team=-1 mirrors the existing Welcome row. world=0 = default world.
-- Idempotent (DELETE first) so a re-run never duplicates the placement.
DELETE FROM plife WHERE world = 0 AND map = 100000000 AND life = 9201051;
INSERT INTO plife (world, map, life, type, cy, f, fh, rx0, rx1, x, y, hide, mobtime, team)
VALUES (0, 100000000, 9201051, 'n', 218, 0, 332, -110, -10, -60, 218, 0, 0, -1);
