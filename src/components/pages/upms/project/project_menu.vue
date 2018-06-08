<template>
    <div class="table">
        <current></current>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchData.projectType" placeholder="请选择菜单类型" class="handle-select mr10">
                    <el-option v-for="item in projectTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
                <el-input v-model="searchData.projectNameOrId" placeholder="请输入菜单名称/ID" class="handle-input mr10"></el-input>
                <el-button type="primary"  @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button type="primary"  @click="handleAdd">新增</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @row-click="saveItem">
                <el-table-column prop="projectName" label="菜单名称" align="center"></el-table-column>
                <el-table-column prop="projectType" label="菜单类型" align="center" :formatter="projectTypeFormatter">
                </el-table-column>
                <el-table-column prop="parentId" label="菜单ID" align="center"></el-table-column>
                <el-table-column prop="description" label="菜单描述" align="center"></el-table-column>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form :inline="true" ref="editForm" :model="editForm" label-width="80px">
                <el-form-item label="菜单名称">
                    <el-input v-model="editForm.projectName" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="菜单类型">
                  <el-select v-model="editForm.projectType" class="handle-select mr10">
                      <el-option v-for="item in projectTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="菜单ID">
                    <el-input v-model="editForm.parentId" :disabled="true" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="菜单描述">
                    <el-input v-model="editForm.description" class="handle-input mr10"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

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
                  {paraValue: 'ROOT',paraShowMsg: '0-根'},
                  {paraValue: 'TENANT',paraShowMsg: '1-租户'},
                ],
                statusList: [
                  {paraValue: '0',paraShowMsg: '无效'},
                  {paraValue: '1',paraShowMsg: '有效'},
                ],
                editVisible: false,
                editForm: {
                    projectName: '',
                    description: '',
                    
                },
                dropdownList: [
                  { title: '编辑', description: 'projectMenu_edit', },
                  { title: '删除', description: 'handleDelete', },
                  { title: '暂停', description: 'handlePause', },
                  { title: '恢复', description: 'handleRenew', },
                  { title: '关联资源', description: 'projectMenu_resource', },
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
            sessionStorage.setItem('projectMenu_add','新增');
            this.$router.push('/projectMenu_add');
          },
          //菜单类型格式化
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
            }else if(command=='handlePause'){//暂停
              this.$confirm("是否确定暂停?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  console.log('Pause')
                  // this.PauseRow(row);

                }).catch(() => {
                  this.$message({ type: "info", message: "已取消操作" });
                });
              
            }else if(command=='handleRenew'){//恢复
              this.$confirm("是否确定恢复?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  console.log('Renew')
                  // this.RenewRow(row);

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
          //确定暂停
          PauseRow(params){
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
          RenewRow(params){
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
