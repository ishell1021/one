<template>
    <div class="table">
        <current ></current>
        <div class="container">
          <el-form :inline="true" ref="editForm" :model="editForm" label-width="80px" class="primaryForm">
              <el-form-item label="所属系统" prop="sysNo">
                  <el-select v-model="editForm.sysNo" :disabled="true">
                      <el-option v-for="item in sysList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="菜单名称">
                  <el-select v-model="editForm.projectMenuNo" @change="handleRadioMenusChange">
                    <el-option v-for="item in menuList" :key="item.menuNo" :label="item.menuName" :value="item.menuNo"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
          <div class="context-menu">
            <el-col :span="2" class="leftside">
              <div >二级菜单</div>
            </el-col>
            <el-col :span="22" class="rightside">
                <div class="submenu" v-if="menuRadioFlag">
                    <el-checkbox-button v-model="checkSubAll" @change="handleSubAllChange" label="全部" class="menu-item"></el-checkbox-button>
                    <el-checkbox-group v-model="checkedSubmenus" @change="handleCheckedSubsChange">
                        <el-checkbox-button v-for="submenu in submenus" :key="submenu.bsnNo" :label="submenu" class="menu-item">{{submenu.menuName}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </el-col>
            <el-col :span="2" class="leftside">
              <div >关联资源</div>
            </el-col>
              <el-col :span="22" class="rightside">
                  <el-row :gutter="20">
                      <el-col :span="6" v-for="(item, index) in funcsList" :key="index">
                        <el-table :data="item.bsns" class="funcTable" height="300px" :ref="multipleTable(item, index)" 
                        @selection-change="handleSelectionChange($event, item, index)">
                            <el-table-column type="selection" align="center" width="50"></el-table-column>
                            <el-table-column prop="bsnName" :label="item.menuName" > </el-table-column>
                        </el-table>
                       
                      </el-col>
                  </el-row>
                 
              </el-col>
          </div>
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
                projectMenuList: [],
                projectTypeList: [
                  {paraValue: '1',paraShowMsg: '类型1'},
                  {paraValue: '2',paraShowMsg: '类型2'},
                ],
                resourceList: [
                  {paraValue: '1',paraShowMsg: '资源1'},
                  {paraValue: '2',paraShowMsg: '资源2'},
                ],
                editForm: {
                    projectName: '',
                    description: '',
                    resource: []
                },
                //一级菜单列表
                menuList: [
                  {
                      menuNo: 'dashboard',
                      menuName: '系统首页'
                  },
                  {
                      menuNo: 'group_query',
                      menuName: '租户管理',
                  },
                  {
                      menuNo: 'user_query',
                      menuName: '用户',
                  },
                  {
                      menuNo: 'system_query',
                      menuName: '服务'
                  },
                  {
                      menuNo: 'project_query',
                      menuName: '角色'
                  },
                ],
                // 控制第二级
                menuRadioFlag: false,
                //次级菜单列表
                submenus: [
                  {
                      bsnNo: '1',
                      menuNo: 'dashboard',
                      menuName: '用户',
                      bsns:[
                        {
                          bsnName: '用户列表查询',
                          bsnNo: '11',
                        },
                      ]
                  },
                  {
                      bsnNo: '2',
                      menuNo: 'dashboard',
                      menuName: '角色',
                      bsns:[
                        {
                          bsnName: '角色列表查询',
                          bsnNo: '21',
                        },
                      ]
                  },
                  {
                      bsnNo: '3',
                      menuNo: 'dashboard',
                      menuName: '项目',
                      bsns:[
                        {
                          bsnName: '项目列表查询',
                          bsnNo: '31',
                        },
                      ]
                  },
                  {
                      bsnNo: '4',
                      menuNo: 'dashboard',
                      menuName: '菜单',
                      bsns:[
                        {
                          bsnName: '菜单列表查询',
                          bsnNo: '41',
                        },
                      ]
                  },
                ],
                checkSubAll: false,
                checkedSubmenus: [],
                funcsList: [
                  {
                    menuName: '用户',
                    menuNo: '1',
                    bsns:[
                      {
                        bsnName: '用户列表查询',
                        bsnNo: '11',
                      },
                      {
                        bsnName: '用户列表查询',
                        bsnNo: '12',
                      },
                      {
                        bsnName: '用户列表查询',
                        bsnNo: '13',
                      },
                      {
                        bsnName: '用户列表查询',
                        bsnNo: '14',
                      },
                      {
                        bsnName: '用户列表查询',
                        bsnNo: '15',
                      },
                      {
                        bsnName: '用户列表查询',
                        bsnNo: '16',
                      },
                    ]
                  },
                  {
                    menuName: '角色',
                    menuNo: '2',
                    bsns:[
                      {
                        bsnName: '角色列表查询',
                        bsnNo: '21',
                      },
                      {
                        bsnName: '角色列表查询',
                        bsnNo: '22',
                      },
                     
                    ]
                  },
                ],//资源列表
                sysList:[],//系统列表
                currentMultipleSelection: [],//选择的资源列表
                oldMultipleSelection: [
                  [{
                    bsnName: '用户列表查询',
                    bsnNo: '11',
                  },
                  {
                    bsnName: '用户列表查询',
                    bsnNo: '12',
                  },]
                ],//反显的已选择资源列表
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
        mounted() {
            this.setTableChecked();
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
              self.$router.push('/project_menu');
            }).catch((err) => {
              console.log(err)
            })
          },
          multipleTable(item, index){
            return 'multipleTable'+index
          },
          //表格选择状态反显
          setTableChecked(){
            let multipleTable = 'multipleTable';
            if(this.oldMultipleSelection.length > 0){
              for(let i = 0; i < this.oldMultipleSelection.length; i++){
                multipleTable = 'multipleTable' + i;
                for( let j = 0; j < this.oldMultipleSelection[i].length; j++){
                  if(this.oldMultipleSelection[i][j].bsnNo == this.funcsList[i].bsns[j].bsnNo){
                    
                    this.$refs[multipleTable][0].toggleRowSelection(this.funcsList[i].bsns[j],true);
                  }
                }
              }
            }
          },
          // 一级菜单-单选
          handleRadioMenusChange(value) {
            this.menuRadioFlag = true;
            this.checkedSubmenusFlag = false;
            this.checkedSubmenus = [];
            this.funcsList = [];
            let params = {
              upMenuNo: value
            };
            this.$axios
              .get("", { params: params })
              .then(res => {
                // this.submenus = res.data.data;
                this.checkSubAll = false;
              })
              .catch(() => {
                console.log("error");
              });
          },
          // 次级菜单 全选
          handleSubAllChange(event) {
            this.checkSubAll = event;
            if (this.checkSubAll == true) {
              this.checkedSubmenus = this.submenus;
              this.isSubIndeterminate = true;
            } else {
              this.checkedSubmenus = [];
              this.isSubIndeterminate = false;
            }
            this.checkedSubmenus.length > 0 ? (this.checkedSubmenusFlag = true) : (this.checkedSubmenusFlag = false);
            this.funcsList = this.checkedSubmenus;
            console.log("这是全选的checkedSubmenus", this.funcsList);
          },
          // 次级菜单 单选
          handleCheckedSubsChange(val) {
            console.log('次级val',val);
            let checkedCount = val.length;
            this.isSubIndeterminate = checkedCount > 0 && checkedCount < this.submenus.length;
            checkedCount > 0 ? (this.checkedSubmenusFlag = true) : (this.checkedSubmenusFlag = false);
            checkedCount == this.submenus.length ? (this.checkSubAll = true) : (this.checkSubAll = false);
            this.funcsList = val;
            console.log("这是checkedSubmenus", this.funcsList);
          },
          
          handleSelectionChange(val, item, index) {
              this.currentMultipleSelection[index] = val;
              console.log('select',val)
          },  
            
        }
    }

</script>

<style scoped>
</style>
