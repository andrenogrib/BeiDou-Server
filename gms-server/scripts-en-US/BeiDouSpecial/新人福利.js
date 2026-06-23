/*
Script: Newbie Welcome Gift
Author: SpicyBurgerKing
Date: 2024-10-31
Note: BeiDou Dev Team
Modified to skip the gift box and instead grant random Mesos + NX for a head start
 */

var status;
var mesoQty;    // Meso amount
var cashQty;    // NX amount

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
			//First dialog stage
			var strGetText = cm.getCharacterExtendValue("新人福利礼包");
			if ( strGetText == "已领取" )
			{
				cm.sendOk("You have already claimed the #bNewbie Welcome Gift#k.\r\n\r\nEach character may claim it #ronly once#k.");
				cm.dispose();
			}
			else
			{
				// Generate random amounts
				mesoQty = Math.floor(Math.random() * 501) + 500;     // Mesos: random 5,000,000-10,000,000 (adjust as needed)
				cashQty = Math.floor(Math.random() * 101) + 100;  // NX: random 1,000,000-2,000,000

				cm.sendAcceptDecline("Are you sure you want to claim the #bNewbie Welcome Gift#k?\r\n\r\n"
					+ "Each character may claim it #ronly once#k.\r\n\r\n"
					+ "#r#e Rewards #n#k\r\n"
					+ "#b" + mesoQty + "0,000 Mesos#k\r\n"
					+ "#b" + cashQty + "0,000 NX#k");
			}
		}
		else if (status == 1 )
		{
			//Second dialog stage
			cm.saveOrUpdateCharacterExtendValue("新人福利礼包", "已领取");

			// Grant Mesos (note: mesoQty is in units of 10,000, so multiply by 10000)
			cm.gainMeso(mesoQty * 10000);

			// Grant NX
			cm.getPlayer().getCashShop().gainCash(1, cashQty *10000);

			cm.sendOk("Congratulations! You received:\r\n\r\n"
				+ "#b" + mesoQty + "0,000 Mesos#k\r\n"
				+ "#b" + cashQty + "0,000 NX#k\r\n\r\n"
				+ "Enjoy the game!");
			cm.dropMessage(5,"[Newbie Reward] Player [" + cm.getPlayer() + "] joined the game and claimed starter Mesos "+mesoQty+"0,000 + NX "+cashQty+"0,000!");
			cm.dispose();
		}
		else
		{
			//Reached after the final dialog stage; exit and end
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
		// If the user clicks "No", end immediately
		if (status == -1)
		{
			cm.sendOk("No problem! Come back and claim your gift anytime.");
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