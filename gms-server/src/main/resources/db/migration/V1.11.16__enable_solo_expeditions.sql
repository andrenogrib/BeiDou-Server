-- Enable solo (single-player) expeditions server-wide.
-- ExpeditionType.getMinSize() returns 1 instead of the type's min size when this flag is true, so
-- Zakum / Horntail / Scarga / Showa / Balrog / Pink Bean / CWK expeditions can be created and started
-- by a single player through the normal expedition NPCs (e.g. Horntail recruiter 2083004).
-- Idempotent UPDATE of the row seeded (as 'false') by V1.7.0__create_game_config.sql.
UPDATE game_config
SET config_value = 'true', update_time = NOW()
WHERE config_code = 'use_enable_solo_expeditions';
