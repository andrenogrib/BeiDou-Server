-- Place an escape NPC inside Horntail's arena (240060200) so the solo "Horntail Helper" instant
-- fight has a way out (the arena has no town portal). Sprite/id 2041025 (the Papulatus escape robot)
-- is reused for its existing client art; the en-US override scripts-en-US/npc/2041025.js warps the
-- player back to the Cave of Life entrance (240040700) on this map and keeps the original
-- behaviour (warp to 220080000) on its home map, so the Papulatus exit is unaffected.
--
-- The arena floor is at y=260; foothold 3 spans x[-540..-500]. The robot goes to the far-left corner
-- at x=-520, away from Horntail's spawn (71,260). type='n' = NPC, team=-1. Idempotent (DELETE first).
DELETE FROM plife WHERE world = 0 AND map = 240060200 AND life = 2041025;
INSERT INTO plife (world, map, life, type, cy, f, fh, rx0, rx1, x, y, hide, mobtime, team)
VALUES (0, 240060200, 2041025, 'n', 260, 0, 3, -560, -480, -520, 260, 0, 0, -1);
