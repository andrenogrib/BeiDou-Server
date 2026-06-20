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
var text;
//Start
function start(mode, type, selection)
{
	if (CheckStatus(mode))
	{
	    if (status == 0)
	    {
			//第一层对话
			qm.sendNext("This is terrible! An evil presence is invading the world of MapleStory. Warrior, please hear me out...");
	    }
		else if (status == 1 )
		{
			//第二层对话
			if (mode == 0)
			{
				qm.sendOk("Don't be so cold! The safety of the world of MapleStory needs your strength too!");
				qm.dispose();
			}
			else
			{
			    text = "The monsters of the world of MapleStory used to be very peaceful, but somehow something has happened. Recently the BeiDou Weather Station detected that the world of MapleStory is being devoured by a powerful dark force. The first region where anomalies were found is the Monkey Forest located in the #bOutskirts of the Magic Library#k!";
			    text += "One by one, the monkeys are dying and mutating under the influence of the dark force. Some have even seen dead monkeys come back to life and attack humans indiscriminately! This may only be the beginning.";
			    qm.sendNextPrev(text);				
			}
		}
		else if (status == 2 )
		{
			qm.sendAcceptDecline("Warrior, I know you are very strong. Please #rhelp us, I can send you there!!#k");
		}
		else if (status == 3)
		{
			if (qm.getLevel() < 40)
			{
				qm.sendOk("You'd better wait until you're level 40 before going. If you go now, you'll be done for.");
				qm.dispose();
			}
			else if(qm.getMapId() == 300000012) {
				qm.sendOk("I'll come get you once you've served your sentence and been released!");
				qm.dispose();
			} else
			{
				qm.warp(100040103);
			    qm.sendOk("Thank you. Please help me destroy 200 of them. Hopefully this will help curb the dark presence in the world of MapleStory.");
			    qm.forceStartQuest(); 
                qm.dispose();				
			}

		}
	}
}

function end(mode, type, selection)
{
	if (CheckStatus(mode))
	{
	    if (status == 0)
	    {
			//第一层对话
            qm.sendOk("My goodness, you destroyed 200 of them so quickly! The world of MapleStory is saved! Thank you~!");
			qm.forceCompleteQuest();
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