chrome.runtime.onInstalled.addListener(function(){
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
					message:"老师开启弹幕后可能需要手动刷新页面",
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
	}else if("question"==message){
		chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
					type:"basic",
					title:"老师发题了！",
					message:"(别摸鱼了)",
					iconUrl:"yu.png"
				},function callback(){
		});
	}
	return true;
});

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
	var url="https://www.yuketang.cn/lesson";
	if(tab.url.indexOf(url)!=-1){
			chrome.tabs.sendMessage(tabid,"urlChanged")
	}
});