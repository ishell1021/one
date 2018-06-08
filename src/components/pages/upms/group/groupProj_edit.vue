<template>
    <div class="table">
		    <current></current>
        <div class="container">
            <el-form :inline="true" ref="editUserForm" :model="editUserForm" label-width="80px" class="primaryForm">
                <el-form-item label="项目名称">
                  <el-select v-model="projects" multiple value-key="projNo">
                      <el-option v-for="item in projectList" :key="item.projNo" :label="item.projName" :value="item.projNo"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button >取 消</el-button>
                <el-button type="primary" @click="saveEditUser">确 定</el-button>
            </span>
        </div>

    </div>
</template>

<script>
import current from '@/components/common/current_position.vue'
  export default {
    data() {
      return {
          pageNum: 1,
          pageSize: 10,
          totalRows: 0,
          projects: [],
          projectList: [],
          statusList: [
            {paraValue: '0',paraShowMsg: '无效'},
            {paraValue: '1',paraShowMsg: '有效'},
          ],
          editUserForm: {
              projName: '',
              description: '',
              
          },
      }
    },
    created() {
        // this.getData();
    },
    computed: {
        
    },
    components: {
      current
    },
    methods: {
        // 获取数据
        getData() {
          let self = this;
          let params = {};

          self.$axios.get('', {params})
          .then((res) => {
              // this.projectList = res.data.list;
          }).catch((err) => {
            console.log(err)
          })
        },
        // 保存编辑user
        saveEditUser() {
          let self = this;
          let params = self.projects;
          params.parentId = sessionStorage.getItem('group_query_parentId');
          self.editUserVisible = false;
          self.$axios.post('', params)
          .then((res) => {
            self.$message({ type: 'success', message: '操作成功'})
            self.$router.push('/group_proj');
          }).catch((err) => {
            console.log(err)
          })
            
        },
        
        
    }
  }

</script>

<style scoped>
</style>
