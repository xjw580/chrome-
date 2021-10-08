// 寻宝
function hunt(){
				document.querySelector(".FishpondEntrance-icon").click()
				setTimeout(function(){
					    $(".FPT-pri-item-wrap").trigger("click")
					    setTimeout(function(){
							var text=$(".Fishpond3-tr-text i").text()
							var yulLiang=$(".Fishpond3-tr-yl").text()
							console.log("剩余次数："+text)
							document.querySelector(".FTP-turntableStartBtn").click()
							if(parseInt(yulLiang.substr(3,yulLiang.length-1))<60){
								return;
							}
							if(text.indexOf("1")!=-1){
								  var date=new Date().toLocaleDateString()
								  chrome.storage.sync.set({"state":"0","date":date},function(){
									  chrome.runtime.sendMessage("success")
								  })
								  document.querySelector(".Fishpond3-dialog-close").click()
							}else if(text.indexOf("0")==-1){
								document.querySelector(".Fishpond3-dialog-close").click()
								hunt();
							}
					  },1000)
				},1000)
			}
(function () {
	
			setTimeout(function(){
				chrome.runtime.sendMessage("isHunt?",function(result){
					var nowDate=new Date().toLocaleDateString()
					var date=result["date"]
					var state=result["state"]
					if(nowDate==date){
						if(state!="0")	{
							console.log("开始寻宝")
							hunt();
						}else{
							console.log("今日无寻宝机会了，主人")
						}
					}else{
						console.log("开始寻宝")
						hunt();
					}
				})
			},120000)
			
		      var _timer_ = null;
		      var spred = ['.', '.', '.', '.', '.'];
		      var start = 1;
		      // 加载样式
		      var fixInp = document.createElement('textarea');
		      var fixSend = document.createElement('input');
		      var fixStop = document.createElement('input');
		      var tips1 = document.createElement('p');
		      var tips2 = document.createElement('span');
		      var times = document.createElement('input');
		      var fixWrap = document.createElement('div');
		      var outer = document.createElement('div');
		      var hide = document.createElement('span');
		      var show = document.createElement('span');
		      var checkdiv = document.createElement('div');
		      var checkTip = document.createElement('span');
		      var check = document.createElement('input');
		      fixSend.setAttribute('type', 'submit');
		      fixSend.setAttribute('value', '发送');
		      fixStop.setAttribute('type', 'submit');
		      fixStop.setAttribute('value', '停止');
		      times.setAttribute('type', 'number');
		      check.setAttribute('type', 'checkbox');
		      tips1.innerHTML = '内容:';
		      tips2.innerHTML = '间隔(秒):';
		      hide.innerHTML = '隐藏';
		      show.innerHTML = '显示';
		      checkTip.innerHTML = '防重复发言:';
		      outer.style.cssText = 'position: fixed; right: 10px; bottom: 10px; display: block; width:200px;padding: 10px; background:#4CAF50;z-index: 9999999;';
		      times.style.cssText = 'display: inline-block; width: 40px;';
		      fixInp.style.cssText = 'display: block;width: 100%;height:62px;box-sizing: border-box;';
		      tips1.style.cssText = 'margin:0;padding:0;';
		      fixWrap.style.cssText = 'display: inline-block;width:100%;';
		      show.style.cssText = 'position: fixed; right: 10px; bottom: 10px;display:none;padding:2px; background:#4CAF50;font-size: 12px;color: #fff; cursor: pointer;';
		      hide.style.cssText = 'display:inline-block;padding:2px; background:#b22;font-size: 12px;color: #fff; cursor: pointer;';
		      times.value = 10;
		      fixWrap.appendChild(hide);
		      fixWrap.appendChild(tips1);
		      fixWrap.appendChild(fixInp);
		      fixWrap.appendChild(tips2);
		      fixWrap.appendChild(times);
		      fixWrap.appendChild(fixSend);
		      fixWrap.appendChild(fixStop);
		      checkdiv.appendChild(checkTip);
		      checkdiv.appendChild(check);
		      fixWrap.appendChild(checkdiv);
		      outer.appendChild(fixWrap);
		      document.body.appendChild(outer);
		      document.body.appendChild(show);
			  
		      // 发送弹幕
		      function send(message, bool) {
		        if (bool) {
		          var s = spred.slice(0, start++);
		          message += s.join('');
		          if (start > spred.length) {
		            start = 1
		          }
		        }
		        document.querySelector('.ChatSend-txt').value = message;
		        document.querySelector('.ChatSend-button').click();
		      }
		      // 事件
		      fixSend.addEventListener('click', function () {
		        var time = parseInt(times.value);
		        var message = fixInp.value;
		        var bool = check.checked;
		        fixSend.style.display = 'none';
		        send(message);
		        _timer_ = setInterval(function () {
		          send(message, bool);
		        }, time * 1000);
		      });
		      fixStop.addEventListener('click', function () {
		        fixSend.style.display = 'inline-block';
		        clearInterval(_timer_);
		        _timer_ = null;
		      });
		      hide.addEventListener('click', function () {
		        outer.style.display = 'none';
		        show.style.display = 'inline-block';
		      });
		      show.addEventListener('click', function () {
		        outer.style.display = 'block';
		        show.style.display = 'none';
		      });
		    })();
			