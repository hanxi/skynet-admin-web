<template>
  <div class="app-container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="addNodeDialogVisible = true"
    >添加节点</el-button>
    <div class="content-table">
      <el-table :data="list" border style="width: 100%">
        <el-table-column align="center" label="#" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="节点名字" align="center" />
        <el-table-column prop="addr" label="节点地址" align="center" />
        <el-table-column prop="createtime" label="创建时间" align="center" />
        <el-table-column prop="updatetime" label="更新时间" align="center" />
        <el-table-column prop="st" label="状态" align="center" />
        <el-table-column prop="sttime" label="状态更新时间" align="center" />
        <el-table-column prop="operate" label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
            <el-button
              size="mini"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增节点" :visible.sync="addNodeDialogVisible">
      <el-form :model="addForm">
        <el-form-item label="节点名字" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="节点地址" :label-width="formLabelWidth">
          <el-input
            v-model="addForm.addr"
            autocomplete="on"
            placeholder="格式为 ip:port"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNodeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCluster()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改节点" :visible.sync="updateNodeDialogVisible">
      <el-form :model="updateForm">
        <el-form-item label="节点名字" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="节点地址" :label-width="formLabelWidth">
          <el-input
            v-model="updateForm.addr"
            autocomplete="on"
            placeholder="格式为 ip:port"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateNodeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateCluster()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, delNode, addNode, updateNode, reload } from '@/api/cluster'
import { getExactTime } from '@/utils/index'

export default {
  data() {
    return {
      list: null,
      addNodeDialogVisible: false,
      updateNodeDialogVisible: false,
      addForm: {
        name: '',
        addr: ''
      },
      updateForm: {
        name: '',
        addr: ''
      },
      formLabelWidth: '160px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList().then((response) => {
        if (!response.data.nodes.map) {
          this.list = null
          return
        }
        this.list = response.data.nodes.map((element) => {
          if (element.createtime) {
            element.createtime = getExactTime(element.createtime)
          }
          if (element.updatetime) {
            element.updatetime = getExactTime(element.updatetime)
          }
          if (element.sttime) {
            element.sttime = getExactTime(element.sttime)
          }
          return element
        })
      })
    },
    handleDelete(row) {
      this.$confirm(
        '确定删除节点 ' + row.name + ' 吗？, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          delNode({ name: row.name }).then((response) => {
            if (response.code === 'OK') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              reload()
              this.fetchData()
            } else {
              this.$message({
                type: 'warning',
                message: response.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleAddCluster() {
      addNode({
        name: this.addForm.name,
        addr: this.addForm.addr
      }).then((response) => {
        if (response.code === 'OK') {
          this.$message({
            type: 'success',
            message: '添加节点成功!'
          })
          reload()
          this.fetchData()
        } else {
          this.$message({
            type: 'warning',
            message: response.msg
          })
        }
      })
    },
    handleUpdate(row) {
      this.updateForm.name = row.name
      this.updateForm.addr = row.addr
      this.updateNodeDialogVisible = true
    },
    handleUpdateCluster() {
      updateNode({
        name: this.updateForm.name,
        addr: this.updateForm.addr
      }).then((response) => {
        if (response.code === 'OK') {
          this.$message({
            type: 'success',
            message: '修改节点成功!'
          })
          this.updateNodeDialogVisible = false
          reload()
          this.fetchData()
        } else {
          this.$message({
            type: 'warning',
            message: response.msg
          })
        }
      })
    },
    handleDetail(row) {
      this.$router.push({
        path: '/cluster/status',
        query: {
          nodename: row.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-table {
  padding-top: 20px;
}
</style>
