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
	
	//点击logo跳转主页
	$(".logo_wrap").click(function(){
		//回到父窗口  调用方法
		window.parent.loadPage("backHomeIndex.html","","");
	})
	
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
	var iframeResizeTimer = null;
	//页面大小改变 改变iframe大小
	$(window).resize(function(){
			clearTimeout(iframeResizeTimer);
			iframeResizeTimer=setTimeout(function(){
					$("#mainframe").height($(window).height()-100+"px");
		
					$(".nav_content_wrap").css("height",$(window).height()-100+'px');
			},200)

	})
	
})
function loadPage(link,pathName,id){
	
		window.location.hash=id;
		$("#backHomeContent").html('<iframe width="100%" id="mainframe" frameborder='0' height="'+($(window).height()-100)+'" src="'+link+'"></iframe>');
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
			loadPage("backHomeIndex.html","","");
		}
		
	}else{
		loadPage("backHomeIndex.html","","");
		
	}
		
		
		
}


//修改密码
function  modifyPassword(){
	GLOBAL.modifPwd=new Ext.custom.basicWindow({
		title:"修改密码",
		width:480,
		height:300,
		items:[
			new Ext.custom.middletextfield({
				margin:'40 0 0 60',
		    	inputType : 'password',//类型
		    	itemId : "userPwd",
		    	fieldLabel : '当前密码',
		    	beforeLabelTextTpl: required,//必填
		    	labelAlign : 'right'
		    	
			}),new Ext.custom.middletextfield({
		    	margin:'10 0 0 60',
		    	inputType : 'password',
		    	itemId : "newUserPwd",
		    	fieldLabel : '新密码',
		    	beforeLabelTextTpl: required,
			     	labelAlign : 'right'
		   	  }),new Ext.custom.middletextfield({
		    	margin:'10 0 0 60',
		    	inputType : 'password',
		    	itemId : "newUserPwdAgain",
		    	beforeLabelTextTpl: required,
		    	fieldLabel : '确认密码',
		    	labelAlign : 'right'
		    }),{
		    	xtype:"panel",
		    	layout:'hbox',
		    	margin:'10 0 0 140',
		    	arrowAlign:'right',
		    	items:[
		    			{
		    				xtype:"button",
		    				margin:'10 0 0 10',
				    		width:80,
					    	height:30,
					    	style :'background:#6EC131;border:0',
	    					text:'确定',
	    					handler:function(){
	    						//点击时候触发--修改密码操作
	    						//准备好给后台的数据s
	    						var userpassword=GLOBAL.modifPwd.down("#userPwd").getValue();
	    						var newPassword=GLOBAL.modifPwd.down("#newUserPwd").getValue();
	    						var newpassAgagin=GLOBAL.modifPwd.down("#newUserPwdAgain").getValue();
	    							if(!userpassword||!newPassword||!newpassAgagin){
	    								Ext.Msg.alert("温馨提示","密码不能为空");
	    								
	    							}else if(newPassword!=newpassAgagin){
	    								Ext.Msg.alert("温馨提示","新密码不一致");
	    							
	    							}else{
	    								//后台发送数据
	    								$.ajax({
	    									url:"/Handler/AdminHandler.ashx?action=updatepass",
	    									type:"post",
	    									async:false,
	    									data:{
	    										userPwd:userpassword,
	    										newPwd:newPassword
	    									},
	    									dataType:"json"
	    								}).done(function(data){
	    									
	    									errTip(data,function(){
	    										Ext.Msg.alert("温馨提示","修改成功");
	    										GLOBAL.modifPwd.hide();	
	    									})
	    									
	    								}).fail(function(){
	    									alert('请求失败');
	    								}).always(function(){
	    									
	    								})
	    								
	    							}
	    							
	    							
	    								
	    						
	    					}
	    					
		    			},
			    			{
			    			xtype:'button',
					    	margin:'10 0 0 30',
				    		width:80,
					    	height:30,
				    		text:'取消',
				    		handler : function(){
				    			//点击隐藏弹出窗口
				    			GLOBAL.modifPwd.hide();
				    		}
		    		}
		    	]
		    	
		    }
		]
		
		
	}).show();
	
	
	
}
