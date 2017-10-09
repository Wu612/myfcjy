var GLOBAL = GLOBAL || {};
Ext.onReady(function(){
	//设置导航外套为window高度-100
		$(".nav_content_wrap").css("height",$(window).height()-100+'px');
//		delegate--动态元素---	//性能好
	var moveTimer = null;
	var hideTimer = null;
		$(".main_nav").delegate("li","click",function(){
			
			var that=$(this);
			clearInterval(moveTimer);
			moveTimer=window.setTimeout(function(){
				//大外套显示
				$(".nav_content_wrap").slideDown(0);
				//li加样式
				$(".main_nav .now").removeClass("now");
				that.addClass("now");
				var nowIndex=that.index();
				console.log(nowIndex);
				//tab切换
				$(".one_nav_content_wrap").eq(nowIndex).css({"z-index":"1001"}).fadeIn(300).siblings().delay(300).slideUp(300).css("z-index","1000");
				
			},300)
				
			
		})
		//消失
	$(".nav_wrap").mouseleave(function(){
		doHide();
	})
	$(".one_nav_content").delegate("li","click",function(){
		doHide();
	})
	$(".nav_moveout").mouseenter(function(){
		doHide();
	})
		//消失方法
	function doHide(){
		$(".one_nav_content_wrap, .nav_content_wrap").fadeOut(300);
		clearTimeout(moveTimer);
		$(".main_nav .now").removeClass("now");
	}
	
	
	
})
