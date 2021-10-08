chrome.contextMenus.create({
		title:"翻译翻译什么叫惊喜",
		id:"translate",
		type:"normal",
		contexts:["all"],
})
chrome.contextMenus.create({
		title:"关闭选中翻译",
		parentId:"translate",
		type:"radio",
		contexts:["all"],
		onclick:function(param){
					chrome.windows.getCurrent(function( currentWindow ) {
						  //获取有指定属性的标签，为空获取全部标签
						  chrome.tabs.query( {
							active: true, windowId: currentWindow.id
						  }, function(activeTabs) {
							chrome.tabs.sendMessage(activeTabs[0].id,{state:"off"})
						  });
						});
				}
})
chrome.contextMenus.create({
		title:"开启选中翻译",
		parentId:"translate",
		type:"radio",
		contexts:["all"],
		onclick:function(param){
					chrome.windows.getCurrent(function( currentWindow ) {
						  //获取有指定属性的标签，为空获取全部标签
						  chrome.tabs.query( {
							active: true, windowId: currentWindow.id
						  }, function(activeTabs) {
							chrome.tabs.sendMessage(activeTabs[0].id,{state:"on"})
						  });
						});
				}
})
chrome.runtime.onMessage.addListener(function(message,sender,callback){
		var md=md5("20210412000774985"+message+"1435660288XobItmTUuhAXqv4mDS43");
		$.get("https://api.fanyi.baidu.com/api/trans/vip/translate?q="+message+"&from=en&to=zh&appid=20210412000774985&salt=1435660288&sign="+md,function(param){
				console.log(param)
				callback(param)
			},"json");
		return true;//开启异步，否则回调函数将接收到undefind,默认是同步
	})