/**BeiDou script

Daily check-in script

---By hanmburger*/
var status = -1;
var text;
var BeiDouUI ="#fMap/MapHelper.img/BeiDou/logo#";

// Online time (in minutes) required for each reward tier
var condition = new Array(30, 60, 120, 180, 240, 300, 360);

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
			//First dialog level
			text = cm.getCharacterExtendValue("每日签到",true);
			if (text == "TRUE")
			{
			    cm.sendOk("You've already done your #bDaily Check-in#k today.\r\n\r\nCome back #rtomorrow#k for your next reward!");
			    cm.dispose();
			}
			else
			{
			    cm.saveOrUpdateCharacterExtendValue("每日签到", "TRUE",true);
			    cm.sendOk("#bDaily Check-in#k complete!\r\n\r\nHere's your reward: #r1,000,000 mesos#k.\r\n\r\nThanks for stopping by, and see you tomorrow!");
				cm.gainMeso(1000000);
			    cm.dispose();				
			}
	    }
		else
		{
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
	}
	
	if (status == -1)
	{
		cm.dispose();
		return false;
	}	
	return true;
}

//Get the current time
function getNowTime() {
    var date = new Date();
    //Year getFullYear(): returns the four-digit year
    var year = date.getFullYear();  //getFullYear() replaces getYear()
    //Month getMonth(): 0 ~ 11
    var month = date.getMonth() + 1;
    //Day getDate(): (1 ~ 31)
    var day = date.getDate();
    //Hour getHours(): (0 ~ 23)
    var hour = date.getHours();
    //Minute getMinutes(): (0 ~ 59)
    var minute = date.getMinutes();
    //Second getSeconds(): (0 ~ 59)
    var second = date.getSeconds();

    var time = 'The current time is: ' + year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
}


//Pad values below 10 with a leading zero
function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}
