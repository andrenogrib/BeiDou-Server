-- Place the "Horntail Helper" NPC on Cave of Life - Entrance (240040700). Sprite/id 2081000 (the
-- Leafre "Magic Seed" merchant) is reused for its normal-sized client art; the en-US override
-- scripts-en-US/npc/2081000.js shows the Horntail Helper on this map and reproduces the original
-- merchant on every other map, so the Leafre merchant is unaffected.
--
-- It goes on the LEFT of the entrance floor (x=-250, foothold 5 at y=747), clear of the gate NPC
-- 2081005 (x=235) and of the dragon-morph portals (cs00..cs05, x[-164..348]) so the player doesn't
-- accidentally morph before the fight. type='n' = NPC, team=-1. Idempotent (DELETE first).
--
-- Also remove any earlier placement that used the oversized "encrypted slate" sprite (2083000),
-- which overlapped 2081005 and had a giant dialog portrait.
DELETE FROM plife WHERE world = 0 AND map = 240040700 AND life = 2083000;
DELETE FROM plife WHERE world = 0 AND map = 240040700 AND life = 2081000;
INSERT INTO plife (world, map, life, type, cy, f, fh, rx0, rx1, x, y, hide, mobtime, team)
VALUES (0, 240040700, 2081000, 'n', 747, 0, 5, -300, -200, -250, 747, 0, 0, -1);
