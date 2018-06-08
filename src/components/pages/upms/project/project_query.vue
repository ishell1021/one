<template>
    <div class="table">
        <current></current>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchData.projectType" placeholder="请选择项目类型" class="handle-select mr10">
                    <el-option v-for="item in projectTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
                <el-input v-model="searchData.projectNameOrId" placeholder="请输入项目名称/ID" class="handle-input mr10"></el-input>
                <el-button type="primary"  @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button type="primary"  @click="handleAdd">新增</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @row-click="saveItem">
                <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
                <el-table-column prop="projectType" label="项目类型" align="center" :formatter="projectTypeFormatter">
                </el-table-column>
                <el-table-column prop="parentId" label="项目ID" align="center"></el-table-column>
                <el-table-column prop="description" label="项目描述" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter">
                </el-table-column>
                <el-table-column prop="createdBy" label="创建人" align="center"></el-table-column>
                <el-table-column prop="createdDate" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updatedBy" label="更新人" align="center"></el-table-column>
                <el-table-column prop="updatedDate" label="更新时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="110">
                    <template slot-scope="scope">
                        <el-dropdown @command="handleCommand( $event, scope.$index, scope.row)" trigger="click">
                          <el-button type="primary" size="small">下拉菜单</el-button>
                          <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item v-for="item in dropdownList" :command="item.description" :key="item.description" >{{item.title}}</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
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
                  {projectName: 'project1'}
                ],
                searchData: {
                  projectType: '',
                  projectNameOrId: '',
                },
                projectTypeList: [
                  {paraValue: '1',paraShowMsg: '类型1'},
                  {paraValue: '2',paraShowMsg: '类型2'},
                ],
                statusList: [
                  {paraValue: '0',paraShowMsg: '无效'},
                  {paraValue: '1',paraShowMsg: '有效'},
                ],
                dropdownList: [
                  { title: '编辑', description: 'project_edit', },
                  { title: '删除', description: 'handleDelete', },
                  { title: '角色', description: 'project_role', },
                  { title: '菜单', description: 'project_menu', },
                  { title: '资源管理', description: 'project_resource', },
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
              sessionStorage.setItem('project_add','新增');
              this.$router.push('/project_add');
            },
            //项目类型格式化
            projectTypeFormatter(row, column) {
              let value = '';
              for(let i = 0; i < this.projectTypeList.length; i++){
                if(row.projectType == this.projectTypeList[i].paraValue){
                  value = this.projectTypeList[i].paraShowMsg;
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
              
            },
            // 下拉菜单
            handleCommand(command, index, row) {
              if(command=='handleDelete'){//删除
                this.$confirm("是否确定删除?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    console.log('delete')
                    // this.deleteRow(row);

                  }).catch(() => {
                    this.$message({ type: "info", message: "已取消操作" });
                  });
              }else if(command=='handleFreeze'){//冻结
                this.$confirm("是否确定冻结?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    console.log('freeze')
                    // this.freezeRow(row);

                  }).catch(() => {
                    this.$message({ type: "info", message: "已取消操作" });
                  });
                
              }else if(command=='handleUnfreeze'){//解冻
                this.$confirm("是否确定解冻?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    console.log('unfreeze')
                    // this.unfreezeRow(row);

                  }).catch(() => {
                    this.$message({ type: "info", message: "已取消操作" });
                  });
                
              } else{//
                for(let i = 0; i < this.dropdownList.length; i++){
                  if(command == this.dropdownList[i].description){
                    sessionStorage.setItem(command, this.dropdownList[i].title);
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
            //确定冻结
            freezeRow(params){
              let self = this;
              self.$axios.put('', params)
              .then((res) => {
                self.$message({ type: 'success', message: '操作成功'})
                self.getData();
              }).catch((err) => {
                console.log(err)
              })
            },
            //确定解冻
            unfreezeRow(params){
              let self = this;
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
