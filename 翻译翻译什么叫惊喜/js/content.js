/* var head="<meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\">"
$("head").append(head) //将http请求升级成https*/
var state="off";
chrome.runtime.onMessage.addListener(function(message,sender,callback){
	if(message.state=="on"){
		$(document).bind("mouseup",function(){
			var selecter=window.getSelection().toString();
			if(selecter!=null&&selecter.trim()!=""){
				if(selecter.search(/^[\u4e00-\u9fa5]{0,}$/)==-1){//匹配不是纯中文
						chrome.runtime.sendMessage(selecter,function(param){
							var range = window.getSelection().getRangeAt(0);
							var rect = range.getBoundingClientRect();
							var x = (rect.x+rect.width)+"", y = (rect.y+document.documentElement.scrollTop+rect.height)+"";
							var translate=document.createElement("div");
							var src=document.createElement("font")
							var dst=document.createElement("font")
							var hr=document.createElement("hr")
							translate.setAttribute("class","alert alert-success")
							translate.style.cssText="width: 250px;position:absolute;color: black;z-index: 100000"
							translate.style.top=y+"px";
							translate.style.left=x+"px";
							src.textContent=param.trans_result[0].src;
							dst.textContent=param.trans_result[0].dst;
							translate.appendChild(src);
							translate.appendChild(hr);
							translate.appendChild(dst)
							document.body.appendChild(translate);
							setTimeout(function(){
								$(document).click(function(){
												$(document).unbind("click")
												$(".alert.alert-success").unbind("click")
												$(".alert.alert-success").remove()
											});	
								$("alert.alert-success").click(function(event){
									event.stopPropagation();
								})
							},1000)
						})
				}
			}
		})
	}else{
		$(document).unbind("mouseup")
	}
})


