function Get_gid()
{
	var gid_str = e_build.getAttribute("class").split(" ")[0];
	var gid = Number(gid_str.substring(3,gid_str.length));
	console.log("gid:" + gid);
	switch(gid)
	{
		case 17: gid17(); return;
		
		default: return;
	}
}


function gid17()
{
	if(tabActive !== null && tabActive !== undefined)
	{
		var tabItem = tabActive[0].getElementsByClassName("tabItem")[0];
		if(tabItem.getAttribute("href").indexOf("t=0")>=0)
		{
			var descriptionAndInfo = document.getElementById("descriptionAndInfo");
			if(descriptionAndInfo !== null && descriptionAndInfo !== undefined)
			{
				var button_clear = document.createElement("button");
				button_clear.innerText = "Clear All Trade Routes";
				button_clear.setAttribute("style","background-color:red;border:none;color:white;padding: 3px;");
				button_clear.setAttribute("onclick","gid17_clear_onclick()");
				descriptionAndInfo.appendChild(button_clear);
				
				//for(var i=0; i < 4; i++)
				//{
					//var input_tr = document.createElement("input");
					//input_tr.setAttribute("type","number");
					//input_tr.setAttribute("size","4");
					//Input_traderoutes.push(input_tr);
				//}
				
				
				
			}
		}
	}
	
}
function gid17_clear_onclick()
{	
	if(window.confirm("Are you sure to clear all trade routes?"))
	{
		localStorage.setItem("Flag_deleteAll_Trading_routes",1); 
		window.location.href = window.location.href;
	}
}
function gid17_clear()
{
	var flag = localStorage.getItem("Flag_deleteAll_Trading_routes");
	if(flag !== null && flag !== undefined && flag + 0 != 0)	
	{
		var trading_routes = document.getElementById("trading_routes");
		if(trading_routes !== null |trading_routes !== undefined)
		{
			var sels = trading_routes.getElementsByClassName("sel");
			if(sels !== null && sels !==undefined )
			{
				if(sels.length >0)
				{
					var a_tr = sels[0].getElementsByTagName("a");
					if(a_tr !== null && a_tr !== undefined && a_tr.length >0 )a_tr[0].click();
				}else localStorage.setItem("Flag_deleteAll_Trading_routes",0);
			}
		}
	}
}


gid17_clear();
var Input_traderoutes = [];
var tabActive = document.getElementsByClassName("container active");
var e_build = document.getElementById("build");
if(e_build !== null && e_build !== undefined) Get_gid();