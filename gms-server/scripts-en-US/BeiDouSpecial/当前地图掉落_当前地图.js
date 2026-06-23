/**
 * Function: Shows the types of living monsters on the current map and their item drop rates.
 * Author: Magical-H (https://github.com/Magical-H)
 * Version: 1.0
 * Date: 2024-12-02
 */
var MonsterInformationProvider;
var ItemInformationProvider;
var QuestInfo;

var MapObj;								 //map object
var List_Mob_All;				   //list of all monsters
var List_Mob_Boss;				  //list of bosses
var List_Mob;						   //list of normal monsters
var namelength = 0;

function start(){
    if(MapObj == null) {		//Initialize on first open.
        MonsterInformationProvider = Java.type('org.gms.server.life.MonsterInformationProvider');//import the monster information class
        ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');//import the item information class
        QuestInfo = Java.type('org.gms.server.quest.Quest');//import the quest class
        MapObj = cm.getMap();
        List_Mob_All = MapObj.getAllMonsters(); //Get the monsters currently alive on this map. Since there is no method to fetch the map's fixed monster list, this is used instead.
        //Deduplicate the monster types and split them into bosses and normal monsters.
        [List_Mob, List_Mob_Boss] = Object.values(List_Mob_All.reduce((acc, mob) => (acc.ids.has(mob.getId()) || (acc.ids.add(mob.getId()), mob.isBoss() ? acc.bosses : acc.mobs).push(mob), acc), { ids: new Set(), mobs: [], bosses: [] })).slice(-2);
    }
    levelmain();
}

function leveldispose() {
    cm.dispose();
}

/**
 * When some cm.sendLevel calls do not specify a next handler, they fall through to null, which lands here.
 */
function levelnull() {
    cm.dispose();
}

/**
 * This is the first dialog level, used to display the types of living monsters on the current map.
 */
function levelmain() {
    if(List_Mob_All.length == 0) {
        cm.sendOkLevel('dispose', 'There are no #rliving monsters#k on this map right now.\r\nPlease wait for monsters to respawn, then try again.', 2);
    } else {
        var Msg_Select = 'Here are the #bliving monsters#k on this map.\r\nClick a monster to view its #bdrop list#k:\r\n'; //monster selection display message
            Msg_Select += '#d' + '\r\n'.padStart(28,'——') + '#k';
        if(List_Mob_Boss.length > 0) {
            Msg_Select += `#r#eBOSS#n#k: ${List_Mob_Boss.length} types\r\n`;
            Msg_Select += getSelecttext(List_Mob_Boss);
            if(List_Mob.length > 0) Msg_Select += '#d' + '\r\n'.padStart(28,'——') + '#k';
        }
        if(List_Mob.length > 0) {
            Msg_Select += `#b#eNormal Monsters#n#k: ${List_Mob.length} types\r\n`;
            Msg_Select += getSelecttext(List_Mob);
        }
        cm.sendNextSelectLevel('ShowDropList', Msg_Select,2);
    }
}

/**
 * Formats the selectable list of monsters present on the current map.
 * @param moblist
 * @returns {string}
 */
function getSelecttext(moblist) {
    let size = moblist.reduce((max, obj) => Math.max(max, obj.getName().length), 0);  //get the longest monster name length
    namelength = namelength > size ? namelength : size;
    return moblist.map(obj => {
        let id = obj.getId();
        let select = '#fUI/UIWindow.img/UserList/Friend/icon04# ';
        let name = !obj.getName() || obj.getName() == 'MISSINGNO' ? `#o${id}#` : obj.getName();     //prefer the server-side monster name; if missing, fall back to the client name
            name = select + name.padEnd(namelength,'\t');
        return `#L${id}#${getMobImage(obj)}\r\n#${(obj.isBoss() ? 'r' : 'b') + name}#k\t[ Lv.${getLevelImage(obj.getLevel())} ] #l`
    }).join('\r\n\r\n') + '\r\n\r\n';
}

/**
 * Formats and outputs the drop item list for the specified monster.
 * @param mobId
 */
function levelShowDropList(mobId) {
    const mob = List_Mob_All.find(mob => mob.getId() == mobId);		 //get the cached monster object by its ID
    const table = {
        'Item Name' : 0,
        'Base Rate' : 0,
        'Your Rate' : 0,
    }
    let msgtext = `The monster you selected ( ID #r${mobId}#k ) could not be found.`;

    if(mob != null) {
        let player = cm.getPlayer();
        let dropall = MonsterInformationProvider.getInstance().retrieveDrop(mobId);										 //get the drop item list by monster ID
        let CountItems = dropall.size();																				//get the total number of drop items
        let mobName = !mob.getName() || mob.getName() == 'MISSINGNO' ? `#o${mobId}#` : mob.getName();
        let stats = mob.getStats();
        let statsSize = Math.max(...[mob.getMaxHp(), stats.getPADamage(), stats.getMADamage()].map(v => v.toString().length));
        mobName = `[ #e#b${mobName}#k#n ] `;
        msgtext = `${getMobImage(mob)}\r\n${mobName}\r\n`;
        msgtext += `HP: ${mob.getMaxHp().toString().padEnd(statsSize,' ')}\t\tMP: ${mob.getMaxMp()}\r\n`;
        msgtext += `P.Atk: ${stats.getPADamage().toString().padEnd(statsSize,' ')}\t\tP.Def: ${stats.getPDDamage()}\r\n`;
        msgtext += `M.Atk: ${stats.getMADamage().toString().padEnd(statsSize,' ')}\t\tM.Def: ${stats.getMDDamage()}\r\n`;
        // msgtext += `　Accuracy: ${stats.getMADamage()}\t\t　Avoidability: ${stats.getMDDamage()}\r\n`;
        if(CountItems <= 0) {
            msgtext += `\r\n\r\n#rThis monster has no drops.#k`;
        } else {
            msgtext += `\r\n\r\n${'-'.repeat(28)}#bItem Drop List#k${'-'.repeat(28)}\r\n\r\n`;
            // Iterate over the table object's keys and set each value to the length of its key name.
            Object.keys(table).forEach(key => {table[key] = Math.max(table[key],key.length)});
            let dropitemlist = {};
            dropall.filter(drop => drop.itemId > 0).forEach((drop) => {
                let itemName = ItemInformationProvider.getInstance().getName(drop.itemId);
                if (itemName != null) {
                    let itemChance = (drop.chance / 10000).toFixed(4);
                    // Update the matching values in table to record the maximum length.
                    table['Item Name'] = Math.max(table['Item Name'], itemName.length);
                    table['Base Rate'] = Math.max(table['Base Rate'], itemChance.length / 2);
                    table['Your Rate'] = Math.max(table['Your Rate'], itemChance.length / 2);
                    // Make sure itemName is a unique key in the result object.
                    // If itemName could repeat, add an index or other unique identifier.
                    dropitemlist[drop.itemId] = {name : itemName , chance : itemChance , questid : drop.questid};
                }
            });
            // Make sure all values are even.
            Object.keys(table).forEach(key => table[key] = Math.ceil(table[key] / 2) * 2);
            msgtext += '#b' + Object.entries(table).map(([key,val]) => `${key.padEnd(val,'\t')}`).join('\t') + '#k\r\n';
            msgtext += Object.entries(dropitemlist).map(([itemId, { name, chance ,questid}]) => {
                    let msg = `#L${itemId}##v${itemId}#\r\n#b#e${name.padEnd(table['Item Name'] + countAllSymbols(name), '\t')}#k#n\t`;
                    msg += `${(chance + '%').padEnd(table['Base Rate'], '\t')}\t#d${(chance * player.getDropRate() * player.getFamilyDrop() + '%').padEnd(table['Your Rate'], '\t')}#k\r\n`;
                    msg += questid > 0 ? '#r[Quest Item]#k '+QuestInfo.getInstance(questid).getName()+'\r\n' : '';
                    msg += '#l';
                    return msg;
                }
            ).join('\r\n');
        }
    }
    cm.sendLastLevel('main',msgtext,2); //This shows a "Previous + OK" dialog. Clicking OK jumps to levelnull, presumably because the source code does not handle that case.
}

/**
 * Counts the number of symbols (non-CJK characters) in a string.
 * @param str
 * @returns {*|number}
 */
function countAllSymbols(str) {
    return Math.ceil(str.match(/[^\u4e00-\u9fff]/g)?.length / 2) || 0;
}

/**
 * The following function may cause the client to crash in certain specific cases.
 * @param mob
 * @returns {string}
 */
function getMobImage(mob){
    let type = [null,'stand','fly']
        type = type[mob.getStats().getMovetype() + 1];    //-1 = unknown type, 0 = ground type, 1 = flying type
    if(type == null) {
        return `#fUI/UIWindow.img/Maker/randomRecipe#`;     //Show a question mark when there is no monster image.
    } else if (mob.getStats().getImgwidth() > 160 && mob.getStats().getImgheight() > 250) { //If the image exceeds the given size it can freeze the client, so replace it with a different image or omit it.
        return `#fMap/Obj/Tdungeon.img/mushCatle/npc/0/0#\r\n(Image too large to display)`;
    } else {
        //Monster IDs are at most 7 digits; pad shorter IDs with leading zeros.
        return `#fMob/${mob.getId().toString().padStart(7, '0')}.img/${type}/0#`;
    }
}

function getLevelImage(level,type) {
    let UI = []
        UI.push('Basic/LevelNo/');
        UI.push('Basic/ItemNo/');
        UI.push('UIWindow/SkillEx/SpNum/');
        UI.push('UIWindow/VegaSpell/Count/');
        UI.push('UIWindow/ToolTip/Equip/GrowthEnabled/');
        type = !type ? 0 : type;
        type = type > UI.length ? UI.length : type;
        UI = UI[type];
    return [...level.toString()].map(str => `#fUI/${UI + str}#`);
}
