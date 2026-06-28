-- Place the "Papulatus Helper" NPC on The Path of Time (220080000), next to the gate NPC 2041024.
-- Sprite/id 2043000 (Origin of Clock Tower NPC) is reused for its existing client art; the en-US
-- override scripts-en-US/npc/2043000.js shows the Papulatus Helper on this map and reproduces the
-- original NPC on every other map, so Origin of Clock Tower (922020300) is unaffected.
--
-- Foothold 5 spans x[-628..68] at y=-544. The gate NPC 2041024 sits at x=-17 (rx -67..33), so the
-- helper goes to its LEFT at x=-150 (outside that range). type='n' = NPC, team=-1 mirrors the other
-- custom placements. Idempotent (DELETE first) so re-runs never duplicate.
DELETE FROM plife WHERE world = 0 AND map = 220080000 AND life = 2043000;
INSERT INTO plife (world, map, life, type, cy, f, fh, rx0, rx1, x, y, hide, mobtime, team)
VALUES (0, 220080000, 2043000, 'n', -544, 0, 5, -180, -120, -150, -544, 0, 0, -1);
