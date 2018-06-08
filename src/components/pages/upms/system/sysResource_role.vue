<template>
    <div class="table">
        <current></current>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchData.systemType" placeholder="请选择角色类型" class="handle-select mr10">
                    <el-option v-for="item in systemTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
                <el-input v-model="searchData.systemNameOrId" placeholder="请输入角色名称/ID" class="handle-input mr10"></el-input>
                <el-button type="primary"  @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @row-click="saveItem">
                <el-table-column prop="systemName" label="角色名称" align="center">
                </el-table-column>
                <el-table-column prop="systemType" label="角色类型" align="center" :formatter="systemTypeFormatter">
                </el-table-column>
                <el-table-column prop="parentId" label="角色ID" align="center"></el-table-column>
                <el-table-column prop="description" label="角色描述" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter">
                </el-table-column>
                <el-table-column prop="createdBy" label="创建人" align="center"></el-table-column>
                <el-table-column prop="createdDate" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updatedBy" label="更新人" align="center"></el-table-column>
                <el-table-column prop="updatedDate" label="更新时间" align="center"></el-table-column>
                
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalRows">
                </el-pagination>
            </div>
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
                tableData: [
                  {systemName: 'role1'}
                ],
                searchData: {
                  systemType: '',
                  systemNameOrId: '',
                },
                systemTypeList: [
                  {paraValue: '1',paraShowMsg: 'hrm'},
                  {paraValue: '2',paraShowMsg: 'pmg'},
                ],
                statusList: [
                  {paraValue: '0',paraShowMsg: '无效'},
                  {paraValue: '1',paraShowMsg: '有效'},
                ],
                editVisible: false,
                editForm: {
                    systemName: '',
                    description: '',
                    
                },
                dropdownList: [
                  { title: '编辑', description: 'handleEdit', },
                  { title: '暂停', description: 'handlePause', },
                  { title: '恢复', description: 'handleRenew', },
                  { title: '关联角色', description: 'resource_role', },
                ]
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
            // 分页导航
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getData();
            },
            // 获取数据
            getData() {
              let self = this;
              let params = self.searchData;
              params.pageNum = self.pageNum;
              params.pageSize = self.pageSize;

              self.$axios.get('', {params})
              .then((res) => {
                  self.tableData = res.data.data.list;
                  self.totalRows = Number(res.data.data.total);
              }).catch((err) => {
                console.log(err)
              })
            },
            reset(){
              this.searchData = {};
            },
            //查询
            search() {
                // 获取数据
                this.getData();
            },
            handleAdd(){
              this.$router.push('');
            },
            //角色类型格式化
            systemTypeFormatter(row, column) {
              let value = '';
              for(let i = 0; i < this.systemTypeList.length; i++){
                if(row.systemType == this.systemTypeList[i].paraValue){
                  value = this.systemTypeList[i].paraShowMsg;
                }
              }
              return value;
            },
            //状态格式化
            statusFormatter(row, column) {
              let value = '';
              for(let i = 0; i < this.statusList.length; i++){
                if(row.status == this.statusList[i].paraValue){
                  value = this.statusList[i].paraShowMsg;
                }
              }
              return value;
            },
            saveItem(row,event,column){
              sessionStorage.setItem('system_query_parentId',row.parentId);
              sessionStorage.setItem('system_query_row',JSON.stringify(row));
              sessionStorage.setItem('system_query_yijiMsg',this.yijiMsg);
            },
            // 下拉菜单
            handleCommand(command, index, row) {
              if(command=='handlePause'){//暂停
                this.$confirm("是否确定暂停?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    console.log('pause')
                    // this.pauseRow(row);

                  }).catch(() => {
                    this.$message({ type: "info", message: "已取消操作" });
                  });
                
              }else if(command=='handleRenew'){//恢复
                this.$confirm("是否确定恢复?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    console.log('renew')
                    // this.renewRow(row);

                  }).catch(() => {
                    this.$message({ type: "info", message: "已取消操作" });
                  });
                
              } else if(command=='handleEdit'){//编辑
                this.editVisible = true;
                this.editForm = JSON.parse(sessionStorage.getItem('system_query_row'));
              } else{//
                for(let i = 0; i < this.dropdownList.length; i++){
                  if(command == this.dropdownList[i].description){
                    if(command=='system_resource'){
                      sessionStorage.setItem('system_query_system_resource', this.dropdownList[i].title);
                    }
                    
                  }
                }
                this.$router.push(command);
              } 
            },
            //确定删除
            deleteRow(params){
              let self = this;
              self.$axios.delete('', params)
              .then((res) => {
                self.$message({ type: 'success', message: '操作成功'})
                self.getData();
              }).catch((err) => {
                console.log(err)
              })
            },
            //确定暂停
            pauseRow(params){
              let self = this;
              self.$axios.put('', params)
              .then((res) => {
                self.$message({ type: 'success', message: '操作成功'})
                self.getData();
              }).catch((err) => {
                console.log(err)
              })
            },
            //确定恢复
            renewRow(params){
              let self = this;
              self.$axios.put('', params)
              .then((res) => {
                self.$message({ type: 'success', message: '操作成功'})
                self.getData();
              }).catch((err) => {
                console.log(err)
              })
            },
            // 保存编辑
            saveEdit() {
              let self = this;
              let params = self.editForm;
              self.editVisible = false;
              self.$axios.put('', params)
              .then((res) => {
                self.$message({ type: 'success', message: '操作成功'})
                self.getData();
              }).catch((err) => {
                console.log(err)
              })
                
            },
            
        }
    }

</script>

<style scoped>
</style>
