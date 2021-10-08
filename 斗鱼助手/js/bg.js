chrome.runtime.onMessage.addListener(function(message,sender,callback){
	if(message=="isHunt?"){
		chrome.storage.sync.get(["state","date"],function(result){
			console.log(result)
			callback(result)
		})
	}else if(message=="success"){
		chrome.notifications.create({
			type:"basic",
			title:"斗鱼助手",
			message:"今日斗鱼寻宝已完成",
			iconUrl:"images/success.png"
		},function callback(param){
			console.log("今日寻宝次数已用完")
		})
	}
	return true;
})