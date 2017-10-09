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
		//假如li上有iLink
			if($(this).attr("iLink")){
				//获取li上的id
				var hash=$(this).attr("id");
				//获取当前点击li 父元素的下标(所有的ul)
								//当前ul在俩个ul中的index
				 var index = $(this).parent().index($(".one_nav_content"));
				 			//俩个ul中 当前ul的下标
				 //var index=$(".one_nav_content").index($(this).parent());
				 	//li中的文本和当前点击文本
				var  path=$(".main_nav li").eq(index).text() +' / '+ $(this).text();
				loadPage($(this).attr("iLink"),path,hash)
				
			}
	
	})


	
	loadHashPage();
	
})
function loadPage(link,pathName,id){
	
		window.location.hash=id;
		$("#backHomeContent").html('<iframe width="100%" id="mainframe"  height="'+($(window).height()-100)+'" src="'+link+'"></iframe>');
		$("#mainframe").load(function(){
			var nowLink="backHomeIndex.html";
			//loadPage('backHomeIndex')
			$(this).contents().find(".xn_nowpath").html('<a  onclick="parent.loadPage('+ "'backHomeIndex.html'" +')">首页</a> / '+ pathName +'');
			
			//找到iframe body 隐藏x轴滚动条
			$(this).contents().find("body").css("overflow-x","hidden");
		})
	
	}

//根据哈希值加载页面----------
function loadHashPage( ){
	
	if(window.location.hash){
		var liId=window.location.hash;
		if($(liId).length>0){
			$(liId).trigger("click");
		}else{
			loadPage("backHomeIndex.html");
		}
		
	}else{
		loadPage("backHomeIndex.html");
		
	}
		
		
		
}
