var GLOBAL = GLOBAL || {};
$(function(){
	

	//设置导航外套为window高度-100
		$(".nav_content_wrap").css("height",$(window).height()-100+'px');
//		delegate--动态元素---	//性能好
	var moveTimer = null;
	var hideTimer = null;
	
		$(".main_nav").delegate("li","mouseenter",function(){
			
			var that=$(this);
			clearTimeout(moveTimer);
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
	$(".nav_content").delegate("li","click",function(){
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
	
	
	//动态像主页中加载页面--iframe---
	$(".nav_content").delegate("li","click",function(){
			if($(this).attr("iLink")){
				loadPage($(this).attr("iLink"))
				
			}
	
	})


	
	function loadPage(link){
		
		$("#backHomeContent").html('<iframe width="100%"  height="'+($(window).height()-100)+'" src="'+link+'"></iframe>')
	}
	
})
