Install [chrome extension](https://chrome.google.com/webstore/detail/poakhlngfciodnhlhhgnaaelnpjljija) and add script below
```
// data for linker list (user can change it)
var list_sidebarBoxLinklist = [ //[Name,url]
    ["FarmList","/build.php?tt=99&id=39"],
    ["Att Comming","/build.php?gid=16&tt=1&filter=1&subfilters=1"],
    ["Green Attack Report","/berichte.php?t=1&opt=AAABAA=="],
    ["troopEscape","/build.php?tt=0&id=39"]
];
var h = document.getElementsByTagName("head")[0];
function AddUriScript(uri)
{
    var s = document.createElement('script');
    s.setAttribute("src",uri);
    h.appendChild(s);
}
AddUriScript("https://cdn.rawgit.com/tqk2811/travian_js/ee3a6cba/loadgithub.js");
AddGithubScript("tqk2811","travian_js","master","libs.js");
```

