//模拟用户手动输入
window.inputValue = function (dom, st) {
  var evt = new InputEvent('input', {
    inputType: 'insertText',
    data: st,
    dataTransfer: null,
    isComposing: false
  });
  dom.value = st;
  dom.dispatchEvent(evt);
};

chrome.runtime.sendMessage("getRes",function(messages){
	
	var plan="0";//存储消息dom种类
	
	setTimeout(function(){
		if(document.querySelector(".danmu__list")!=null){
			plan="1";
			console.log("YKT->使用第一种消息dom")//新版弹幕
		}else if(document.querySelector(".danmu-live")!=null){
			plan="2";
			console.log("YKT->使用第二种弹消息dom")//老版弹幕
		}else{
			// 若两种弹幕dom都没发现，则提醒使用者
			chrome.runtime.sendMessage("no",function(message){});
		}
	},1000)
	
	
	/* 判断是否开启自动跟答 */
	if(messages["reply"]=="true"){
		//监听弹幕，延迟0.8s
		setTimeout(function(){
			if(plan=="1"){
				$(".danmu__list").attr("id","listener2");
			}else if(plan=="2"){
				$(".danmu-live").attr("id","listener2");
			}else{
				return;
			}
			var state=false;
			var rep=true;
			var arr=[];
			document.getElementById("listener2").addEventListener("DOMNodeInserted",function(){
				if(!rep){
					return;
				}
				if(!state){
					arr=[];
					console.log("YKT->弹幕arr清空");
					state=true;
					setTimeout(function(){
						state=false;
					},15000)
				}
					
				if(plan=="1"){//第一种跟答=======================================================================
					var content=$(".danmu__list>li:last").text();
					if(content.indexOf("(我)")!=-1){
						return;
					}
					console.log("YKT->弹幕："+content);
					if(arr.indexOf(content)!=-1){
						state=false;
						rep=false;
						setTimeout(function(){
							rep=true;
							console.log("YKT->跟答冷却结束")
						},30000)//冷却时间
						
						window.inputValue(document.querySelector('.danmu__ipt'),content+"。")
						$(".danmu__send").trigger("click")
						console.log("YKT->已经跟答："+content+"。")
					}else{
						arr.push(content);
					}
				}else if(plan=="2"){//第二种跟答=================================================================
					var content=$(".danmu-live>div>div:last").text();
					console.log("YKT->弹幕："+content)			
					if(arr.indexOf(content)!=-1){
						state=false;
						rep=false;
						setTimeout(function(){
							rep=true;
							console.log("YKT->跟答冷却结束")
						},30000)//冷却时间
						
						document.querySelector(".icon-fadanmu").click()
						window.inputValue(document.querySelector('.send__input'),content+"。")
						$(".send__btn").trigger("click");
						console.log("YKT->已经跟答："+content+"。");
						document.querySelector(".send__close").click()
					}else{
						arr.push(content);
					}
				}
				
			})
			console.log("YKT->自动跟答已开启")
		},1200)
	}
	
	
	/* 判断是否开启自动回应 */
	if(messages["res"]=="true"){
		var name=messages["name"];
		var content=messages["content"];
		if(name==null||name===undefined){
			name="点名";
		}
		if(content==null||content===undefined){
			content="在";
		}
		// 监听点名,延迟1s
		setTimeout(function(){
			$(".timeline__wrap").attr("id","listener1");
			var dis=true;
			document.getElementById("listener1").addEventListener("DOMNodeInserted",function(){
				if(!dis){
					return;
				}
				var list=document.querySelectorAll(".timeline__item");
				var len=list.length;
				if($(list[len-1]).text().indexOf(name)!=-1){
					chrome.runtime.sendMessage("point",function(message){})
					if(plan=="1"){//第一种回应=================================================================
						dis=false;
						setTimeout(function(){
							dis=true;
						},100)//冷却时间
						
						window.inputValue(document.querySelector('.danmu__ipt'),content)
						$(".danmu__send").trigger("click")
					}else if(plan=="2"){//第二种回应===========================================================
						dis=false;
						setTimeout(function(){
							dis=true;
						},100)//冷却时间
						
						document.querySelector(".icon-fadanmu").click()
						window.inputValue(document.querySelector('.send__input'),content)
						$(".send__btn").trigger("click");
						console.log("YKT->已经回应："+content);
						document.querySelector(".send__close").click()
					}
				}else if($(list[len-1]).text().indexOf("下课啦！")!=-1){
					chrome.runtime.sendMessage("over",function(message){});
					window.open("https://www.yuketang.cn/v2/web/index");  
					setTimeout(function(){
							  window.location.href="about:blank";
							  window.close();
					},2000)
				}else{
					dis=false
					setTimeout(function(){
						dis=true;
					},100)//冷却时间
					console.log("YKT->没点到你 "+new Date().toLocaleString());
				}
			});
			console.log("YKT->自动回应已开启--->{姓名:"+name+",回复内容:"+content+"}");
		},1200)
	}
});