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
			qm.sendNext("Oh, esteemed adventurer #r#h ##k, welcome to #b<BeiDou MapleStory>#k, this fantastical land shrouded in mystery and wonder! I am your guide, #rXiaoshui (Little Nap)#k, a being of both wisdom and grace, here to await your arrival.")
	    }
		else if (status == 1 )
		{
			//第二层对话
			qm.sendNextPrev("Haha, congratulations! The dice of destiny have tossed you into this absurd grand adventure! Are you ready? Endless laughter, strangeness, and the unbelievable lie ahead! From the wild party in Magatia City, straight into a frozen wonderland of ice and snow, then plunging into the magical mushroom rings of the forest maze, and finally drifting off to the galactic message-in-a-bottle gala of the star islands!")
		}
		else if (status == 2)
		{
			//最后一层对话完继续循环至此，退出结束
		    if (mode == 0)
		    {
		    	qm.forceStartQuest();
                qm.gainMeso(100000);			
		    	qm.forceCompleteQuest();
				qm.dispose();
		    }
			else
			{
				qm.sendNextPrev("Remember, MapleStory isn't just an adventure, it's a merciless mockery of the ordinary, a total subversion of logic! So let loose your sense of humor, embrace this madness, and join us in creating our own neurotic legend amid the absurd and the fantastical! Haha, let's laugh at life together and go crazy all the way to the end!");
			}
			
		}
		else if (status == 3)
		{
			if (qm.getPlayer().getMapId() != 4)
			{
				qm.sendAcceptDecline("Would you like to return to #bAmherst (Green Apple Paradise)#k?");
			}
			else
			{
			    qm.sendOk("Please talk to Yesterday's Slumber standing in front of you! Enjoy the game.");
			    qm.forceStartQuest();
                qm.dispose();				
			}

		}
		else if (status == 4)
		{
			if (qm.getJobId() == 0)
			{
			    qm.warp(4);
			    qm.sendOk("Please talk to Yesterday's Slumber standing in front of you! Enjoy the game.");
			    qm.forceStartQuest();			
			    qm.dispose();				
			}
			else
			{
				qm.sendOk("Huh, turns out you're not a beginner. Unfortunately I can't take you to Amherst (Green Apple Paradise), but I can still give you some starting funds:\r\n #fUI/CashShop.img/CashItem/0# x100000");
				qm.forceStartQuest();
                qm.gainMeso(100000);			
		    	qm.forceCompleteQuest();
				qm.dispose();
			}
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
            qm.sendOk("Looks like you've already met Xiaoshui (Little Nap). Welcome to BeiDou! Here are your starting funds, may they help you on your adventure.\r\n\r\n#fUI/CashShop.img/CSDiscount/bonus# Mesos: 100000");
            qm.gainMeso(100000);			
			qm.forceCompleteQuest();
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