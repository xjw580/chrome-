chrome.runtime.sendMessage("tabId",function(message){})

function task(){
	chrome.runtime.sendMessage("getInterval",function(message){
		if(message==undefined||message==null){
			message=240000;//默认4分钟刷新一次
		}
		console.log("YKT->"+message/1000+"s后刷新页面,now:"+new Date().toLocaleString())
		setTimeout(function(){
			location.reload();
		},message)
	})
};

setTimeout(function() {
	var dom=document.querySelector(".tipbar")
	if(dom==null){
		console.log("YKT->完全没课")
		task();
	}else{
		console.log("YKT->有课呢")
		dom.click();
		var count=0;
		setTimeout(function(){
			for(i=0,len=$(".status").length;i<len;i++){
				if($($(".status")[i]).text()=="听"){
					console.log("YKT->["+i+"] 是要听的课！")
					$($(".lessonTitle")[i]).trigger("click")
					count++;
					chrome.runtime.sendMessage("start",function(message){
						console.log("YKT->已经进入课堂！")
						setTimeout(function(){
							window.location.href="about:blank";
							window.close();
						},2000)//2s后关闭此窗口
					})
				}else{
					console.log("YKT->["+i+"] 不是要听的课")
				}
			}
			if(count==0){
				task();
			}
		},100);
	}
}, 1500);

chrome.runtime.onMessage.addListener(function(message,sender,callback){
	if("urlChanged"==message){
		// location.reload();
		// console.log("已经进入课堂！")
	}
});