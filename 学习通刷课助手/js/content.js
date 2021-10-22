$(function(){
	function start(){
		var prefix=document.getElementById('iframe').contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document;
		if($(".prev_title").text().indexOf("阅读")!=-1){
			console.log("CX：阅读")
			setTimeout(function(){
				$(document.getElementById('iframe').contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("frame_content").contentWindow.document).find("div[class='fl'").trigger("click")
				document.querySelector(".next").click();
				setTimeout(function(){
					location.reload();
				},1000)
			},2000);
			return;
		}else if($(".prev_title").text().indexOf("直播")!=-1){
			console.log("CX：直播")
			setTimeout(function(){
				document.querySelector(".next").click();
				setTimeout(function(){
					location.reload();
				},1000)
			},2000)
			return;
		}else if($(".prev_title").text().indexOf("问卷调查")!=-1){
			console.log("CX：问卷调查")
			return;
		}
		var video=prefix.getElementById("video_html5_api")
		var state=$(document.getElementById('iframe').contentWindow.document.getElementsByClassName("ans-attach-ct")[0]).attr("class")
		if(state=="ans-attach-ct ans-job-finished"){
			console.log("CX：视频已完成，直接做题"+new Date().toLocaleString())
			setTimeout(function(){
				$("#dct2").trigger("click");
				setTimeout(function(){
					intoTimu();
				},1000)
			},1000)
		}else{
			if(video==null){
				location.reload();
			}
			try{
				video.muted=true;
				video.currentTime=0
			}catch(err){
				location.reload();
			}
			$(prefix).find(".vjs-big-play-button")[0].click();
			video.play();
			console.log("CX：开始播放视频"+new Date().toLocaleString())
			video.addEventListener('ended', function () { //结束
				console.log("CX：本节视频播放结束"+new Date().toLocaleString());
				$("#dct2").trigger("click");
				setTimeout(function(){
					intoTimu();
				},1000)
			}, false);
			video.addEventListener('pause',function(){
				video.play();
			})
		}
	}
	var ok=true;
	function request(total,head,body){
		$.get("https://q.zhizhuoshuma.cn/",{question:body},function(result){
			if(result.success){
				console.log("CX："+body+"{获取答案成功}"+new Date().toLocaleString())
				var answer=result.answer;
				console.log("CX：答案："+answer+new Date().toLocaleString())
				if(head.indexOf("单选题")!=-1){
					var lis=total.find("li");
					var counter=0;
					for(i=0,j=lis.length;i<j;i++){
						if($(lis[i]).text().indexOf(answer)!=-1){
							$(lis[i]).find("input").trigger("click");
							counter++;
							break;
						}
					}
					if(counter==0){
						ok=false;
					}
				}else if(head.indexOf("多选题")!=-1){
					var mark="#"
					var lis=total.find("li");
					var counter=0;
					var index=answer.indexOf(mark)
					if(index==-1){
						mark=""
						index=answer.indexOf(mark)
					}
					while(true){
						var answers=answer.substr(0,index);
						var answer=answer.substring(index+1);
						for(i=0,j=lis.length;i<j;i++){
							if($(lis[i]).text().indexOf(answers)!=-1){
								$(lis[i]).find("input").trigger("click");
								counter++;
								break;
							}
						}
						index=answer.indexOf(mark)
						if(index==-1){
							for(i=0,j=lis.length;i<j;i++){
								if($(lis[i]).text().indexOf(answer)!=-1){
									$(lis[i]).find("input").trigger("click");
									break;
								}
							}
							break;
						}
					}
					if(counter==0){
						ok=false;
					}
				}else if(head.indexOf("判断题")!=-1){
					var lis=total.find("li");
					if(answer=="正确"||answer=="√"){
						$(lis[0]).find("input").trigger("click");
					}else{
						$(lis[1]).find("input").trigger("click");
					}
				}
			}else{
				ok=false;
				console.log("CX："+body+"{获取答案失败}"+new Date().toLocaleString())
			}
		},"json")
	}
	function intoTimu(){
		setTimeout(function(){
			var prefix=document.getElementById('iframe').contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("frame_content").contentWindow.document;
			var state=$(document.getElementById('iframe').contentWindow.document.getElementsByClassName("ans-attach-ct")[0]).attr("class")
			if(state=="ans-attach-ct ans-job-finished"){
				console.log("CX：题目已做完，直接下一节"+new Date().toLocaleString())
				var next=document.querySelector("#right");
				if(next===undefined||next==null){
					next=document.querySelector(".orientationright");
				}
				next.click();
				setTimeout(function(){
					start();
				},1000)
			}else{
				var subject=prefix.getElementsByClassName("TiMu");
				for(i=0,j=subject.length;i<j;i++){
					var total=$(subject[i]).children(".Zy_TItle")
					var timu=total.text()
					var index=timu.indexOf("】")
					var head=timu.substr(0,index+1).trim()//题目类型
					var body=timu.substring(index+1).trim()//题目主体
					request(total.siblings(".clearfix"),head,body)
				}
				if(ok){
					$(prefix).find("span:contains('提交')").trigger("click")
					setTimeout(function(){
						$(prefix).find("a:contains('确定')")[0].click();
						setTimeout(function(){
							var next=document.querySelector("#right");
							if(next===undefined||next==null){
								next=document.querySelector(".orientationright");
							}
							next.click();
							setTimeout(function(){
								start();
							},1000)
						},1000)
					},1000)
				}else{
					//有题目未搜索出答案--系统通知用户
					chrome.runtime.sendMessage("tip",function(message){
					})
					ok=true;
				}
			}
		},2000)
	}
	setTimeout(function(){
		start();
	},2000)
})