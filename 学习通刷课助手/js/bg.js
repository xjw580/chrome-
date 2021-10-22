chrome.runtime.onMessage.addListener(function(message,sender,callbakc){
	if(message=="tip"){
		chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
					type:"basic",
					title:"超星有题目未搜索到",
					message:"请手动处理",
					iconUrl:"images/chaoxing.png"
				},function callback(){
		});
	}
})