/*
StudyJS-By HaiLong

BaseFunction:                                                             type |          mode               |  section
0:  sendYesNo(str) -[弹出Yes/No对话框]                                     1   |  是=1,否=0,结束=-1          |     \
1:  sendNext(str)  -[弹出带有下一个的对话框]                               0   |  下一项=1,结束=-1           |     \
2:  sendPrev(str)  -[弹出带有上一个的对话框]                               0   |  上一项=0,结束=-1           |     \
3:  sendOk(str)    -[弹出带有确定的对话框]                                 0   |  确定=1,结束=-1             |     \
4:  sendNextPrev(str)      -[弹出上&下一个的对话框]                        0   |  上一项=0,下一项=1,停止=-1  |     \
5:  sendAcceptDecline(str) -[弹出接受&拒绝的对话框]                        12  |  接受=1,拒绝=0,结束=-1      |     \  
6:  sendSimple(str) -[弹出带有选项(#L索引# xxx #l)的对话框]                4   |  选择=1,结束=0              |  选择的索引       
7:  sendStyle(str,int styles[]) -[弹出选择造型的对话框]                    0   |  确定=1,取消=0,结束=-1      |  选择的索引
8:  sendGetNumber(str,int def, int min, int max) -[弹出输入数字的对话框]   0   |  确定=1,结束=0              |  输入的数字
9:  setGetText(str) -[保存指定的字符串]                                    \   |          \                  |     \
10: sendGetText(str) -[弹出带有输入字符串的对话框]                         0   |  确定=1,结束=0              |     \
11: getText(str) -[返回sendGetText(str)/setGetText(str)寫入的字符串]       \   |          \                  |     \

AllowFunction-could use directly
-gainMeso获取金币(int gain);
 */


var status = -1; 

//Start
function start(mode, type, selection)
{
	if (CheckStatus(mode))
	{
	    if (status == 0)
	    {
			//第一层对话
			qm.sendNext("Hey, are you a new adventurer? As you can see, somewhere in the MapleStory world there's a village forever covered in ice and snow, #bEl Nath#k. There's a little story about this place. Are you interested?");
	    }
		else if (status == 1 )
		{
			//第二层对话
			var text = "It's said that deep within this place dwells a terrifying being, and its curse is what makes the snow fall here all year round. Long ago, a small party set out to slay this legendary monster.";
            text += "The party gathered the four strongest classes in the MapleStory world, but they sprang a trap right before reaching the cave maze where the monster was hiding. The Warrior captain stayed behind forever to save his comrades.";
			text += "Their only Cleric was finally infected by the monster's fire poison and lost himself to madness. Even so, though they won, it was a hollow victory. Among them, the Bowman and the Thief were husband and wife.";
			text += "The Thief was with child, never knowing that the monster, in its dying moment, would pour the last of its wicked will into her body, hoping to be reborn through it.";
			text += "After they returned to the village, the chief Alcaster heard of this and sought to put the Bowman's wife to death. He bound her with magic, and the villagers tied her to the altar.";
			text += "In the end, those two also died at last. Of the expedition that hunted the monster, not a single soul survived... It's said the monster was reborn after all. The last people to see it could only faintly make out that it had eight arms...";
			qm.sendNextPrev(text);
		}
		else if (status == 2)
		{
			qm.sendAcceptDecline("So, was the story interesting? It might still be a bit much for you, though. How about it, want to warm up a little?");
		}
		else if (status == 3)
		{
			//最后一层对话完继续循环至此，退出结束
			qm.sendOk("Alright, go hunt 5 #b#o9409000##k!");
			qm.forceStartQuest();
            qm.dispose();
		}
		else
			qm.dispose();
	}
}

function end(mode, type, selection)
{
	if (CheckStatus(mode))
	{
	    if (status == 0)
	    {
			//第一层对话
            qm.sendOk("Not bad! Quest complete! Here's your reward, I hope you'll find it useful\r\n\r\n#fUI/CashShop.img/CSDiscount/bonus# Meso x50000");
			qm.forceCompleteQuest();
			qm.gainMeso(50000);
            qm.dispose();			
	    }
		else if (status == 1 )
		{
			//第二层对话			
		}
		else
		{
			//最后一层对话完继续循环至此，退出结束
			qm.dispose();
		}
	}
			
}

function CheckStatus(mode)
{
	if (mode == -1)
	{
		qm.dispose();
		return false;
	}
	
	if (mode == 1)
	{
		status++;
	}
	else
	{
		status--;
	}
	
	if (status == -1)
	{
		qm.dispose();
		return false;
	}	
	return true;
}