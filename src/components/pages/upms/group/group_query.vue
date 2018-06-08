<template>
    <div class="table">
        <current ></current>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchData.groupType" placeholder="请选择组类型" class="handle-select mr10">
                    <el-option v-for="item in groupTypeList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
                <el-input v-model="searchData.groupNameOrId" placeholder="请输入组名称/ID" class="handle-input mr10"></el-input>
                <el-button type="primary"  @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button type="primary"  @click="handleAdd">新增</el-button>
            </div>
            <el-table :data="tableData" border stripe @row-click="saveItem" ref="multipleTable" style="width: 100%">
                <el-table-column prop="groupName" label="组名称" align="center"></el-table-column>
                <el-table-column prop="groupType" label="组类型" align="center" :formatter="groupTypeFormatter"></el-table-column>
                <el-table-column prop="parentId" label="父组ID" align="center"></el-table-column>
                <el-table-column prop="description" label="组描述" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter"></el-table-column>
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
                totalRows: 30,
                tableData: [
                  {groupName: 'group1'}
                ],
                searchData: {
                  groupType: '',
                  groupNameOrId: '',
                },
                groupTypeList: [
                  {paraValue: 'ROOT',paraShowMsg: '0-根'},
                  {paraValue: 'TENANT',paraShowMsg: '1-租户'},
                ],
                statusList: [
                  {paraValue: '0',paraShowMsg: '无效'},
                  {paraValue: '1',paraShowMsg: '有效'},
                ],
                
                dropdownList: [
                  { title: '编辑', description: 'group_edit', },
                  { title: '删除', description: 'handleDelete', },
                  { title: '冻结', description: 'handleFreeze', },
                  { title: '解冻', description: 'handleUnfreeze', },
                  { title: '用户', description: 'group_user', },
                  { title: '项目管理', description: 'group_proj', }
                ]
            }
        },
        created() {
          this.getData();
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
              
              self.$axios.get('/ms/manager/list', {params})
              .then((res) => {
                  self.tableData = res.data.list;
                  // self.totalRows = Number(res.data.total);
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
              sessionStorage.setItem('group_add','新增');
              this.$router.push('/group_add');
            },
            //组类型格式化
            groupTypeFormatter(row, column) {
              let value = '';
              for(let i = 0; i < this.groupTypeList.length; i++){
                if(row.groupType == this.groupTypeList[i].paraValue){
                  value = this.groupTypeList[i].paraShowMsg;
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
                
              } else {//
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
