<template>
	<div>
    <!-- margin：上右下左 -->
    <div style="left:0;position:absolute;margin:-2rem 0 4rem 0.6rem" >
       
        <!-- <button @click="test">测试按钮</button> -->
        <p style="color:rgb(155, 143, 143)">tips：数量若不为数字，会自动替换成0(折线图则会当成断点)</p>
        
    </div>
    <br><br>
    <div style="display: flex;float: left;">
      <el-button   style="height:2.5rem"
      type="success" size="small" @click="submit0">提交数据</el-button>
      
      <el-select v-model="value" placeholder="请选择" style="width:7rem;margin:0 0.4rem">
        <el-option
          v-for="item in graphTypeList"
          :key="item.label"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span style="line-height: 2.5rem;">属性：</span>
      <el-input type="text" placeholder="默认:销量" v-model="seString" style="width:5.6rem"></el-input>
    </div>
    
    <br><br><br><br>
		<div class="Echarts">
		<div id="main"></div>
		</div>
	</div>
  </template>
  <script>
  import * as echarts from 'echarts';
  
  export default {
	  
	name: 'Echarts',
  props:['tableData'],
	data() {
		return {
			aList:['bar','line','pie','scatter'],
      typeList:['苹果','雪梨','菠萝','猕猴桃','橘子'],
      countList:[77,208,122,33,134],
     
      pieList:[],
      seList:['销量'],
      seString:'销量',
      graphTypeList: [{
          value: 'bar',
          label: '柱状图'
        }, {
          value: 'line',
          label: '折线图'
        }, {
          value: 'pie',
          label: '饼图'
        }, {
          value: 'scatter',
          label: '散点图'
        }, ],
      value: 'bar'
      
		}
	},
  watch: {
    value:{//深度监听，可监听到对象、数组的变化
         handler(val, oldVal){
           
          //val => (val === 'pie') ? this.myEcharts2() : this.myEcharts()
          if(val === 'pie'){
             this.myEcharts2();
          }
          else{
            this.myEcharts();
          }
          
         },
         deep:true //true 深度监听
     },
   seString:{
    handler(val, oldVal){
      this.seList[0]=val
          },
          deep:true //true 深度监听
   }
  },
  mounted() {
		this.myEcharts();
	},
	methods:{
    test(){
      //console.log(this.tableData.toString().split(',').length);
      // console.log("typeList",this.typeList);
      // console.log("countList",this.countList);
     // console.log("pieList",this.pieList);
      //  this.seList[0] = 'ss';
      //  this.seString = 'ss';
     // console.log("sell",this.sell);
    },
    submit0(){
          for(let i=0;i<this.tableData.toString().split(',').length/2;i++){
               this.typeList[i] = this.tableData[0][i].name
               
             }
          for(let j=0;j<this.tableData.toString().split(',').length/2;j++){
            
               this.countList[j] = this.tableData[1][j].name
               this.countList[j] = Number(this.countList[j])              
             }
          if(this.value === 'pie'){
             this.myEcharts2();
          }
          else{
            this.myEcharts();
          }
    },

	  	myEcharts(){
			// 基于准备好的dom，初始化echarts实例
		   // var myChart = this.$echarts.init(document.getElementById('main'));
		  var myChart = echarts.init(document.getElementById('main'),'light');
      myChart.clear();
      
      
		  var option1 = {
			title:{
            text:'from echarts'
            },
            tooltip:{},  //指示框
            legend:{
                data:this.seList
            },
          //  color: ['#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			  xAxis: {
				  type: 'category',
				 // data: ['球鞋', '袜子', '上衣', '外套', '裤子', '拖鞋']
         data: this.typeList
			  },
			  yAxis: {
				  type: 'value',
				  
			  },
			  series: [{
				name: this.seString,
				data: this.countList,
				type: this.value,
				  
			  }],
        
		  };
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option1);
			},


      myEcharts2(){
        this.pieList = []
        for(let i = 0; i<this.countList.length; i++){
          var d = new Object();
          d.name = this.typeList[i];
          d.value = this.countList[i];
          this.pieList.push(d)
        }
        
			// 基于准备好的dom，初始化echarts实例
		   // var myChart = this.$echarts.init(document.getElementById('main'));
        var myChart = echarts.init(document.getElementById('main'),'light');
        myChart.clear();
        var option2 = {
          title:{
                text:'from echarts'
                },
                tooltip:{},  //指示框
                legend:{
                    data:['销量']
                },
              //  color: ['#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

            series: [{
            name:'销量',
            data: this.pieList,
            // [
            //   {value: 1048, name: '球鞋'},
            //   {value: 735, name: '袜子'},
            //   {value: 580, name: '上衣'},
            //   {value: 484, name: '外套'},
            //   {value: 300, name: '裤子'},
            //   {value: 300, name: '拖鞋'}
            // ],
              type: this.value,
              
            }],
            
          };
          // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option2);
        
        },

    },
  }
  </script>
  
  <style>
 
  /* 手机 */
  @media screen and (max-width:623px){
  #main{
    width: 100%;
    height:22rem;
  }
  }
  /* 电脑 */
  @media screen and (min-width:623px){
    #main{
    width: 37.5rem;height:25rem;
  }
  }
  
  </style>
  