<template>
  <div class="app-container">
    <div>
      <label>节点:</label>
      <el-select v-model="nodename" filterable placeholder="请选择" @change="onNodeChange">
        <el-option
          v-for="item in nodeoptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="content-table">
      <el-table
        :data="list"
        border
        style="width: 100%"
        :default-sort="{prop: 'addr', order: 'ascending'}"
      >
        <el-table-column prop="addr" label="addr" align="center" sortable />
        <el-table-column prop="service" label="service" header-align="center" sortable />
        <el-table-column prop="mem" label="mem" align="center" sortable />
        <el-table-column prop="cpu" label="cpu" align="center" sortable />
        <el-table-column prop="message" label="message" align="center" sortable />
        <el-table-column prop="mqlen" label="mqlen" align="center" sortable />
        <el-table-column prop="task" label="task" align="center" sortable />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getNodeNames, getDetail } from '@/api/cluster'

export default {
  data() {
    return {
      nodeoptions: null,
      list: [],
      nodename: null
    }
  },
  created() {
    if (this.$route.query.nodename !== null) {
      this.updateNodeName(this.$route.query.nodename)
    }
    this.fetchData()
  },
  methods: {
    updateNodeName(nodename) {
      this.nodename = nodename
    },
    fetchData() {
      getNodeNames().then((response) => {
        this.nodeoptions = response.data.nodenames
        if (this.nodeoptions.length === 0) {
          return
        }
        if (!this.nodeoptions.includes(this.nodename)) {
          this.updateNodeName(this.nodeoptions[0])
        }
        this.fetchNodeData()
      })
    },
    fetchNodeData() {
      getDetail(this.nodename).then((response) => {
        this.list = response.data
        console.log(this.list)
      })
    },
    onNodeChange(item) {
      console.log(item)
      this.updateNodeName(item)
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-table {
  padding-top: 20px;
}
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
