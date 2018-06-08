<template>
    <div class="table">
        <current ></current>
        <div class="container">
          <el-form :inline="true" ref="editUserForm" :model="editUserForm" label-width="80px" class="primaryForm">
              <el-form-item label="资源名称">
                    <el-input v-model="editUserForm.systemName" ></el-input>
                </el-form-item>
                <el-form-item label="资源类型">
                  <el-select v-model="editUserForm.systemType" :disabled="true">
                      <el-option v-for="item in systemTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="资源ID">
                    <el-input v-model="editUserForm.parentId" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="资源描述">
                    <el-input v-model="editUserForm.description" ></el-input>
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
                roles: {},
                roleList: [],
                statusList: [
                  {paraValue: '0',paraShowMsg: '无效'},
                  {paraValue: '1',paraShowMsg: '有效'},
                ],
                systemTypeList: [
                  {paraValue: '1',paraShowMsg: 'hrm'},
                  {paraValue: '2',paraShowMsg: 'pmg'},
                ],
                editUserForm: {
                    groupName: '',
                    description: '',
                    
                },
                
            }
        },
        created() {
          // this.getstatusList();
        },
        computed: {
            
        },
        components: {
          current
        },
        methods: {
          // 获取数据
          getstatusList() {
            let self = this;
            let params = {
              
            };
            self.$axios.get('', {params})
            .then((res) => {
                self.statusList = res.data.list;
            }).catch((err) => {
              console.log(err)
            })
          },
          // 保存编辑
          saveEditUser() {
            let self = this;
            let params = self.editUserForm;
            self.$axios.post('', params)
            .then((res) => {
              self.$message({ type: 'success', message: '操作成功'})
              self.$router.push('/user_query');
            }).catch((err) => {
              console.log(err)
            })
              
          },
        }
    }

</script>

<style scoped>
</style>
