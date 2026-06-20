/*
脚本：新人福利礼包
作者：SpicyBurgerKing
日期：2024-10-31
备注：北斗开发组
修改部分内容不给盒子直接给随机金币+点券开荒
 */

var status;
var mesoQty;    // 金币数量
var cashQty;    // 点券数量

//Start
function start()
{
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)
{
	if (CheckStatus(mode))
	{
		if (status == 0)
		{
			//第一层对话
			var strGetText = cm.getCharacterExtendValue("新人福利礼包");
			if ( strGetText == "已领取" )
			{
				cm.sendOk("You have already claimed the newbie reward. Each character#r may claim it only once.#k");
				cm.dispose();
			}
			else
			{
				// 生成随机数量
				mesoQty = Math.floor(Math.random() * 501) + 500;     // 金币随机50-100万（可以根据需要调整）
				cashQty = Math.floor(Math.random() * 101) + 100;  // 点券随机100-200

				cm.sendAcceptDecline("Are you sure you want to claim the newbie gift? Each character#r may claim it only once.#k\n\n\r\n"
					+ "Rewards:\n"
					+ "#b" + mesoQty + "#k0,000 Mesos\n"
					+ "#b" + cashQty + "#k0,000 NX");
			}
		}
		else if (status == 1 )
		{
			//第二层对话
			cm.saveOrUpdateCharacterExtendValue("新人福利礼包", "已领取");

			// 给金币（注意：这里mesoQty是万为单位，所以需要乘以10000）
			cm.gainMeso(mesoQty * 10000);

			// 给点券
			cm.getPlayer().getCashShop().gainCash(1, cashQty *10000);

			cm.sendOk("Congratulations, you received:\n"
				+ "#b" + mesoQty + "#k0,000 Mesos\n"
				+ "#b" + cashQty + "#k0,000 NX\n\n"
				+ "Enjoy the game!");
			cm.dropMessage(5,"[Newbie Reward] Player [" + cm.getPlayer() + "] joined the game and claimed starter Mesos "+mesoQty+"0,000 + NX "+cashQty+"0,000!");
			cm.dispose();
		}
		else
		{
			//最后一层对话完继续循环至此，推出结束
			cm.dispose();
		}
	}

}

function CheckStatus(mode)
{
	if (mode == -1)
	{
		cm.dispose();
		return false;
	}

	if (mode == 1)
	{
		status++;
	}
	else
	{
		status--;
		// 如果用户点击"否"，直接结束
		if (status == -1)
		{
			cm.sendOk("Alright, come back to claim it next time.");
			cm.dispose();
			return false;
		}
	}

	if (status == -1)
	{
		cm.dispose();
		return false;
	}
	return true;
}