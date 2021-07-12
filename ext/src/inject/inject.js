chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		s1=window.location["href"];
		s2=s1.slice(0,39);
		if(s2=="https://twitchtracker.com/channels/live")
		{load_save2();}	
		if(s2=="https://twitchtracker.com/channels/most")
		{load_save();}
		// ----------------------------------------------------------

	}
	}, 10);
});



function run4(pgnum,i_id=2){
   dc= document.getElementById("id1"+String(i_id)+"1");
   //dc.innerHTML="<div include-html=\"https://twitchtracker.com/channels/most-followers?page="+String(i)+"\"></div>";
   dc.innerHTML= "<iframe id=\"frame11\" src=\"https://twitchtracker.com/channels/most-followers?page="+String(pgnum)+"\"></iframe>";
   
}

function myLoop(i,lp_mx) {
  setTimeout(function() {
    run4(i); //  your code here                
    if (++i<lp_mx) myLoop(i,lp_mx);   //  decrement i and call myLoop again if i > 0
  }, 5000)
}

function load_save()
{
	console.log("Hello. This message was sent from scripts/inject.js");
	tb=document.getElementById("channels");
	tb=tb.getElementsByTagName("tbody");
	tb=tb[0].getElementsByTagName("tr");
	txt="follower_rank,usr_name,avg_viewers,time_streaamed,peak_viewers,hours_watched,usr_rank,followers_gained,total_followers,total_views,link,\n";
	for (var i = 0; i < tb.length; i++)
	{
		td=tb[i].getElementsByTagName("td");
		
		console.log(i);
		if(td[0].textContent.includes("adsbygoogle")){continue;}
		console.log(td[0].textContent.slice(1),td[1].getElementsByTagName("a")[0].href.slice(26),td[3].textContent);
		txt+=td[0].textContent.slice(1);
		txt+=",";
		txt+=td[1].getElementsByTagName("a")[0].href.slice(26);
		txt+=",";
		txt+=td[3].textContent.replaceAll(",", "");
		txt+=",";
		txt+=td[4].textContent.replaceAll(",", "");
		txt+=",";
		txt+=td[5].textContent.replaceAll(",", "");
		txt+=",";
		txt+=td[6].textContent.replaceAll(",", "");
		txt+=",";
		txt+=td[7].textContent.replaceAll(",", "");
		txt+=",";
		txt+=td[8].textContent.replaceAll(",","").slice(1,-1)
		txt+=",";
		txt+=td[9].textContent.replaceAll(",", "")
		txt+=",";
		txt+=td[10].textContent.replaceAll(",", "");
		txt+=",";
		txt+="twitch.tv/"
		txt+=td[1].getElementsByTagName("a")[0].href.slice(26);
		txt+=",\n";
		
	}
	s1=window.location["href"];
	//s1.slice(0, -1)
	dmn=s1.slice(0, 55);
	if(s1.slice(55)=="")
	{
		pgnum_now=1;
	}
	else
	{pgnum_now=parseInt(s1.slice(55));}
	download(String(pgnum_now)+"tmost.csv",txt);
	if(pgnum_now<5)
	{
		setTimeout(function() {
		window.location.href = "https://twitchtracker.com/channels/most-followers?page="+String(pgnum_now+1);
		}, 100)
	}
	
}
function load_save2()
{
	console.log("Hello. This message was sent from scripts/inject.js");
	tb=document.getElementById("channels");
	tb=tb.getElementsByTagName("tbody");
	tb=tb[0].getElementsByTagName("tr");
	txt="viewers_num_rank,usr_name,link,\n";
	for (var i = 0; i < tb.length; i++)
	{
		td=tb[i].getElementsByTagName("td");
		
		console.log(i);
		if(td[0].textContent.includes("adsbygoogle")){continue;}
		console.log(td[0].textContent.slice(1),td[1].getElementsByTagName("a")[0].href.slice(26),td[3].textContent);
		txt+=td[0].textContent.slice(1);
		txt+=",";
		txt+=td[1].getElementsByTagName("a")[0].href.slice(26);
		txt+=",";
		txt+="twitch.tv/"
		txt+=td[1].getElementsByTagName("a")[0].href.slice(26);
		txt+=",\n";
		
	}
	s1=window.location["href"];
	//s1.slice(0, -1)
	dmn=s1.slice(0, 45);
	if(s1.slice(45)=="")
	{
		pgnum_now=1;
	}
	else
	{pgnum_now=parseInt(s1.slice(45));}
	download(String(pgnum_now)+"tlive.csv",txt);
	if(pgnum_now<5)
	{
		setTimeout(function() {
		window.location.href = "https://twitchtracker.com/channels/live?page="+String(pgnum_now+1);
		}, 100)
	}
	
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
