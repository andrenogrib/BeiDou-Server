/**
 * @description 学习技能
 */
var OldTitle = "#eBeiDou Skill Learning Center#n\r\n";
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
    
    // 检查玩家技能状态
    var hasDoubleJump = player.getSkillLevel(4111006) > 0;
    var hasTeleport = player.getSkillLevel(2101002) > 0;
    
    var text = OldTitle;
    text += "Click a skill to auto-complete:#n\r\n\r\n";
    text += "1. Learn the skill (if not yet learned)\r\n";
    text += "2. Bind it to the specified key\r\n\r\n";
    text += "#b════════════════#k\r\n\r\n";
    
    // 根据技能状态显示不同的文本
    if (hasDoubleJump) {
        text += "#L0##b#s4111006# #q4111006##k (Already learned, rebind to the #e-#n key)#l\r\n\r\n";
    } else {
        text += "#L0##b#s4111006# #q4111006##k (Learn and bind to the #e-#n key)#l\r\n\r\n";
    }

    if (hasTeleport) {
        text += "#L1##b#s2101002# #q2101002##k (Already learned, rebind to the #e+#n key)#l\r\n\r\n";
    } else {
        text += "#L1##b#s2101002# #q2101002##k (Learn and bind to the #e+#n key)#l\r\n\r\n";
    }

    text += "#L2#Cancel#l";
    
    cm.sendSimple(text);
}

function handleSkillSelection(selection) {
    var skillId, keyCode, skillName, keyName, keySymbol;
    
    switch (selection) {
        case 0:  // 二段跳
            skillId = 4111006;
            keyCode = 12;  // -键
            skillName = "#q4111006#";
            keyName = "the #e-#n key";
            keySymbol = "#e-#n";
            break;
        case 1:  // 快速移动
            skillId = 2101002;
            keyCode = 13;  // +键
            skillName = "#q2101002#";
            keyName = "the #e+#n key";
            keySymbol = "#e+#n";
            break;
        case 2:  // 取消
            cm.sendOk("#bCancelled.#k");
            cm.dispose();
            return;
    }
    
    // 保存技能信息
    lastSkillInfo = {
        skillId: skillId,
        keyCode: keyCode,
        skillName: skillName,
        keyName: keyName,
        keySymbol: keySymbol
    };
    
    // 处理技能学习和绑定
    var result = processSkill(skillId, keyCode, skillName, keyName, keySymbol);
    
    // 记录结果类型
    resultType = result.success ? "success" : "fail";
    
    // 显示结果
    showResult(result);
}

function showResult(result) {
    var text = OldTitle;
    text += "#b════════════════#k\r\n";
    
    if (result.success) {
        text += "#eResult#n\r\n";
        text += "#b════════════════#k\r\n\r\n";
        text += result.message;
        text += "\r\n\r\n#b════════════════#k\r\n\r\n";
        text += "#L0#Learn another skill#l\r\n";
        text += "#L1#Done#l";
    } else {
        text += "#rOperation failed#n\r\n";
        text += "#b════════════════#k\r\n\r\n";
        text += result.message;
        text += "\r\n\r\n#b════════════════#k\r\n\r\n";
        text += "#L0#Try again#l\r\n";
        text += "#L1#Back#l\r\n";
        text += "#L2#Cancel#l";
    }
    
    cm.sendSimple(text);
}

function handleResultSelection(selection) {
    if (resultType === "success") {
        if (selection === 0) {
            // 继续学习其他技能
            status = 0;
            showSkillList();
        } else if (selection === 1) {
            // 完成并关闭窗口
            cm.sendOk("#bOperation complete.#k");
            cm.dispose();
        }
    } else if (resultType === "fail") {
        if (selection === 0) {
            // 重新尝试
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
            // 返回技能列表
            status = 0;
            showSkillList();
        } else if (selection === 2) {
            // 取消
            cm.sendOk("#bCancelled.#k");
            cm.dispose();
        }
    }
}

// 处理技能学习和绑定的主函数
function processSkill(skillId, keyCode, skillName, keyName, keySymbol) {
    var player = cm.getPlayer();
    var messages = [];
    var success = true;
    var alreadyLearned = false;
    
    // 检查是否已学习技能
    var hasSkill = player.getSkillLevel(skillId) > 0;
    
    if (!hasSkill) {
        // 学习技能 - 直接学习，跳过职业检查
        var learnResult = learnSkill(skillId, skillName);
        if (learnResult.success) {
            messages.push(learnResult.message);
        } else {
            messages.push("#rLearning failed: " + learnResult.message + "#k");
            success = false;
        }
    } else {
        messages.push("#gAlready learned " + skillName + ".#k");
        alreadyLearned = true;
    }
    
    // 绑定技能
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

// 学习技能的函数 - 修改版，跳过职业检查
function learnSkill(skillId, skillName) {
    var player = cm.getPlayer();
    
    if (player.getSkillLevel(skillId) > 0) {
        return {success: true, message: "#gAlready learned " + skillName + ".#k"};
    }
    
    try {
        var SkillFactory = Java.type('org.gms.client.SkillFactory');
        var skill = SkillFactory.getSkill(skillId);
        
        if (skill == null) {
            return {success: false, message: "Skill does not exist"};
        }
        
        // 获取技能最大等级
        var maxLevel = 20;
        try {
            maxLevel = skill.getMaxLevel();
            if (maxLevel <= 0) {
                maxLevel = 20;
            }
        } catch (e) {
            maxLevel = 20;
        }
        
        // 直接学习技能，不检查职业限制
        player.changeSkillLevel(skill, maxLevel, maxLevel, -1);
        
        return {
            success: true, 
            message: "#gLearned " + skillName + "#k\r\n" +
                     "Level: " + maxLevel + "/" + maxLevel
        };
        
    } catch (e) {
        return {success: false, message: "Learning error: " + e.toString()};
    }
}

// 绑定技能的函数
function bindSkill(skillId, skillName, keyCode, keyName, keySymbol, alreadyLearned) {
    var player = cm.getPlayer();
    
    if (player.getSkillLevel(skillId) <= 0) {
        return {success: false, message: "You have not learned this skill yet"};
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
        
        message += "\r\nKey: " + keySymbol + " key";
        message += "\r\n#eNote:#n Change channel to see the key binding update";
        
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
                return {success: false, message: "Binding is not supported"};
            }
            
            var message = "";
            if (alreadyLearned) {
                message = "#gRebound " + skillName + " to " + keyName + "#k";
            } else {
                message = "#gBound " + skillName + " to " + keyName + "#k";
            }

            message += "\r\nKey: " + keySymbol + " key";
            message += "\r\n#eNote:#n Change channel to see the key binding update";
            
            return {success: true, message: message};
            
        } catch (e2) {
            return {success: false, message: "Binding error: " + e2.toString()};
        }
    }
}