/**BeiDou Item Spawner



---By hanmburger*/
var status;

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
			//First dialog layer
			cm.sendGetNumber("Enter an #bitem ID#k and I'll spawn it for you.\r\nI can conjure up #rany item#k in the game!",0,0,99999999);
	    }
		else if (status == 1 )
		{
			//Second dialog layer
		    if (1)
		    {
		    	cm.gainItem(selection,1);
		    	var text = "Here you go, enjoy! You received #i" + selection + "# #r#t" + selection + "##k.";
		        cm.sendOk(text);
		        cm.dispose();

		    }
		    else
		    {
		    	cm.sendOk("Sorry, #rthat item doesn't exist#k.");
		    	cm.dispose();
		    }
		}
		else
		{
			//Loop reaches here after the final dialog; exit and finish
			cm.dispose();
		}
	}
			
}

function CheckStatus(mode)
{
	if (mode == -1)
	{
		cm.dispose();//Cancel was clicked: stop and finish
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
		cm.dispose();//Prevents a bug when the first dialog has a Previous or Cancel button.
		return false;
	}	
	return true;
}