-- Register the player-usable @maxskills command.
-- Java class: org.gms.client.command.commands.gm0.MaxSkillsCommand
-- Maxes every skill (level + master level) in the player's current job tree,
-- unlocking 4th-job skills with no mastery books. Scoped via GameConstants.isInJobTree.
-- level=0 + default_level=0 => usable by ALL players, invoked as @maxskills.
-- Idempotent (DELETE first) so a re-run never duplicates the row.
DELETE FROM command_info WHERE syntax = 'maxskills';
INSERT INTO command_info (syntax, level, enabled, clazz, default_level) VALUES ('maxskills', 0, 1, 'MaxSkillsCommand', 0);
