/**
 * Name: Online Rewards (nextlevel version)
 * Purpose: Script for granting online-time rewards. Reward tiers are configured via JSON and
 * 		built with NextLevel, keeping both the configuration and the code logic clean and easy to follow.
 * 		Supported reward types: meso, EXP, NX Cash, Maple Points, Gift Tokens, and regular items.
 * 		Supports entering an integer to claim multiple sets from the reward list.
 * Author: Magical-H (https://www.github.com/Magical-H)
 * Version: 1.0
 * Date: 2025-06-27
 */

/**
 * Reward configuration
 * - itemlist id meanings:
 * - 0: meso;
 * - 1: NX Cash;
 * - 2: Maple Points;
 * - 4: Gift Tokens;
 * - 5: EXP;
 * - An id >= 1_000_000 is treated as a regular item ID (detected automatically); you only need to make
 *   sure the item exists in the client.
 */
var config = {
	reward:[
		{
			online:10,	//time requirement, in minutes
			itemlist:[
				// id meanings: 0: meso;  1: NX Cash;  2: Maple Points;  4: Gift Tokens; 5: EXP;  id >= 1_000_000 is a regular item ID (detected automatically); just make sure the item exists in the client.
				{id:0,qty:10000},	//meso, 10,000
				{id:2430033,qty:5}	//BeiDou Guidebook Fragment, qty 5
			]
		},{
			online:30,
			itemlist:[
				{id:0,qty:50000},	//meso
				{id:1,qty:1000},	//NX Cash, 1,000
				{id:2430033,qty:10}	//BeiDou Guidebook Fragment
			]
		},{
			online:60,
			itemlist:[
				{id:0,qty:100000},	//meso
				{id:1,qty:1000},	//NX Cash, 1,000
				{id:2430033,qty:15},	//BeiDou Guidebook Fragment
			]
		},{
			online:120,
			itemlist:[
				{id:0,qty:150000},	//meso
				{id:1,qty:3000},	//NX Cash
				{id:2430033,qty:20},	//BeiDou Guidebook Fragment
			]
		},{
			online:240,
			itemlist:[
				{id:0,qty:200000},	//meso
				{id:1,qty:4000},	//NX Cash
				{id:2430033,qty:25},	//BeiDou Guidebook Fragment
				{id:4310000,qty:1}	//Perfect Pitch
			]
		},{
			online:360,
			itemlist:[
				{id:0,qty:400000},	//meso
				{id:1,qty:5000},	//NX Cash
				{id:2430033,qty:30},	//BeiDou Guidebook Fragment
				{id:4310000,qty:2}	//Perfect Pitch
			]
		},{
			online:480,
			itemlist:[
				{id:0,qty:500000},	//meso
				{id:1,qty:6000},	//NX Cash
				{id:2430033,qty:35},	//BeiDou Guidebook Fragment
				{id:4310000,qty:3}	//Perfect Pitch
			]
		},
	]
}

/**
 * Global variable
 * - Accumulated online minutes
 * @type {number}
 */
var g_OnlineMinutes = 0;
/**
 * Global variable
 * - Reward claim status
 * @type {number}
 */
var g_ClaimStatus;
/**
 * Global variable
 * - Index of the reward to be redeemed
 * @type {number}
 */
var g_Select;
/**
 * Global variable
 * - Number of reward sets to be redeemed
 * @type {number}
 */
var g_itemCount = 1;

// Display-template lookup table for reward items (ES6 object-literal style)
const ITEM_TEMPLATES = {
	0: '#fUI/Basic.img/BtCoin/normal/0#   #fUI/UIWindow.img/QuestIcon/7/0#',	//meso
	1: '#fUI/CashShop.img/CashItem/0#   #e#bNX Cash#k#n',
	2: '#fUI/CashShop.img/CashItem/0#   #e#bMaple Points#k#n',
	4: '#fUI/CashShop.img/CashItem/0#   #e#bGift Tokens#k#n',
	5: '#fUI/UIWindow.img/AriantMatch/characterIcon/2#   #fUI/UIWindow.img/QuestIcon/8/0#'	//EXP
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
	text = "Hello, #e#b#h ##k#n! Thank you for your continued support.\r\n";
	text += `#eOnline time today: #n${formatMinutes(g_OnlineMinutes)}\r\n`;
	text += "We've prepared generous online-time #brewards#k for you. Tap an entry below to claim it:\r\n";
	text += getOnlineRewardListText() + "\r\n\r\n";
	text += "\r\n#r#e[ Claiming Notes ]#n#k\r\n · Each reward must be claimed #bmanually#k.\r\n · Your accumulated time #rresets#k daily at #b0:00#k.\r\n · Rewards cannot be granted while your inventory is full.\r\n · The longer you stay online, the richer the rewards!"
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
	if (reward.isReceive) {	//already claimed
		text += "\r\n\r\n#r#eYou have already claimed the rewards above and cannot claim them again.#n#k"
	} else if (!reward.isClaimed) {//online time requirement not yet met
		text += "\r\n\r\n#r#eYour online time isn't enough yet to claim the rewards above.#n#k"
	} else {	//ready to claim
		text += "\r\n\r\n#b#eYou've met the requirements! Would you like to claim these rewards?#n#k";
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
 * Build the display list of reward items.
 * @param {number} Select - reward index
 * @param {Number} [count=1] - number of reward sets to display
 * @returns {string} formatted reward list, one item per line
 */
function getRewardList(Select,count = 1) {
	let reward = config.reward[Select];
	let text = reward.title + "\r\n\r\n";
	return text + reward.itemlist.filter(obj => obj.id < 1_000_000).map(obj => {
		let { id, qty } = obj;// destructure the current item's properties
		let itemshow = ITEM_TEMPLATES[id] ?? '';// look up the base display template by item ID (nullish coalescing ??)
		if (count > 1) qty = `${qty}#k × ${count} sets = #b${qty * count}#k`;
		// handle the display logic per item type
		if (id >= 1_000_000) {  // a regular item ID has >= 7 digits; numeric separators improve readability
			itemshow = `#i${id}#   #e#b#t${id}##k#n × #r${qty}#k`;
		} else if (itemshow) {// known item: append the quantity
			itemshow += ` × #r${qty}#k`;
		} else {// unknown item: show an error notice
			itemshow = `#fUI/UIWindow.img/KeyConfig/BtHelp/mouseOver/0# #e#rUnknown item ID: [#k ${id} #r]#k#n`;
		}
		return `#fUI/CashShop.img/CSDiscount/arrow# ${itemshow}`;// add a uniform prefix to each line and return
	}).join('\r\n');  // join all lines with CRLF
}
/**
 * Grant the reward items (supports redeeming multiple sets).
 * @param {number} Select - reward index
 * @param {number} [count=1] - number of sets to redeem (default 1)
 * @returns {string} result message (on failure, returns the list of items that couldn't be redeemed)
 */
function giveRewardItems(Select,count = 1) {
	if (count <= 0 || count > g_itemCount) {
		return "The number of sets must be greater than 0 and cannot exceed the maximum of " + g_itemCount;
	}
	const reward = config.reward[Select];
	// validate regular items
	const failedItems = [];
	const normalItems = []; // safe-mode: skip regular items (missing on this client's WZ -> crash)

	for (const {id, qty} of normalItems) {
		const totalQty = qty * count;
		if (!cm.canHold(id, totalQty)) {
			failedItems.push(`#fUI/UIWindow.img/FadeYesNo/BtCancel/mouseOver/0# #i${id}#   #b#t${id}##k × #r${totalQty}#k`);
		}
	}

	if (failedItems.length > 0) {
		return `Not enough inventory space to redeem the following items:\r\n\r\n${failedItems.join('\r\n')}`;
	}

	// actually grant all of the items
	const successItems = [];
	for (const {id, qty} of reward.itemlist.filter(obj => obj.id < 1_000_000)) {
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
	saveOnlineStatus(g_ClaimStatus);//update the claim record
	cm.dropMessage(0,`You have successfully claimed ${reward.title.toString().replace(/#[a-zA-Z]/g,"")}!`);
	return `#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n${successItems.join('\r\n')}`;
}

/**
 * Get the current account's daily online-reward claim status.
 * @returns {string}
 */
function getOnlineStatus() {
	return cm.getAccountExtendValue("每日在线奖励领取状态",true);
}

/**
 * Save the current account's daily online-reward claim status.
 * @returns {string}
 */
function saveOnlineStatus(status) {
	cm.saveOrUpdateAccountExtendValue("每日在线奖励领取状态", status.toString(), true);
}


/**
 * Format a minute count as Xd Yh Zm (days/hours/minutes).
 * @param minutes minutes
 * @returns {string} formatted string
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
 * Get the player's online time in minutes.
 * @returns {number} online minutes
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
		const isReceived = (g_ClaimStatus & (1 << i)) !== 0;  // check each bit precisely
		const isClaimable = g_OnlineMinutes >= obj.online;
		let text = "";

		config.reward[i] = {
			...obj,
			isReceive: isReceived,
			isClaimed: isClaimable,
			title: `#b[ ${formatMinutes(obj.online)}#b ]#k Online Reward List`,
		};

		if (!isReceived) {
			listtext.push(1);
			if (isClaimable) {
				text += `\r\n#L${i}##bClaim the [ ${formatMinutes(obj.online)}#b ] online reward ${CheckBox_0}#k#l`;
			} else {
				text += `\r\n#L${i}##rView the [ ${formatMinutes(obj.online)}#r ] online reward ${CheckBox_2}#k#l`;
			}
		} else {
			if (i > 0 && listtext[i-1] === 1) text += "\r\n";
			text += `\r\n\t  Claimed the [ ${formatMinutes(obj.online)} ] online reward ${CheckBox_1}`;
			listtext.push(0);
		}
		return text;
	}).join("");
}

