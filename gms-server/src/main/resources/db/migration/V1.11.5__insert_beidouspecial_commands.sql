-- Wire BeiDouSpecial utility scripts as easy English chat commands.
-- 10 player commands (level 0 / gm0 package) + 2 GM commands (level 2 / gm2 package).
-- Each command class calls openNpc(face, "<BeiDouSpecial script>"); see the gm0/gm2 *Command.java.
-- Idempotent (DELETE first) so a re-run never duplicates rows.
DELETE FROM command_info WHERE syntax IN
  ('reborn','jobup','salon','teleport','learnskill','newbiegift','checkin','onlinereward','deleteitems','mapdrops','uiquery','spawnitem');

INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('reborn', 0, 1, 'RebornCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('jobup', 0, 1, 'JobUpCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('salon', 0, 1, 'SalonCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('teleport', 0, 1, 'TeleportCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('learnskill', 0, 1, 'LearnSkillCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('newbiegift', 0, 1, 'NewbieGiftCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('checkin', 0, 1, 'CheckinCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('onlinereward', 0, 1, 'OnlineRewardCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('deleteitems', 0, 1, 'DeleteItemsCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('mapdrops', 0, 1, 'MapDropsCommand', 0);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('uiquery', 2, 1, 'UiQueryCommand', 2);
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('spawnitem', 2, 1, 'SpawnItemCommand', 2);
