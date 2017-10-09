$(function(){
	console.log(1);
 if($(window).width() <= 1366){
    $('#chart01').css('width','540px');
    $('#chart02').css('width','550px');
    $('#chart03').css('width','1140px');
  };
	
	
	$(".quicklinks_one").click(function(){
		
		if($(this).attr("iLink")){
			var pathName=$(this).find("h1").text();
			window.top.loadPage($(this).attr("iLink"),pathName,$(this).attr("myId"));
		}
		
	})
	//图表的使用
		//1，--- 路径配置
	require.config({
		paths: {
			echarts: '../lib/dist'
		}
	});
	//使用
	require(
		[
			'echarts',
			'echarts/chart/pie', // 使用柱状图就加载bar模块，按需加载
			'echarts/chart/funnel',
			'echarts/chart/bar',
			'echarts/chart/gauge',
			'echarts/theme/macarons'
		],function(ec){
			//// 基于准备好的dom，初始化echarts图表
							
			var myChart01 = ec.init(document.getElementById('chart01'),'macarons');
			var myChart02 = ec.init(document.getElementById('chart02'),'macarons');
			var myChart03 = ec.init(document.getElementById('chart03'),'macarons');
			//配置图标项
			var option01={
				title : {
					text: '学习人数比例',
					subtext: '你好',
					x:'center',
//					y:'center'
				},
				tooltip : {
					formatter: "{a} <br/>{b} : {c}%"
				},
				//配置项
				series : [
					{
						name:'学习人数比',
						type:'gauge',
						detail : {formatter:'{value}%'},
						data:[{value: 60, name: '比例'}]
					}
				]
			};
			
			//饼状图
			
			var option02={
				
				title:{
					text:"考试通过率",
					subtext:"吗开",
					x:"center"
				},
				
				tooltip:{
				  
				  trigger:'item',
				  formatter:"{a} <br/>{b} : {c} ({d}%)"
				},
				
				//是否拖拽
				calculable:true,
				series:[
				      {
				       name:"访问来源",
				       type:"pie",
				       radius:"55%",//半径大小
				       center:["50%","50%"],//位置
				       data:[
				           
				            {value:335,name:"已通过"},
				            {value:310,name:"未通过"},
				            {value:500,name:"未完成"}
				          ]
				      }
				]
				
			};
			
			//柱状图
			
			var option03={
				 
				 title:{
				 	x:"center",
				 	text:"时间、课程、新增课程输",
				 }
				
			}
			
			myChart01.setOption(option01);
			myChart02.setOption(option02);
			
		}
		
	
	
	
	)
	
	
	
	
	
	
	
})
