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
11: getText() -[返回sendGetText(str)/setGetText(str)寫入的字符串]       \   |          \                  |     \

 */

var status = -1;


function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            qm.sendNext("Hey there, adventurer~ After all these years you've returned to the Maple Island of your memories. Do you remember? This was your very first stop when you set out on your journey.");
        } 
		else if (status == 1) 
		{
			
			qm.sendAcceptDecline("Perhaps you already know the jobs and villages by heart, but it's my duty to introduce the 4 jobs to you, so I hope you'll accept.");
        }
		else if (status == 2 && mode == 1)
		{
			qm.sendOk("Thank you so much! Press the #bALT#k key to jump onto the conveyor and relive the characters from before the Big Bang. Once you've finished looking around, talk to my good friend Roger.")
            qm.forceStartQuest();
            qm.dispose();			
		}
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            qm.sendNext("Hello, dear adventurer. Sally sent you here, didn't she? That means you're already familiar with the 4 basic jobs from before the Big Bang. The current version is based on #bCMS079#k, so we also have the Pirate. Oh, you're asking about the #rAran and Evan#k? Those are unorthodox paths...");
        } else if (status == 1) {
			qm.sendOk("Dear adventurer, may you return to your childhood and enjoy the carefree, joyful days of adventure once more!");
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}