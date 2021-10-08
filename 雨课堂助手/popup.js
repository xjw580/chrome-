$(function(){
	
	chrome.storage.sync.get(["interval","res","name","content","reply"],function(result){
		if(result["interval"]!==undefined){
			$("#inputAccountExample0").val(parseInt(result["interval"])/1000);
		}
		if(result["res"]=="true"){
			$("#check1").trigger("click")
		}
		if(result["name"]!==undefined){
			$("#inputAccountExample1").val(result["name"])
		}
		if(result["content"]!==undefined){
			$("#inputAccountExample2").val(result["content"])
		}
		if(result["reply"]=="true"){
			$("#switch2").attr("switch","true")
			$("#check2").trigger("click")
		}else{
			$("#switch2").attr("switch","false")
		}
		// 自动跟答
		$("#switch2").bind("click",function(){
			if($("#switch2").attr("switch")=="true"){
				chrome.storage.sync.set({"reply":"false"},function(){
					$("#switch2").attr("switch","false")
					console.log("自动跟答已关闭")
				})
			}else{
				chrome.storage.sync.set({"reply":"true"},function(){
					$("#switch2").attr("switch","true")
					console.log("自动跟答已开启")
				})
			}
		});
	});
	
	// 刷新间隔
	$("#update").bind("click",function(){
		var interval=$("#inputAccountExample0").val();
		if(interval.trim()){
			chrome.storage.sync.set({"interval":parseInt(interval)*1000},function(){
				chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
				type:"basic",
				title:"雨课堂助手",
				message:"修改刷新间隔为："+interval+"s",
				iconUrl:"yu.png"
				},function callback(){
					console.log("修改刷新间隔为："+interval+"s");
				});
			});
		}else{
			chrome.storage.sync.remove("interval",function(){
				chrome.notifications.create({//需要申请权限notifications，只能在后台中使用
				type:"basic",
				title:"雨课堂助手",
				message:"刷新间隔恢复默认",
				iconUrl:"yu.png"
				},function callback(){
					console.log("刷新间隔恢复默认");
				});
			});
		}
		
	});
	
	// 自动回应
	$("#switch1").bind("click",function(){
		var show=$("#updaterel").css("display");
		if(show=="none"){
			$("#updaterel").css("display","inline");
			$("#updatere2").css("display","inline");
			chrome.storage.sync.set({"res":"true"},function(){
				console.log("自动回应已打开");
			})
		}else{
			$("#updaterel").css("display","none");
			$("#updatere2").css("display","none");
			chrome.storage.sync.set({"res":"false"},function(){
				console.log("自动回应已关闭");
			})
		}
	});
	// 姓名
	$("#update1").bind("click",function(){
		var name=$("#inputAccountExample1").val()
		if(name.trim()){
			chrome.storage.sync.set({"name":name},function(){
				console.log("姓名改为："+name)
			})
		}else{
			chrome.storage.sync.remove("name",function(){
				console.log("姓名改为默认")
			})
		}
	});
	// 回应内容
	$("#update2").bind("click",function(){
		var content=$("#inputAccountExample2").val()
		if(content.trim()){
			chrome.storage.sync.set({"content":content},function(){
				console.log("回应内容改为："+content)
			})
		}else{
			chrome.storage.sync.remove("content",function(){
				console.log("回应内容改为默认")
			})
		}
	});
	
	/* setTimeout(function(){
		$("#check1").trigger("click")
	},10000) */
});