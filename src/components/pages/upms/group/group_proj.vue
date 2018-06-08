<template>
    <div class="table">
		    <current></current>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="searchData.status" placeholder="请选择项目状态" class="handle-select mr10">
                    <el-option v-for="item in statusList" :key="item.paraValue" :label="item.paraShowMsg" :value="item.paraValue"></el-option>
                </el-select>
                <el-input v-model="searchData.projNameOrId" placeholder="请输入项目名称/ID" class="handle-input mr10"></el-input>
                <el-button type="primary"  @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button type="primary" @click="handleEdit">分配项目</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="projName" label="项目名称" align="center"></el-table-column>
                <el-table-column prop="projNo" label="项目ID" align="center"></el-table-column>
                <el-table-column prop="description" label="项目描述" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter"></el-table-column>
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
          projects: [],
          tableData: [
            {projName: 'proj1'}
          ],
          searchData: {
            rowName: '',
            projNameOrId: '',
          },
          statusList: [
            {paraValue: '0',paraShowMsg: '无效'},
            {paraValue: '1',paraShowMsg: '有效'},
          ],
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
        handleEdit(){
          sessionStorage.setItem('groupProj_edit','分配项目');
          this.$router.push('/groupProj_edit');
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
              // self.projects = res.data.data.//项目ID列表
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
        
    }
  }

</script>

<style scoped>
</style>
