<template>
    <div class="table">
        <current ></current>
        <div class="container">
          <el-form ref="editPasswordForm" :model="editPasswordForm" :rules="editPasswordFormRules" label-width="80px" class="primaryForm">
                <el-form-item label="新密码" prop="newPass">
                  <el-input type="password" v-model="editPasswordForm.newPass" auto-complete="off" placeholder="请输入新密码"></el-input>
                  <span class="tips">密码支持6-20位字符，至少包含数字、字母、符号中的2种</span>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="editPasswordForm.checkPass" auto-complete="off" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditPassword">确 定</el-button>
            </span>
            
        </div>


    </div>
</template>

<script>
import current from '@/components/common/current_position.vue'
    export default {
        data() {
            var checkoldPass = (rule, value, callback) => {
              if(value === '') {
                callback(new Error('密码不能为空'));
              } else {
                callback();
              }
            };
            var validateNewPass = (rule, value, callback) => {
              if(value === '') {
                callback(new Error('请输入新密码'));
              }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,20}$/.test(value)){
                callback(new Error('请输入正确格式的密码'));
              } else {
                if(this.editPasswordForm.checkPass !== '') {
                  this.$refs.editPasswordForm.validateField('checkPass');
                }
                callback();
              }
            };
            var validateCheckPass = (rule, value, callback) => {
              if(value === '') {
                callback(new Error('请再次输入密码'));
              } else if(value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
            return {
                
                editPasswordForm: {},
                editPasswordFormRules: {
                  oldPass: [{ validator: checkoldPass, trigger: 'blur' }],
                  newPass: [{ validator: validateNewPass, trigger: 'blur' }],
                  checkPass: [{ validator: validateCheckPass, trigger: 'blur' }]
                }
                
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
                
            }).catch((err) => {
              console.log(err)
            })
          },
          // 保存编辑
          saveEditPassword() {
            let self = this;
            let params = self.editPasswordForm;
            self.$axios.post('', params)
            .then((res) => {
              self.$message({ type: 'success', message: '操作成功'})
              self.$router.push('/group_user');
            }).catch((err) => {
              console.log(err)
            })
              
          },
        }
    }

</script>

<style scoped>
</style>
