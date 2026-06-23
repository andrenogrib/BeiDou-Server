/**
 * @description Learn skill
 */
var OldTitle = "#r#eBeiDou Skill Learning Center#n#k\r\n\r\n";
var status = -1;
var lastSkillInfo = null;
var resultType = "";

function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
        showSkillList();
    } else if (status === 1) {
        handleSkillSelection(selection);
    } else if (status === 2) {
        handleResultSelection(selection);
    }
}

function showSkillList() {
    var player = cm.getPlayer();

    // Check the player's current skill status
    var hasDoubleJump = player.getSkillLevel(4111006) > 0;
    var hasTeleport = player.getSkillLevel(2101002) > 0;

    var text = OldTitle;
    text += "Pick a #bskill#k below and I'll handle the rest for you:\r\n\r\n";
    text += "1. Learn the skill (if you haven't yet)\r\n";
    text += "2. Bind it to the right key\r\n\r\n";
    text += "#b------------------------#k\r\n\r\n";

    // Show different wording depending on whether the skill is already learned
    if (hasDoubleJump) {
        text += "#L0##b#s4111006# #q4111006##k (already learned — rebind to the #r-#k key)#l\r\n\r\n";
    } else {
        text += "#L0##b#s4111006# #q4111006##k (learn and bind to the #r-#k key)#l\r\n\r\n";
    }

    if (hasTeleport) {
        text += "#L1##b#s2101002# #q2101002##k (already learned — rebind to the #r+#k key)#l\r\n\r\n";
    } else {
        text += "#L1##b#s2101002# #q2101002##k (learn and bind to the #r+#k key)#l\r\n\r\n";
    }

    text += "#L2##bCancel#k#l";
    
    cm.sendSimple(text);
}

function handleSkillSelection(selection) {
    var skillId, keyCode, skillName, keyName, keySymbol;
    
    switch (selection) {
        case 0:  // Double Jump
            skillId = 4111006;
            keyCode = 12;  // - key
            skillName = "#q4111006#";
            keyName = "the #r-#k key";
            keySymbol = "#r-#k";
            break;
        case 1:  // Teleport
            skillId = 2101002;
            keyCode = 13;  // + key
            skillName = "#q2101002#";
            keyName = "the #r+#k key";
            keySymbol = "#r+#k";
            break;
        case 2:  // Cancel
            cm.sendOk("No problem — come back anytime!");
            cm.dispose();
            return;
    }

    // Save the selected skill info
    lastSkillInfo = {
        skillId: skillId,
        keyCode: keyCode,
        skillName: skillName,
        keyName: keyName,
        keySymbol: keySymbol
    };
    
    // Process the skill learning and key binding
    var result = processSkill(skillId, keyCode, skillName, keyName, keySymbol);

    // Record the result type
    resultType = result.success ? "success" : "fail";

    // Show the result
    showResult(result);
}

function showResult(result) {
    var text = OldTitle;
    text += "#b------------------------#k\r\n";

    if (result.success) {
        text += "#r#eResult#n#k\r\n";
        text += "#b------------------------#k\r\n\r\n";
        text += result.message;
        text += "\r\n\r\n#b------------------------#k\r\n\r\n";
        text += "#L0##bLearn another skill#k#l\r\n";
        text += "#L1##bDone#k#l";
    } else {
        text += "#r#eOperation failed#n#k\r\n";
        text += "#b------------------------#k\r\n\r\n";
        text += result.message;
        text += "\r\n\r\n#b------------------------#k\r\n\r\n";
        text += "#L0##bTry again#k#l\r\n";
        text += "#L1##bBack#k#l\r\n";
        text += "#L2##bCancel#k#l";
    }
    
    cm.sendSimple(text);
}

function handleResultSelection(selection) {
    if (resultType === "success") {
        if (selection === 0) {
            // Keep learning other skills
            status = 0;
            showSkillList();
        } else if (selection === 1) {
            // Finish and close the window
            cm.sendOk("All done — enjoy your new skill!");
            cm.dispose();
        }
    } else if (resultType === "fail") {
        if (selection === 0) {
            // Try again
            if (lastSkillInfo !== null) {
                var result = processSkill(
                    lastSkillInfo.skillId,
                    lastSkillInfo.keyCode,
                    lastSkillInfo.skillName,
                    lastSkillInfo.keyName,
                    lastSkillInfo.keySymbol
                );
                resultType = result.success ? "success" : "fail";
                showResult(result);
            } else {
                status = 0;
                showSkillList();
            }
        } else if (selection === 1) {
            // Back to the skill list
            status = 0;
            showSkillList();
        } else if (selection === 2) {
            // Cancel
            cm.sendOk("No problem — come back anytime!");
            cm.dispose();
        }
    }
}

// Main function that handles learning and binding a skill
function processSkill(skillId, keyCode, skillName, keyName, keySymbol) {
    var player = cm.getPlayer();
    var messages = [];
    var success = true;
    var alreadyLearned = false;

    // Check whether the skill is already learned
    var hasSkill = player.getSkillLevel(skillId) > 0;

    if (!hasSkill) {
        // Learn the skill directly, skipping the job check
        var learnResult = learnSkill(skillId, skillName);
        if (learnResult.success) {
            messages.push(learnResult.message);
        } else {
            messages.push("#rLearning failed: " + learnResult.message + "#k");
            success = false;
        }
    } else {
        messages.push("#gYou already know " + skillName + ".#k");
        alreadyLearned = true;
    }

    // Bind the skill to a key
    if (success) {
        var bindResult = bindSkill(skillId, skillName, keyCode, keyName, keySymbol, alreadyLearned);
        if (bindResult.success) {
            messages.push(bindResult.message);
        } else {
            messages.push("#rBinding failed: " + bindResult.message + "#k");
            success = false;
        }
    }
    
    return {
        success: success,
        message: messages.join("\r\n\r\n")
    };
}

// Function that learns a skill - modified to skip the job check
function learnSkill(skillId, skillName) {
    var player = cm.getPlayer();

    if (player.getSkillLevel(skillId) > 0) {
        return {success: true, message: "#gYou already know " + skillName + ".#k"};
    }

    try {
        var SkillFactory = Java.type('org.gms.client.SkillFactory');
        var skill = SkillFactory.getSkill(skillId);

        if (skill == null) {
            return {success: false, message: "that skill does not exist"};
        }

        // Get the skill's max level
        var maxLevel = 20;
        try {
            maxLevel = skill.getMaxLevel();
            if (maxLevel <= 0) {
                maxLevel = 20;
            }
        } catch (e) {
            maxLevel = 20;
        }

        // Learn the skill directly, with no job restriction check
        player.changeSkillLevel(skill, maxLevel, maxLevel, -1);

        return {
            success: true,
            message: "#gLearned " + skillName + "!#k\r\n" +
                     "Level: #b" + maxLevel + "/" + maxLevel + "#k"
        };

    } catch (e) {
        return {success: false, message: "learning error: " + e.toString()};
    }
}

// Function that binds a skill to a key
function bindSkill(skillId, skillName, keyCode, keyName, keySymbol, alreadyLearned) {
    var player = cm.getPlayer();

    if (player.getSkillLevel(skillId) <= 0) {
        return {success: false, message: "you have not learned this skill yet"};
    }

    try {
        var KeyBinding = Java.type('org.gms.client.keybind.KeyBinding');
        var javaKeyBinding = new KeyBinding(1, skillId);

        player.changeKeybinding(keyCode, javaKeyBinding);

        var message = "";
        if (alreadyLearned) {
            message = "#gRebound " + skillName + " to " + keyName + "#k";
        } else {
            message = "#gBound " + skillName + " to " + keyName + "#k";
        }

        message += "\r\nKey: " + keySymbol;
        message += "\r\n#r#eNote:#n#k change channel to see the key binding update.";

        return {success: true, message: message};

    } catch (e1) {
        try {
            var KeyBinding = Java.type('org.gms.client.keybind.KeyBinding');
            var javaKeyBinding = new KeyBinding(1, skillId);
            
            if (typeof player.setKeybinding === 'function') {
                player.setKeybinding(keyCode, javaKeyBinding);
            } else if (typeof player.setKeyBinding === 'function') {
                player.setKeyBinding(keyCode, javaKeyBinding);
            } else if (typeof player.updateKeybinding === 'function') {
                player.updateKeybinding(keyCode, javaKeyBinding);
            } else {
                return {success: false, message: "key binding is not supported"};
            }

            var message = "";
            if (alreadyLearned) {
                message = "#gRebound " + skillName + " to " + keyName + "#k";
            } else {
                message = "#gBound " + skillName + " to " + keyName + "#k";
            }

            message += "\r\nKey: " + keySymbol;
            message += "\r\n#r#eNote:#n#k change channel to see the key binding update.";

            return {success: true, message: message};

        } catch (e2) {
            return {success: false, message: "binding error: " + e2.toString()};
        }
    }
}