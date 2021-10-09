chrome.runtime.onInstalled.addListener(function(){
	/* chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions:[
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl:{urlContains:"https://www.yuketang.cn/"}
					})
				],
				actions:[new chrome.declarativeContent.ShowPageAction()]
			}
		])
	}); */
	chrome.tabs.create({ 
	   url: chrome.extension.getURL("instructions.html"), 
	   selected: true 
	});
});
chrome.runtime.onMessage.addListener(function(message,sender,callback){
	if("getInterval"==message){
		chrome.storage.sync.get("interval",function(result){
			callback(result["interval"])
		});
	}else if("getRes"==message){
		chrome.storage.sync.get(["res","name","content","reply"],function(reuslt){
			callback(reuslt)
		});
	}else if("tabId"==message){
		tabid=sender.tab.id;
	}else if("start"==message){
		chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
					type:"basic",
					title:"雨课堂上课了",
					message:"已进入课堂",
					iconUrl:"yu.png"
				},function callback(){
		});
		callback("");
	}else if("over"==message){
		chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
					type:"basic",
					title:"雨课堂下课了",
					message:"已离开课堂重新监听",
					iconUrl:"yu.png"
				},function callback(){
		});
	}else if("no"==message){
		chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
					type:"basic",
					title:"老师未开启弹幕",
					message:"老师开启弹幕后将自动刷新页面",
					iconUrl:"yu.png"
				},function callback(){
		});
	}else if("point"==message){
		chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
					type:"basic",
					title:"点名点到你了",
					message:"(已自动回复)",
					iconUrl:"yu.png"
				},function callback(){
		});
	}
	return true;
});

/* setTimeout(function(){
	chrome.storage.sync.get("tabId",function(result){
		chrome.tabs.sendMessage(result["tabId"],"hello",function(message){});
	})
},10000); */

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
	// var url="https://www.yuketang.cn/v2/web/studentLog/7938566";
	var url="https://www.yuketang.cn/lesson";
	if(tab.url.indexOf(url)!=-1){
			chrome.tabs.sendMessage(tabid,"urlChanged")
	}
});