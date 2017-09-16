//var village_object = {Storage=80000,Granary=80000
//                        Resource=[27352,12321,24343,20654],//Wood,Clay,Iron,Crop
//  var Builds=[2365664,3335544,23353354]};
function FindActiveVillage(listVillages)
{
  for(var i = 0; i < listVillages.length; i++) if(listVillages[i].getAttribute("class") === " active") return listVillages[i];
  return null; 
}
function getQueryVariable(q,variable) {
    var query = q.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
  return null;
}
function LoadLiResource(e,value,max)
{
  var res = document.createElement("span");
  var percent = Math.round((value * 100)/max,0);
  if(percent <10) res.innerText = "0"+Math.round((value * 100)/max,0) + "% ";
  else res.innerText = Math.round((value * 100)/max,0) + "% ";
  e.appendChild(res);
}
function LoadLiBuildTimer(e,time,current,flag)
{
  if(time-current <= 0) return;
  if(flag)
  {
    var t2 = document.createElement("span");
    t2.innerText = "  ー  ";
    e.appendChild(t2);
  }
  var t = document.createElement("span");
  t.setAttribute("class","timer");
  t.setAttribute("counting","down");
  t.setAttribute("style","color:blue");
  t.setAttribute("value",time-current);
  e.appendChild(t);  
  Travian.TimersAndCounters.initTimer(t);
}
function LoadVillageData(li_element,village_data,uri_)
{
  var e = document.createElement("p1");
  e.setAttribute("href",uri_);
  li_element.appendChild(e);
  LoadLiResource(e,village_data.Resource[0],village_data.Storage);
  LoadLiResource(e,village_data.Resource[1],village_data.Storage);
  LoadLiResource(e,village_data.Resource[2],village_data.Storage);
  LoadLiResource(e,village_data.Resource[3],village_data.Granary);
  var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
  var flag = false;
  var br = document.createElement("br");
  e.appendChild(br);
  for(var i = 0; i < village_data.Builds.length; i++) 
  {
    if(village_data.Builds[i] < current_SecondFrom1970) continue;
    LoadLiBuildTimer(e,village_data.Builds[i],current_SecondFrom1970,flag);
    flag = true;
  }
}

var sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
var listVillage = sidebarBoxVillagelist.getElementsByTagName("li");//list elements village
var active_village = FindActiveVillage(listVillage);
var json_village = null;
var id = null
for(var i =0; i < listVillage.length; i++)
{
  var uri_ = listVillage[i].getElementsByTagName("a")[0].getAttribute("href");
  id = getQueryVariable(uri_,"newdid");
  if(id === null | id === undefined) continue;
  console.log(id);
  if(listVillage[i] === active_village)
  {
    //update data current village
    var Wood = Number(document.getElementById("l1").innerText.replace(".","").replace(",",""));
    var Clay = Number(document.getElementById("l2").innerText.replace(".","").replace(",",""));
    var Iron = Number(document.getElementById("l3").innerText.replace(".","").replace(",",""));
    var Crop = Number(document.getElementById("l4").innerText.replace(".","").replace(",",""));
    var Storage__ = document.getElementById("stockBarWarehouse").innerText.replace(".","").replace(",","");    
    var Granary__ = document.getElementById("stockBarGranary").innerText.replace(".","").replace(",","");
    
    var Storage_ = Number(Storage__.substring(1, Storage__.length -1));
    var Granary_ = Number(Granary__.substring(1, Granary__.length -1));
    var build = document.getElementsByClassName("buildDuration");
    var Builds_ = [];
    if(build !== null & build !== undefined & build.length !== 0)
    {
      var current_SecondFrom1970 = Math.round(Date.now()/1000,0);
      for(var k=0; k < build.length; k++)
      {
        var timeleft = build[k].getElementsByTagName("span")[0].getAttribute("value").toFloat();
        Builds_.push(current_SecondFrom1970 + timeleft);
      }
    }else 
    {
      var b = localStorage.getItem("village_"+id);
      if(b !== null & b !== undefined) Builds_ = JSON.parse(b).Builds;
    }
    var village_object = {Storage : Storage_, Granary : Granary_, ID : id,
                        Resource : [Wood,Clay,Iron,Crop],
                        Builds : Builds_};
    localStorage.setItem("village_"+id,JSON.stringify(village_object));
    console.log("Save data village id:" + id);
  }
  json_village = localStorage.getItem("village_"+id);
  if(json_village !== null & json_village !== undefined) 
  {
    LoadVillageData(listVillage[i],JSON.parse(json_village),uri_);
    json_village = null;
  }
  id = null;
}

//Travian.TimersAndCounters.initTimer(element_timer);// <span class="timer" couting="down" value=222></span>
