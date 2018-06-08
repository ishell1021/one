<template>
    <div class="table">
        <current ></current>
        <div class="container">
           <el-form :inline="true" ref="editForm" :model="editForm" label-width="80px" class="primaryForm">
                <el-form-item label="组名称">
                    <el-input v-model="editForm.groupName"></el-input>
                </el-form-item>
                <el-form-item label="组类型">
                  <el-select v-model="editForm.groupType">
                      <el-option v-for="item in groupTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="父组ID">
                    <el-input v-model="editForm.parentId"></el-input>
                </el-form-item>
                <el-form-item label="组描述">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
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
                groupTypeList: [
                  {paraValue: 'ROOT',paraShowMsg: '0-根'},
                  {paraValue: 'TENANT',paraShowMsg: '1-租户'},
                ],
                statusList: [
                  {paraValue: '0',paraShowMsg: '无效'},
                  {paraValue: '1',paraShowMsg: '有效'},
                ],
                editForm: {
                    groupName: '',
                    description: '',
                    
                },
                
            }
        },
        created() {
        //   this.getGroupTypeList();// 获取组类型列表
        },
        computed: {
            
        },
        components: {
          current
        },
        methods: {
          
          // 获取组类型列表
          getGroupTypeList() {
            let self = this;
            let params = {

            };
            self.$axios.get('', {params})
            .then((res) => {
                self.groupTypeList = res.data.list;
            }).catch((err) => {
              console.log(err)
            })
          },
          
          // 保存编辑
          saveEdit() {
            let self = this;
            let params = self.editForm;
            self.$axios.post('', params)
            .then((res) => {
              self.$message({ type: 'success', message: '操作成功'})
              self.$router.push('/group_query')
            }).catch((err) => {
              console.log(err)
            })
              
          },
            
        }
    }

</script>

<style scoped>
</style>
