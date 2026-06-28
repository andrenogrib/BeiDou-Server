-- Place the "Zakum Helper" NPC on The Door to Zakum (211042300), next to Adobis (2030008).
-- Sprite/id 2030000 (Jeff) is reused for its existing client art; the en-US override
-- scripts-en-US/npc/2030000.js shows the Zakum Helper on this map and reproduces the original
-- Jeff (Dungeon Guide) on every other map, so Ice Valley II (211040200) is unaffected.
--
-- Foothold 152 spans x[-1055..-1030] at y=-213, just LEFT of Adobis (x=-969, fh 159) and
-- outside his rx range (rx0=-1019), so the two NPCs don't overlap. type='n' = NPC,
-- team=-1 mirrors the other custom placements. Idempotent (DELETE first) so re-runs never dup.
DELETE FROM plife WHERE world = 0 AND map = 211042300 AND life = 2030000;
INSERT INTO plife (world, map, life, type, cy, f, fh, rx0, rx1, x, y, hide, mobtime, team)
VALUES (0, 211042300, 2030000, 'n', -213, 0, 152, -1055, -1030, -1042, -213, 0, 0, -1);
