<template>
    <div class="table">
        <current></current>
        <div class="container">
          <el-form :inline="true" ref="editForm" :model="editForm" label-width="80px" class="primaryForm">
              <el-form-item label="项目名称">
                  <el-input v-model="editForm.projectName"></el-input>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select v-model="editForm.projectType">
                    <el-option v-for="item in projectTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目描述">
                  <el-input v-model="editForm.description"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button >取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
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
                projectTypeList: [
                  {paraValue: '1',paraShowMsg: '类型1'},
                  {paraValue: '2',paraShowMsg: '类型2'},
                ],
                editForm: {
                    projectName: '',
                    description: '',
                    
                },
            }
        },
        created() {
            // this.getprojectTypeList();
        },
        computed: {
            
        },
        components: {
          current
        },
        methods: {
          // 获取数据
          getprojectTypeList() {
            let self = this;
            let params = self.searchData;
            params.pageNum = self.pageNum;
            params.pageSize = self.pageSize;

            self.$axios.get('', {params})
            .then((res) => {
                self.projectTypeList = res.data.data.list;
            }).catch((err) => {
              console.log(err)
            })
          },
          // 保存编辑
          saveEdit() {
            let self = this;
            let params = self.editForm;
            self.editVisible = false;
            self.$axios.post('', params)
            .then((res) => {
              self.$message({ type: 'success', message: '操作成功'})
              self.$router.push('/project_query');
            }).catch((err) => {
              console.log(err)
            })
          },
            
        }
    }

</script>

<style scoped>
</style>
