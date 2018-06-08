<template>
    <div class="table">
        <current ></current>
        <div class="container">
          <el-form :inline="true" ref="addFormData" :model="addFormData" label-width="80px" class="primaryForm">
              <el-form-item label="角色名称">
                  <el-input v-model="addFormData.projectName"></el-input>
              </el-form-item>
              <el-form-item label="角色状态">
                <el-select v-model="addFormData.status">
                    <el-option v-for="item in statusList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色描述">
                  <el-input v-model="addFormData.description"></el-input>
              </el-form-item>
              <el-form-item label="所属系统" prop="sysNo">
                  <el-select v-model="addFormData.sysNo" :disabled="true">
                      <el-option v-for="item in sysList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <div class="context-menu">
            <el-col :span="2" class="leftside">
              <div >关联菜单</div>
            </el-col>
            <el-col :span="22" class="rightside">
                <div class="menu">
                    <el-radio-group v-model="menuRadio" @change="handleRadioMenusChange">
                        <el-radio-button v-for="menu in menuList" :key="menu.menuNo" :label="menu.menuNo" class="menu-item">{{menu.menuName}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="submenu" v-if="menuRadioFlag">
                    <el-checkbox-button v-model="checkSubAll" @change="handleSubAllChange" label="全部" class="menu-item"></el-checkbox-button>
                    <el-checkbox-group v-model="checkedSubmenus" @change="handleCheckedSubsChange">
                        <el-checkbox-button v-for="submenu in submenus" :key="submenu.bsnNo" :label="submenu" class="menu-item">{{submenu.menuName}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </el-col>
            <el-col :span="2" class="leftside">
              <div >功能权限</div>
            </el-col>
              <el-col :span="22" class="rightside">
                  <el-row :gutter="20">
                      <el-col :span="6" v-for="(item, index) in funcsList" :key="index">
                        <el-table :data="item.bsns" class="funcTable" height="300px" :ref="multipleTable(item, index)" 
                        @selection-change="handleSelectionChange($event,item, index)">
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
                // 控制第一级
                menuRadio:'',
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
                ],//一级菜单列表
                showFirstChild: "",
                // 控制第二级
                showSecondChild:false,
                menuRadioFlag: false,
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
                ],//次级菜单列表
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
                ],//功能列表
                statusList: [
                  {paraValue: '1',paraShowMsg: '类型1'},
                  {paraValue: '2',paraShowMsg: '类型2'},
                ],
                //新增表单数据
                addFormData: {
                    projectName: '',
                    description: '',
                    funsSelect: [],
                    
                },
                sysList:[],//系统列表
                currentMultipleSelection: [],//选择的功能列表
            }
        },
        created() {
          // this.getstatusList();
          
        },
        mounted() {
            
        },
        computed: {
        },
        components: {
          current
        },
        methods: {
          multipleTable(item, index){
            return 'multipleTable'+index
          },
          // 获取数据
          getstatusList() {
            let self = this;
            let params = self.searchData;
            params.pageNum = self.pageNum;
            params.pageSize = self.pageSize;

            self.$axios.get('', {params})
            .then((res) => {
                self.statusList = res.data.data.list;
            }).catch((err) => {
              console.log(err)
            })
          },
          // 保存编辑
          saveEdit() {
            let self = this;
            let params = self.addFormData;
            self.editVisible = false;
            self.$axios.post('', params)
            .then((res) => {
              self.$message({ type: 'success', message: '操作成功'})
              self.$router.push('/project_role');
            }).catch((err) => {
              console.log(err)
            })
          },
          // 一级菜单-单选
          handleRadioMenusChange(value) {
            this.menuRadioFlag = true;
            this.checkedSubmenusFlag = false;
            this.checkedSubmenus = [];
            this.funcsList = [];
            this.menuRadio = value;
            let params = {
              upMenuNo: this.menuRadio
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
