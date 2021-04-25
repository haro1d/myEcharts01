<template>
    <div @click='clickOther($event)'>
    <div >
        <div style="left:0.6rem;position:absolute">
            品名数量： <input type="number" v-model='cols'  style="width: 60px;">
            
            
        </div>
        <br>
        <div style="clear: both;margin: 2.25rem;"></div>
       <div style="display: flex;">
        
            <div style="float: left;font-family: STXinwei;width:4.4rem">
                品名：
                <div style="height: 1.375rem;width: 100%;"></div>
                数量：
            </div>
        
            <div style="float: left;">
                <table border="1" cellspacing="0"  ref="table">
                    <tr v-for="(arr, index) in tableData" :key="index">
                        <td v-for="(item, index1) in arr" :key="index1">
                            <span v-show='!item.isEdit' @click='clickTd(item,$event)'>{{item.name}}</span>
                            <input type="text" v-model="item.name" v-if='item.isEdit' />
                        </td>
                    </tr>
                </table>
            </div>
           
        </div>
        
         
        <!-- <button @click="output">输出</button> -->
       
    </div>
    </div>
</template>


<script>
    export default {
       // name:'table',
        data() {
            return {
                rows: 2,
                cols: 5,
                tableData: []
            }
        },
        watch: {
            // 监听列输入框变化
            cols(val,oldVal) {
                if(val !='' & val>12){
                    this.$message({
                        message: '品名数量不能超过12！',
                        type: 'warning'
                    });
                    this.cols = 12
                    this.submit()
                }
                else if(val !='' & val<2){
                    this.$message({
                        message: '品名数量不能小于2！',
                        type: 'warning'
                    });
                    this.cols = 2
                    this.submit()

                }
                else if(val ==''){
                   
                }
                else{
                    this.submit()
                }
                
            }
        },
        mounted() {
            this.submit()
        },
        methods: {
            //点击其他地方使表格置为非编辑状态
            clickOther(e) {
                
                var curDom = (e && e.target) || (event && event.srcElement);
                var table = this.$refs.table
                if (table && !table.contains(curDom)) {
                    this.removeEdit()
                }
            },
            // 使表格置为非编辑状态
            removeEdit() {
                this.tableData.forEach(arr => {
                    arr.forEach(item => {
                        item.isEdit = false
                    })
                })
            },
            //生成表格
            submit() {
                let rows = 2
                let cols = this.cols * 1
                let arr = []
                let tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
                for (let i = 0; i < this.rows; i++) {
                    arr[i] = []
                    for (let j = 0; j < this.cols; j++) {
                        arr[i][j] = {
                            isEdit: false,
                            name: tableDataCopy[i] ? (tableDataCopy[i][j] ? tableDataCopy[i][j].name : '') : ''
                        }
                    }
                }
                this.tableData = arr;
                this.$emit('getTableData',this.tableData)
            },
            //点击表格内的单元格使单元格变成编辑状态
            clickTd(item, event) {
                this.removeEdit()
                item.isEdit = true
                this.$nextTick(() => {
                    event.target.nextElementSibling.focus()
                })
            },
            // 导出数据
            output() {
                console.log(this.tableData)
            },
            // 导入数据
  
        },

    }

</script>
    
<style scoped>
    td {   
        width: 80px;
        height: 30px;
        border-color: rgb(0, 192, 64);
        background-color: rgb(255, 249, 164);
    }
    td>span {
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    td>input {
        display: inline;
    }
    input[type='text']{
        outline: none;
        border:0px;
        background-color: rgb(255, 249, 164);
        width:74px;
    }
</style>