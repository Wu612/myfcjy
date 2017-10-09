
  var GLOBAL=GLOBAL||{};
  $(function(){
  	  //设置导航外套为window高度-100;
  	 $("nav_content_wrap").css("height",$(window).height-100+"px");
  	 
  	//		delegate--动态元素---	//性能好
  	  var moveTimer;
  	  var hideTimer;
  	 $(".main_nav").delegate("li","mouseover",function(){
  	 	
  	 	var that=$(this);
  	 	clearTimeout(moveTimer);
  	      moveTimer=setTimeout(function(){
  	 		 //大外套显示
  	 	  $(".nav_content_wrap").slideDown(0);
  	 	  //li加样式
  	 	  $(".main_nav .now").removeClass("now");
  	 	  that.addClass("now");
  	 	  
  	 	  //tab切换
  	 	  var nowIndex=that.index();
  	 	  $(".one_nav_content_wrap").eq(nowIndex).css("z-index",1001).
  	 	  fadeIn(300).siblings().delay(300).slideUp(300).css('z-index',1000);
  	 	},300)
  	 })
  	 
  	     $("#nav_wrap").mouseleave(function(){
  	     	   doHide();
  	     })
  	    $(".nav_content").delegate("li","click",function(){
  	    	doHide();
  	    })
  	   
  	   $(".nav_moveout").mouseenter(function(){
  	   	 doHide();
  	   })
  	  function doHide(){
  	  	
  	  	 $(".one_nav_content_wrap,.nav_content_wrap").fadeOut(300);
  	  	 clearTimeout(moveTimer);
  	  	 $(".main_nav .now").removeClass("now");
  	  }
  	 
  	 
  	 //动态像主页中加载页面--iframe---
  	 
  	  $(".nav_content").delegate("li","click",function(){
  	  	    
  	  	    if($(this).attr("iLink")){
  	  	    
  	  	    	
  	  	    	var hash=$(this).attr("id");
    	  	    	//获取当前点击li 父元素的下标；
  	  	    	var index=$(this).parent().index($(".one_nav_content"))
  	  	    	 var path=$(".main_nav li").eq(index).text()+'/'+$(this).text();
  	  	    	  loadPage($(this).attr("iLink"),path,hash);
  	  	    	  
  	  	    	  
  	  	    }
  	  })
  	  
  	  loadHashPage();
  	  
  	  var iframeResizeTimer;
  	  
  	   $(window).resize(function(){
  	   	   clearTimeout(iframeResizeTimer);
  	   	 iframeResizeTimer=setTimeout(function(){
  	   	 	 $("#mainframe").height($(window).height()-100+'px');
  	   	 	 
  	   	 	 $(".nav_content_wrap").css("height",$(window).height()-100+"px")
  	   	 	
  	   	 },2000)
  	   	
  	   })
  	   
  	   getUserInfo();
  	    
  })
    
  function loadPage(link,pathName,id){
  	    	  window.location.hash=id;
  	    	 $("#backHomeContent").html('<iframe width="100%" frameborder="0" height="'+($(window).height()-100)+'" id="mainframe" src="'+link+'"></iframe>')
    	    	 //边框加载完成
  	    	 $("#mainframe").load(function(){
  	    	 	  var nowLink="'backHomeIndex.html'";
  	    	 	  $(this).contents().find(".xn_nowpath").html('<a onclick="parent.loadPage('+nowLink+')">首页</a> / '+pathName+'')
  	    	 	  $(this).contents().find("body").css("overflow-x","hidden");
  	    	 	  
  	    	 })
  	    }
  
   //根据哈希值加载页面----------
   
    function loadHashPage(){
    	 var liId=window.location.hash;
    	 
    	 if(liId){
    	 	 
    	 	 if(liId.length>0){
    	 	 	 $(liId).trigger("click")
    	 	 }else{
    	 	 	loadPage("backHomeIndex.html","","")
    	 	 }
    	 }else{
    	 	 loadPage("backHomeIndex.html","","")
    	 }
    	
    }
   //安全中心点击事件；
    $(".header_nav li:eq(3)").click(function(){
    	    safety();
    })
    
    
    
    $(".login_wrap").click(function(){
    	//回到父窗口  调用方法
    	window.parent.loadPage("backHomeIndex.html","","")
    })
    
    
    
    
    $("#userName").hover(function(){
    	 $(this).css("color","orange")
    },function(){
    	 $(this).css("color","#9d9d9d")
    })
      
      //弹出窗口修改密码；
    function safety(){
    	
    	GLOBAL.popup=new Ext.custom.basicWindow({
    		   title:'修改密码',
    		   width:480,
    		   height:380,
    		   
    		   items:[
    		    new Ext.custom.middletextfield({
    		    	    itemId:'current',
    		    	    fieldLabel:'当前密码',
    		    	    labelAlign:'right',
    		    	    beforeLabelTextTpl:required,
    		    	    margin:'50 0 0 50'
    		    }),
    		     
    		      new Ext.custom.middletextfield({
    		      	  itemId:'fresh',
    		      	  fieldLabel:'新密码',
    		      	  labelAlign:'right',
    		      	  beforeLabelTextTpl:required,
    		      	  margin:'10 0 0 50'
    		      }),
    		      
    		      new Ext.custom.middletextfield({
    		      	 itemId:'confirm',
    		      	 fieldLabel:'确认密码',
    		      	 labelAlign:'right',
    		      	 beforeLabelTextTpl:required,
    		      	 margin:'10 0 0 50'
    		      }),{
    		      	  xtype:'panel',
    		      	  layout:'hbox',
    		      	  items:[
    		      	    {
    		      	    	 xtype:'button',
    		      	    	 width:80,
    		      	    	 height:30,
    		      	    	 text:'确认',
    		      	    	 margin:'20 0 0 140',
    		      	    	 handler:function(){
    		      	    	
    		      	    	 	change();
    		      	    	 },
    		      	    	 style:'background:#6EC131;border:0'
    		      	    },{
    		      	    	  xtype:'button',
    		      	    	  width:80,
    		      	    	  height:30,
    		      	    	  margin:'20 0 0 30',
    		      	    	  text:'消失',
    		      	    	  handler:function(){
    		      	    	  	GLOBAL.popup.hide();
    		      	    	  }
    		      	    }
    		      	  ]
    		      }
    		      
    		     
    		   ]
    	})
    	   GLOBAL.popup.show();//必须用show()才出现；
    }
   
function change(){
      	
      	var present=GLOBAL.popup.down("#current").getValue();
      	var news_p=GLOBAL.popup.down("#fresh").getValue();
      	var confirm=GLOBAL.popup.down("#confirm").getValue();
      	
      	 if(!present||!news_p||!confirm){
      	 	  Ext.Msg.alert("温馨提示","密码不能为空");
      	 }else if(news_p!=confirm){
      	 	 Ext.Msg.alert("温馨提示","新密码不一致");
      	 }else{
      	
       $.ajax({
       	type:"post",
       	url:"/Handler/AdminHandler.ashx?action=updatepass",
       	async:false,
       	data:{userPwd:present,newPwd:news_p},
       	dataType:"json"
       }).done(function(data){
       	  errTip(data,function(){
       	  	
       	  	Ext.Msg.alert("温馨提示","修改成功")
       	  	GLOBAL.popup.hide();
       	  })
       	  
       	  
       }).fail(function(){
       	    alert("修改错误")
       }).always(function(){
       	    
       })
       
       }
      }
    
    
    //退出系统；；；
   
    function exitSystem(){
    	  
    	  $.ajax({
    	  	 
    	  	type:"get",
    	  	url:"/Handler/AdminHandler.ashx?action=quit",
    	  	async:false,
    	  	dataType:"json"
    	  }).done(function(data){
    	  	 errTip(data,function(){
    	  	 	Ext.Msg.alert("提示",data.success,function(){
    	  	 		window.location.href="backLogin.html";
    	  	 	})
    	  	 })
    	  }).fail(function(){
    	  	
    	  }).always(function(){})
    	}
     
      
  //读取用户基本数据
  
    function getUserInfo(){
    	
    	$.ajax({
    		
    		 type:"post",
    		 url:BPR.domain +"/Handler/AdminHandler.ashx?action=returnuserinfo",
    		 async:false,
    		 dataType:"json"
    	}).done(function(resule){
    		errTip(resule,function(){
    			$("#userName").html(resule.turename)
    		})
    	}).fail(function(){
    	  alert("请求失败");
    	})
    }
