<template>
  <div class="app-container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="dialogFormVisible = true"
      >添加用户</el-button
    >
    <div class="content-table">
      <el-table :data="list" border style="width: 100%">
        <el-table-column align="center" label="#" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="账户"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="名字" width="180" align="center">
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <div class="avatar-container">
              <div class="avatar-wrapper">
                <img
                  :src="scope.row.avatar + '?imageView2/1/w/80/h/80'"
                  class="user-avatar"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账户名（登录用）" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字（昵称）" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, delUser, addUser } from "@/api/user";
import { getExactTime } from "@/utils/index";

export default {
  data() {
    return {
      list: null,
      dialogFormVisible: false,
      form: {
        name: "",
        username: "",
        password: "",
      },
      formLabelWidth: "160px",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getList().then((response) => {
        this.list = response.data.users.map((element) => {
          if (element.createtime) {
            element.createtime = getExactTime(element.createtime);
          }
          return element;
        });
      });
    },
    handleDelete(row) {
      this.$confirm(
        "确定删除用户 " + row.username + " 吗？, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delUser({ username: row.username }).then((response) => {
            if (response.code == "OK") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData();
            } else {
              this.$message({
                type: "warning",
                message: response.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAddUser() {
      addUser({
        username: this.form.username,
        password: this.form.password,
        name: this.form.name,
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      }).then((response) => {
        if (response.code == "OK") {
          this.$message({
            type: "success",
            message: "添加用户成功!",
          });
          this.fetchData();
        } else {
          this.$message({
            type: "warning",
            message: response.msg,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-table {
  padding-top: 20px;
}

.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
