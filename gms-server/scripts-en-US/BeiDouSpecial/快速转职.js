/**
 * Name: Quick Job Advancement
 * Function: Quickly advance jobs for Adventurers, Aran, and Cygnus Knights.
 *      To disable other jobs, mask line 37 >>> 38.
 * Author: Jason
 * Version: 2.1
 * Date: 20260119
 * Note: Added 4th job skill level initialization (corrected job IDs)
 */
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("The weather's lovely today~ If you change your mind, come find me anytime. Good luck out there!");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("Hi there! I'm the #bAll-Class Job Advancement Officer#k.\r\n\r\nI can help you advance to your next job in a flash. Ready when you are!");
        } else if (status == 1) {
            var jobid = cm.getJobId();
            var where = "#r#eChoose Your Path#n#k\r\n\r\nWhich job would you like to advance to?\r\n\r\n";
            if (jobid % 100 == 0) {
                switch (Math.floor(jobid / 100)) {
                    case 0:
                        where += "#L100##bWarrior#k#l\r\n#L200##bMagician#k#l\r\n#L300##bBowman#k#l\r\n#L400##bThief#k#l\r\n#L500##bPirate#k#l\r\n";
                        //where += "#L1100##bDawn Warrior#k#l\r\n#L1200##bBlaze Wizard#k#l\r\n#L1300##bWind Archer#k#l\r\n#L1400##bNight Walker#k#l\r\n#L1500##bThunder Breaker#k#l\r\n";
                        //where += "#L2100##bAran#k#l\r\n";
                        break;
                    case 1:
                        where += "#L110##bFighter#k#l\r\n#L120##bPage#k#l\r\n#L130##bSpearman#k#l\r\n";
                        break;
                    case 2:
                        where += "#L210##bWizard (Fire/Poison)#k#l\r\n#L220##bWizard (Ice/Lightning)#k#l\r\n#L230##bCleric#k#l\r\n";
                        break;
                    case 3:
                        where += "#L310##bHunter#k#l\r\n#L320##bCrossbowman#k#l\r\n";
                        break;
                    case 4:
                        where += "#L410##bAssassin#k#l\r\n#L420##bBandit#k#l\r\n";
                        break;
                    case 5:
                        where += "#L510##bBrawler#k#l\r\n#L520##bGunslinger#k#l\r\n";
                        break;
					case 10:
                        where += "#L1100##bDawn Warrior#k#l\r\n#L1200##bBlaze Wizard#k#l\r\n#L1300##bWind Archer#k#l\r\n#L1400##bNight Walker#k#l\r\n#L1500##bThunder Breaker#k#l\r\n";
                        break;
                    case 11:
                        where += "#L1110##bDawn Warrior (2nd Job)#k#l\r\n";
                        break;
                    case 12:
                        where += "#L1210##bBlaze Wizard (2nd Job)#k#l\r\n";
                        break;
                    case 13:
                        where += "#L1310##bWind Archer (2nd Job)#k#l\r\n";
                        break;
                    case 14:
                        where += "#L1410##bNight Walker (2nd Job)#k#l\r\n";
                        break;
                    case 15:
                        where += "#L1510##bThunder Breaker (2nd Job)#k#l\r\n";
                        break;
                    case 20:
                        where += "#L2100##bAran#k#l\r\n";
                        break;
                    case 21:
                        where += "#L2110##bAran (2nd Job)#k#l\r\n";
                        break;
                }
            } else if (jobid % 100 != 0) {
                where += "#L" + (jobid + 1) + "##bProceed with my #r" + (jobid % 10 + 3) + "#b job advancement#k#l\r\n";
            }
            cm.sendSimple(where);
        } else if (status == 2) {
            var changeto = selection;
            var jobid = cm.getJobId();
            if (jobid % 1000 == 0) {
                if (cm.getChar().getLevel() >= 8 && changeto == 200 || cm.getPlayer().getLevel() >= 10) {
                    cm.changeJobById(changeto);
                    cm.dropMessage(5,"[Job Advancement] Player [" + cm.getPlayer() + "] completed quick 1st job advancement");
                } else {
                    cm.sendOk("You don't meet the #rlevel requirement#k for this job advancement yet. Come back when you're ready!");
                }
            } else if (jobid % 100 == 0) {
                if (cm.getChar().getLevel() >= 30 && cm.getJobId() == 200) {
                    cm.changeJobById(changeto);
                } else if (cm.getChar().getLevel() >= 30) {
                    cm.changeJobById(changeto);
                    cm.dropMessage(5,"[Job Advancement] Player [" + cm.getPlayer() + "] completed quick 2nd job advancement");
                } else {
                    cm.sendOk("You don't meet the #rlevel requirement#k for this job advancement yet. Come back when you're ready!");
                }
            } else if (jobid % 10 == 0) {
                if (cm.getChar().getLevel() >= 70) {
                    cm.changeJobById(changeto);
                    cm.dropMessage(5,"[Job Advancement] Player [" + cm.getPlayer() + "] completed quick 3rd job advancement");
                } else {
                    cm.sendOk("You don't meet the #rlevel requirement#k for this job advancement yet. Come back when you're ready!");
                }
            } else if (jobid % 10 == 1) {
                if (jobid / 1000 >= 1 && jobid / 1000 < 2) {
                    cm.sendOk("#bCygnus Knights#k only have 3 job advancements, and you've already completed them all. Well done!");
                } else if (cm.getChar().getLevel() >= 120) {
                    cm.changeJobById(changeto);
                    cm.dropMessage(5,"[Job Advancement] Player [" + cm.getPlayer() + "] completed quick 4th job advancement");
                    
                    // Automatically initialize job skill levels after 4th job advancement (using the new 4th job ID)
                    initializeFourthJobSkills(changeto);
                    
                } else {
                    cm.sendOk("You don't meet the #rlevel requirement#k for this job advancement yet. Come back when you're ready!");
                }
            } else {
                cm.sendOk("You've already completed #rall available job advancements#k. There's nothing more for me to do here!");
            }
            cm.dispose();
        } 
    }
}

// Initialize 4th job skills (level 0, max level 10)
function initializeFourthJobSkills(jobId) {
    var player = cm.getPlayer();
    var skills = [];

    // Get the matching skill list based on the 4th job ID
    switch (jobId) {
        // Warrior branch - 4th job
        case 112: // Hero
            skills = [1121000, 1121001, 1121002, 1121003, 1121004, 1121005, 1121006, 1121008, 1121010];
            break;
        case 122: // Paladin
            skills = [1221000, 1221001, 1221002, 1221003, 1221004, 1221005, 1221006, 1221007, 1221009, 1221011];
            break;
        case 132: // Dark Knight
            skills = [1321000, 1321001, 1321002, 1321003, 1321004, 1321005, 1321006, 1321007, 1321009];
            break;

        // Magician branch - 4th job
        case 212: // Fire/Poison Archmage
            skills = [2121000, 2121001, 2121002, 2121003, 2121004, 2121005, 2121006, 2121007, 2121008];
            break;
        case 222: // Ice/Lightning Archmage
            skills = [2221000, 2221001, 2221002, 2221003, 2221004, 2221005, 2221006, 2221007, 2221008];
            break;
        case 232: // Bishop
            skills = [2321000, 2321001, 2321002, 2321003, 2321004, 2321005, 2321006, 2321007, 2321008, 2321009];
            break;

        // Bowman branch - 4th job
        case 312: // Bow Master
            skills = [3121000, 3121002, 3121003, 3121004, 3121005, 3121006, 3121007, 3121008];
            break;
        case 322: // Marksman
            skills = [3221000, 3221001, 3221002, 3221003, 3221004, 3221005, 3221006, 3221007];
            break;

        // Thief branch - 4th job
        case 412: // Night Lord
            skills = [4121000, 4121001, 4121002, 4121003, 4121004, 4121005, 4121006, 4121007, 4121008, 4121009];
            break;
        case 422: // Shadower
            skills = [4221000, 4221001, 4221002, 4221003, 4221004, 4221005, 4221006, 4221007, 4221008];
            break;

        // Pirate branch - 4th job
        case 512: // Buccaneer
            skills = [5121000, 5121001, 5121002, 5121003, 5121004, 5121005, 5121006, 5121007, 5121008, 5121009];
            break;
        case 522: // Corsair
            skills = [5221000, 5221001, 5221002, 5221003, 5221004, 5221005, 5221006, 5221007, 5221008, 5221009, 5221010];
            break;

        // Cygnus Knights branch - 4th job
        case 1112: // Dawn Warrior (4th job)
            skills = [11121000, 11121001, 11121002, 11121003, 11121004];
            break;
        case 1212: // Blaze Wizard (4th job)
            skills = [12121000, 12121001, 12121002, 12121003, 12121004];
            break;
        case 1312: // Wind Archer (4th job)
            skills = [13121000, 13121001, 13121002, 13121003, 13121004];
            break;
        case 1412: // Night Walker (4th job)
            skills = [14121000, 14121001, 14121002, 14121003, 14121004];
            break;
        case 1512: // Thunder Breaker (4th job)
            skills = [15121000, 15121001, 15121002, 15121003, 15121004];
            break;

        // Aran branch - 4th job
        case 2112: // Aran (4th job)
            skills = [21121000, 21121001, 21121002, 21121003, 21121004];
            break;

        default:
            // Fall back to auto-detecting all skills for this job
            getAllJobSkills(jobId);
            return;
    }

    // Initialize each skill
    var skillCount = 0;
    for (var i = 0; i < skills.length; i++) {
        if (initializeSkill(skills[i])) {
            skillCount++;
        }
    }
    
    if (skillCount > 0) {
        cm.dropMessage(5, "[Skill System] Initialized " + skillCount + " 4th job skills at level 0/10");
    } else {
        cm.dropMessage(5, "[Skill System] All 4th job skills are already initialized, or please learn them manually");
    }
}

// Initialize a single skill
function initializeSkill(skillId) {
    try {
        var SkillFactory = Java.type('org.gms.client.SkillFactory');
        var skill = SkillFactory.getSkill(skillId);

        if (skill == null) {
            return false;
        }

        var player = cm.getPlayer();

        // Check whether the player already has this skill
        var currentLevel = player.getSkillLevel(skill);

        // If the skill level is 0, set it to level 0 (learnable)
        if (currentLevel <= 0) {
            // Set skill level to 0, with a max level of 10
            player.changeSkillLevel(skill, 0, 10, -1);
            return true;
        }
        return false;
        
    } catch (e) {
        return false;
    }
}

// Retrieve all skills for a job (fallback method)
function getAllJobSkills(jobId) {
    try {
        var player = cm.getPlayer();
        var SkillFactory = Java.type('org.gms.client.SkillFactory');

        // Get all skills for this job
        var allSkills = SkillFactory.getAllSkills();
        var skillCount = 0;

        // Loop through all skills and find the 4th job skills for this job
        for (var i = 0; i < allSkills.size(); i++) {
            var skill = allSkills.get(i);
            var skillJob = skill.getJobId();

            // Check whether the skill belongs to the current job and is a 4th job skill
            if (skillJob == jobId && skill.isFourthJob()) {
                var currentLevel = player.getSkillLevel(skill);
                if (currentLevel <= 0) {
                    player.changeSkillLevel(skill, 0, 10, -1);
                    skillCount++;
                }
            }
        }
        
        if (skillCount > 0) {
            cm.dropMessage(5, "[Skill System] Initialized " + skillCount + " 4th job skills at level 0/10");
        }
        
    } catch (e) {
        // Ignore errors
    }
}