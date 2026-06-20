/**
 * 名称：在线奖励(nextlevel版)
 * 功能：用于颁发在线奖励的脚本，采用JSON配置阶段奖励，NextLevel构造脚本，具有配置清晰便捷、代码逻辑清晰的特点。
 * 		支持配置的奖励有 金币、经验、点券、抵用券、信用点 和 有效物品
 * 		支持输入整数按份领取奖励列表
 * 作者：Magical-H (https://www.github.com/Magical-H)
 * 版本：1.0
 * 日期：2025-06-27
 */

/**
 * 奖励配置
 * - itemlist的id解释：
 * - 0：金币;
 * - 1：点券;
 * - 2：抵用券;
 * - 4、信用点;
 * - 5、经验值;
 * - id ≥ 1_000_000 的为有效物品ID，自动区分，你只需要操心客户端有没有填入的物品即可。
 */
var config = {
	reward:[
		{
			online:10,	//时长限制，单位：分钟
			itemlist:[
				// id解释：0：金币;  1：点券;  2：抵用券;  4、信用点; 5、经验值;  id ≥ 1_000_000 的为有效物品ID，自动区分，你只需要操心客户端有没有填入的物品即可。
				{id:0,qty:10000},	//金币，数量1万
				{id:2430033,qty:5}	//北斗指南书碎片，数量5
			]
		},{
			online:30,
			itemlist:[
				{id:0,qty:50000},	//金币
				{id:1,qty:1000},	//点券，数量1千
				{id:2430033,qty:10}	//北斗指南书碎片
			]
		},{
			online:60,
			itemlist:[
				{id:0,qty:100000},	//金币
				{id:1,qty:1000},	//点券，数量1千
				{id:2430033,qty:15},	//北斗指南书碎片
			]
		},{
			online:120,
			itemlist:[
				{id:0,qty:150000},	//金币
				{id:1,qty:3000},	//点券，数量1千
				{id:2430033,qty:20},	//北斗指南书碎片
			]
		},{
			online:240,
			itemlist:[
				{id:0,qty:200000},	//金币
				{id:1,qty:4000},	//点券，数量1千
				{id:2430033,qty:25},	//北斗指南书碎片
				{id:4310000,qty:1}	//绝对音感
			]
		},{
			online:360,
			itemlist:[
				{id:0,qty:400000},	//金币
				{id:1,qty:5000},	//点券，数量1千
				{id:2430033,qty:30},	//北斗指南书碎片
				{id:4310000,qty:2}	//绝对音感
			]
		},{
			online:480,
			itemlist:[
				{id:0,qty:500000},	//金币
				{id:1,qty:6000},	//点券，数量1千
				{id:2430033,qty:35},	//北斗指南书碎片
				{id:4310000,qty:3}	//绝对音感
			]
		},
	]
}

/**
 * 全局变量
 * - 累计在线分钟数
 * @type {number}
 */
var g_OnlineMinutes = 0;
/**
 * 全局变量
 * - 奖励领取状态
 * @type {number}
 */
var g_ClaimStatus;
/**
 * 全局变量
 * - 待兑换的奖励索引
 * @type {number}
 */
var g_Select;
/**
 * 全局变量
 * - 待兑换的奖励份数
 * @type {number}
 */
var g_itemCount = 1;

// 定义物品显示模板的映射表（ES6对象字面量优化）
const ITEM_TEMPLATES = {
	0: '#fUI/Basic.img/BtCoin/normal/0#   #fUI/UIWindow.img/QuestIcon/7/0#',	//金币
	1: '#fUI/CashShop.img/CashItem/0#   #e#bNX Cash#k#n',
	2: '#fUI/CashShop.img/CashItem/0#   #e#bMaple Points#k#n',
	4: '#fUI/CashShop.img/CashItem/0#   #e#bGift Tokens#k#n',
	5: '#fUI/UIWindow.img/AriantMatch/characterIcon/2#   #fUI/UIWindow.img/QuestIcon/8/0#'	//经验值
};

function start() {
	var limitDt = new Date();
	limitDt.setHours(0, 0, 5, 0);
	if (new Date() <= limitDt) {
		cm.sendOkLevel("","Online rewards are still initializing, please try again later...");
	} else {
		g_OnlineMinutes = getOnlineMinute();
		g_ClaimStatus = getOnlineStatus() || 0;
		levelmain();
	}
}

function level() {
	cm.dispose();
}
function levelnull() {
	level();
}
function leveldispose() {
	level();
}

function levelmain() {
	text = "Dear player: #e#b#h ##k#n, thank you for your continued support!\r\n";
	text += `#eOnline time accumulated today: #n${formatMinutes(g_OnlineMinutes)}\r\n`;
	text += "We have prepared generous online-time rewards for you. Click to claim the rewards below:\r\n";
	text += getOnlineRewardListText() + "\r\n\r\n";
	text += "\r\n【Claiming Notes】\r\n · Each reward must be claimed manually\r\n · Accumulated time is #b#e#rreset#b#n at 0:00 daily#k\r\n · Rewards will not be granted if your inventory is full\r\n · The longer you stay online, the richer the rewards!"
	if (g_ClaimStatus == ((1 << config.reward.length) - 1)) {
		cm.sendOkLevel("",text);	
	} else {
		cm.sendNextSelectLevel("claimrewards",text);
	}
}

function levelclaimrewards(Select) {
	const reward = config.reward[Select];
	g_ClaimStatus |= (1 << Select);
	let text = "\r\n";
		text += getRewardList(Select);
	if (reward.isReceive) {	//已领取
		text += "\r\n\r\n#r#eYou have already claimed the rewards above and cannot claim them again.#k#n"
	} else if (!reward.isClaimed) {//未满足在线时长
		text += "\r\n\r\n#r#eYour online time is not yet enough to claim the rewards above.#k#n"
	} else {	//待领取
		text += "\r\n\r\n#b#eYou have met the requirements. Would you like to claim the rewards?#n#k";
		g_Select = Select;
		cm.sendYesNoLevel("","giveRewardItems",text);
		return;
	}
	cm.sendOkLevel("",text);
}
function levelgiveRewardItems() {
	cm.sendOkLevel("",giveRewardItems(g_Select,g_itemCount));
}
/**
 * 生成奖励物品的显示列表
 * @param {number} Select - 奖励索引
 * @param {Number} [count=1] - 包含奖励数据的配置对象
 * @returns {string} 格式化后的奖励列表字符串，每项用换行符分隔
 */
function getRewardList(Select,count = 1) {
	let reward = config.reward[Select];
	let text = reward.title + "\r\n\r\n";
	return text + reward.itemlist.map(obj => {
		let { id, qty } = obj;// 通过解构赋值获取当前物品属性
		let itemshow = ITEM_TEMPLATES[id] ?? '';// 根据物品ID获取基础显示模板（使用空值合并运算符??）
		if (count > 1) qty = `${qty}#k × ${count} sets = #b${qty * count}#k`;
		// 处理不同物品类型的显示逻辑
		if (id >= 1_000_000) {  // 有效的物品ID≥7位数，使用数字分隔符提高可读性
			itemshow = `#i${id}#   #e#b#t${id}##k#n × #r${qty}#k`;
		} else if (itemshow) {// 已知物品追加数量显示
			itemshow += ` × #r${qty}#k`;
		} else {// 未知物品显示错误提示
			itemshow = `#fUI/UIWindow.img/KeyConfig/BtHelp/mouseOver/0# #e#rUnknown item ID: [#k ${id} #r]#k#n`;
		}
		return `#fUI/CashShop.img/CSDiscount/arrow# ${itemshow}`;// 为每项添加统一前缀并返回
	}).join('\r\n');  // 用回车换行符连接所有项
}
/**
 * 发放奖励道具（支持多份兑换）
 * @param {number} Select - 奖励索引
 * @param {number} [count=1] - 兑换份数（默认为1）
 * @returns {string} 发放结果信息（失败时返回无法兑换的物品列表）
 */
function giveRewardItems(Select,count = 1) {
	if (count <= 0 || count > g_itemCount) {
		return "The number of sets entered cannot be ≤0 and cannot exceed the maximum of " + g_itemCount;
	}
	const reward = config.reward[Select];
	// 验证普通物品
	const failedItems = [];
	const normalItems = reward.itemlist.filter(obj => obj.id >= 1_000_000);

	for (const {id, qty} of normalItems) {
		const totalQty = qty * count;
		if (!cm.canHold(id, totalQty)) {
			failedItems.push(`#fUI/UIWindow.img/FadeYesNo/BtCancel/mouseOver/0# #i${id}#   #b#t${id}##k × #r${totalQty}#k`);
		}
	}

	if (failedItems.length > 0) {
		return ` Not enough inventory space to redeem the following items:\r\n\r\n${failedItems.join('\r\n')}`;
	}

	// 实际发放所有物品
	const successItems = [];
	for (const {id, qty} of reward.itemlist) {
		const totalQty = qty * count;
		let succitemshow;

		if (id >= 1_000_000) {
			cm.gainItem(id, totalQty);
			succitemshow = `#i${id}#   #b#t${id}##k × #r${totalQty}#k`;
		} else {
			switch(id) {
				case 0:
					cm.gainMeso(totalQty);
					succitemshow = `${ITEM_TEMPLATES[id]} × #r${totalQty}#k`;
					break;
				case 1:
				case 2:
				case 4:
					cm.getPlayer().getCashShop().gainCash(id, totalQty);
					succitemshow =`${ITEM_TEMPLATES[id]} × #r${totalQty}#k`;
					break;
				case 5:
					cm.gainExp(totalQty);
					succitemshow =`${ITEM_TEMPLATES[id]} × #r${totalQty}#k`;
					break;
			}
		}
		if (succitemshow) {
			successItems.push(`#fUI/Basic.img/CheckBox/1# ${succitemshow}`);
		}
	}
	saveOnlineStatus(g_ClaimStatus);//更新领取记录
	cm.dropMessage(0,`You have successfully claimed ${reward.title.toString().replace(/#[a-zA-Z]/g,"")}!`);
	return `#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n${successItems.join('\r\n')}`;
}

/**
 * 获取当前账号每日在线奖励领取状态
 * @returns {string}
 */
function getOnlineStatus() {
	return cm.getAccountExtendValue("每日在线奖励领取状态",true);
}

/**
 * 保存当前账号每日在线奖励领取状态
 * @returns {string}
 */
function saveOnlineStatus(status) {
	cm.saveOrUpdateAccountExtendValue("每日在线奖励领取状态", status.toString(), true);
}


/**
 * 将分钟格式化为d天h小时m分
 * @param minutes 分钟
 * @returns {string} 格式化字符串
 */
function formatMinutes(minutes) {
	const days = Math.floor(minutes / 1440);  // 1440 = 24*60
	minutes = minutes % 1440;
	const hours = Math.floor(minutes / 60);
	minutes = minutes % 60;

	let result = '';
	if (days > 0) result += `#r${days.toString().padStart(3," ")}#kd`;
	if (hours > 0) result += `#b${hours.toString().padStart(3," ")}#kh`;
	if ((hours > 0 && minutes > 0) || (hours === 0 && minutes >= 0)) {
		result += `#d${minutes.toString().padStart(2," ")}#km`;
	}

	return result;
}


/**
 * 获取玩家在线分钟数
 * @returns {number} 在线分钟数
 */
function getOnlineMinute() {
	return Math.floor(cm.getOnlineTime() / 60);
}


function getOnlineRewardListText() {
	let listtext = [];
	let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
	let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
	let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";

	return config.reward.map((obj, i) => {
		const isReceived = (g_ClaimStatus & (1 << i)) !== 0;  // 精确检查每一位
		const isClaimable = g_OnlineMinutes >= obj.online;
		let text = "";

		config.reward[i] = {
			...obj,
			isReceive: isReceived,
			isClaimed: isClaimable,
			title: `#b【${formatMinutes(obj.online)}#b】Online Reward List`,
		};

		if (!isReceived) {
			listtext.push(1);
			if (isClaimable) {
				text += `\r\n#L${i}##bClaim【${formatMinutes(obj.online)}#b】online reward ${CheckBox_0}#k#l`;
			} else {
				text += `\r\n#L${i}##rView【${formatMinutes(obj.online)}#r】online reward ${CheckBox_2}#k#l`;
			}
		} else {
			if (i > 0 && listtext[i-1] === 1) text += "\r\n";
			text += `\r\n\t  Claimed【${formatMinutes(obj.online)}】online reward ${CheckBox_1}`;
			listtext.push(0);
		}
		return text;
	}).join("");
}

