<template>
  <div id="app">
    <countTable :tableData="tableData" @getTableData="tableWay"></countTable>

      <br><br>
      <graph :tableData="tableData"></graph>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
       <!-- <router-view/> -->
  </div>
</template>

<script>

import graph from './components/graph.vue'
import countTable from './components/countTable.vue'

export default {
  name: 'App',
  components: {
    graph,
    countTable
    // 'graph':graph,
    // 'table':table,
  },
  data() {
    return {
      tableData:[]
    }
  },
  methods: {
    tableWay(val){
      this.tableData = val
    }
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%,-50%);
}

</style>
