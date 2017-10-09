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
			var x=800;
			var option02 = {
				title : {
					text: '考试通过率',
					subtext: '  ',
					x:'center'
				},
				tooltip : {
//					trigger: 'item',//百分比
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				//是否拖拽
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : '55%',//半径大小
						center: ['50%', '50%'],//位置
						data:[
							{value:335, name:'已通过'},
							{value:310, name:'未通过'},
							{value:x,name:'未完成'}
						]
					}
				]
			};
			//柱状图
			var y=[88,66,99,33];
			var option03 = {
				title: {
					x: 'center',
					text: '时间、课程、新增课程输',
					subtext: ' '/*,
					link: 'http://echarts.baidu.com/doc/example.html'*/
				},
				//是否拖拽
				calculable: true,
				//图标位置
				grid: {
					borderWidth: 0,
					y:80,//padding-top
					y2: 60//padding-bottom
				},
				//x轴
				xAxis: [
					{
						type: 'category',
						show: false,
						data: ['学习时间11', '总课程数', '新增课程数','学习过的']
					}
				],
				yAxis: [
					{
						type: 'value',
						show: false
					}
				],
				series: [
					{
						name: '时间,课程',
						type: 'bar',
						//列表样式
						itemStyle: {
							normal: {
								//设置柱状图颜色
								color: function(params) {
									// build a color map as your need.
									//对应颜色
									var colorList = [
									  '#C1232B','#B5C334','red','green'
									];
									
									return colorList[params.dataIndex]
								},
								label: {
									show: true,
									//标题位置
									position: 'top',
									formatter: '{b}\n{c}'
								}
							}
						},
						data:y
						
					}
				]
			};
			
			
			
			myChart01.setOption(option01);
			myChart02.setOption(option02);
			myChart03.setOption(option03);
			
			
		}
		
	
	
	
	)
	
	
	
	
	
	
	
})
