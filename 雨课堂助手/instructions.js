$(function(){
	new $.zui.Messager('请仔细阅读以下内容', {
	    type: 'important' // 定义颜色主题
	}).show();
	// 或者在初始化时指定
	$('[data-toggle="tooltip"]').tooltip({
	    placement: 'top'
	});
})