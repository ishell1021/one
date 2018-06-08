<template>
    <div id="wrap">
        <div class="login-wrap">
            <div class="header"></div>
            <div class="main">
                <div class="img-wrapper"><img :class="{'logoImg':!logoName}" :src="logoName ? logoSrcS : logoSrcL" alt=""><span v-if="logoName">{{logoName}}</span></div>
                <div class="form-wrapper">
                    <img :src="flySrc" alt="" width="86" height="77" class="fly">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-content"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-text="登录中">
                        <span class="title">用户登录</span>
                        <el-form-item prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入邮箱/员工编号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="code-wrapper" prop="imageCode">
                            <el-input  placeholder="请输入验证码" class="last-input" v-model="ruleForm.imageCode" @keyup.enter.native="submitForm('ruleForm')" @focus="errorMsg=''"></el-input><span class="check-code" @click="changeCode"><img
                                :src="pic"></span>
                        </el-form-item>
                        <div class="error" v-show="errorMsg">{{errorMsg}}</div>
                        <el-button type="primary" class="tijiao" @click="submitForm('ruleForm')">登录</el-button>
                        <span class="fegetPasswordText" href="#" @click="fegetPassword">忘记密码</span>
                    </el-form>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </div>
            <div class="bottom">
                <span class="text">
                    橙色魔方版权所有 © Copyright Orange Magic Cube Co.ltd.All Rights Reserved. | 粤ICP备2553149号
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import MenuUtils from '@/common/MenuUtils.js'
var routers = []
	export default {
		data: function(){
			var validateimageCode = (rule, value, callback) => {
				if (value === '') {
						callback(new Error('请输入验证码'));
				} else if (value !== '') {
						callback(new Error('验证码不匹配'));
				} else {
						callback();
				}
			}
			return {
				fullscreenLoading: false,
				logoSrcL: 'static/img/login/omc_logo1.png',
				logoSrcS: 'static/img/login/omc_logo2.png',
				flySrc: 'static/img/login/fly.png',
				logoName: '后台管理系统',
				pic:'',
				errorMsg: '',
				ruleForm: {
					username: 'admin',
					password: '123456',
					imageCode: '12345'
				},
				rules: {
					username: [
							{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
							{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					imageCode: [
							{ required: true, message: '请输入验证码', trigger: 'blur' }
					],
				}
			}
		},
		created() {
			let self = this;
			// self.getCode();//获取验证码
			
					
		},
		components: {
		
		},
		methods: {
			getCode(){
				let self = this;
				self.$axios.get('/api/auth/code/image', {responseType: 'blob'})
					.then( res => {
							let reader = new FileReader()
							reader.readAsDataURL(res.data)
							reader.onload = (e => {
									self.pic = e.target.result
							})
					})
					.catch( e=> {
						self.changeCode();
					})
			},
			fegetPassword() {
				this.$alert('如忘记密码，请联系系统管理人员进行密码重置操作。', '温馨提示', {
					confirmButtonText: '确定',
					callback: action => {
						
					}
				});
			},
			changeCode() {
				this.$axios.get('/api/auth/code/image', {responseType: 'blob'})
					.then( res => {
							let reader = new FileReader()
							reader.onload = (e => {
									this.pic = e.target.result
							})
							reader.readAsDataURL(res.data)
					})
					.catch( e=> {
							console.log(e)
					})
			},
			submitForm(formName) {
				const self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						self.fullscreenLoading = true;
						var params = {
							'username': self.ruleForm.username,
							'password': self.ruleForm.password,
							'imageCode': self.ruleForm.imageCode
						};
						
						// self.$axios.post('/api/auth/authentication/login', params, {
						// 	auth:{
						// 		username:'iem_cloud',
						// 		password:'thisissecret'
						// 	},
						// })
						// .then( res => {
						// 	let access_token = res.data.access_token
						// 	window.localStorage.setItem('access_token', access_token)
						// 	self.fullscreenLoading = false
						
						localStorage.setItem('ms_username',self.ruleForm.username);
						self.fullscreenLoading = false;
						window.sessionStorage.setItem('user_login','login');
						let targetPath = sessionStorage.getItem('targetPath');
						this.getRouter();//添加路由
						if(targetPath){
							sessionStorage.removeItem('targetPath');
							self.$router.push(targetPath);
						}else{
							self.$router.push('/dashboard');
						}
						// })
						// .catch( e => {
						// 	self.$message({ duration: 6000, type: 'error', message: '请填写正确的用户信息'})
						// 	self.fullscreenLoading = false
						// 	self.errorMsg = e.content
						// 	self.changeCode();
						// })
					} else {
							console.log('error')
					}
				});
				return false
			},
			componentUtils(data){
				this.rdata = data;
				window.sessionStorage.setItem('user_dynmRd',JSON.stringify(data))
				// window.sessionStorage.setItem('addRouteSuccess',true)
				MenuUtils(routers,data)

			},
			getRouter(){
				let data = [
					
					{
							path: '/group_query',
							iconCls: 'el-icon-tickets',
							leaf: true,
							component: 'common/Home',
							meta: { title: '用户权限管理' },
							children:[
									//租户管理
									{
											path: '/group_query',
											component: 'common/routerView',
											meta: { title: '租户管理' },
											children: [
													{
															path: '/',
															component: 'pages/upms/group/group_query',
															meta: { title: '租户管理' }
													},
													{
															path: '/group_add',
															component: 'pages/upms/group/group_add',
															meta: { title: '租户管理/新增'}
													},
													{
															path: '/group_edit',
															component: 'pages/upms/group/group_edit',
															meta: { title: '租户管理/编辑'}
													},
													{
															path: '/group_user',
															component: 'common/routerView',
															meta: { title: '租户管理/用户'},
															children: [
																	{
																			path: '/',
																			component: 'pages/upms/group/group_user',
																			meta: { title: '租户管理/用户'}
																	},
																	{
																			path: '/groupUser_add',
																			component: 'pages/upms/group/groupUser_add',
																			meta: { title: '租户管理/用户/新增'}
																	},
																	{
																			path: '/groupUser_edit',
																			component: 'pages/upms/group/groupUser_edit',
																			meta: { title: '租户管理/用户/编辑'}
																	},
																	{
																			path: '/groupUser_password',
																			component: 'pages/upms/group/groupUser_password',
																			meta: { title: '租户管理/用户/修改密码'}
																	},
															]
													},
													{
															path: '/group_proj',
															component: 'common/routerView',
															meta: { title: '租户管理/项目管理'},
															children: [
																{
																	path: '/',
																	component: 'pages/upms/group/group_proj',
																	meta: { title: '租户管理/项目管理/分配项目'}
																},
																{
																	path: '/groupProj_edit',
																	component: 'pages/upms/group/groupProj_edit',
																	meta: { title: '租户管理/项目管理/分配项目'}
																}
															]
													}
											]
									},
									//用户
									{
											path: '/user_query',
											component: 'common/routerView',
											meta: { title: '用户' },
											children: [
													{
															path: '/',
															component: 'pages/upms/user/user_query',
															meta: { title: '用户' }
													},
													{
															path: '/userMgmt_add',
															component: 'pages/upms/user/userMgmt_add',
															meta: { title: '用户/新增' }
													},
													{
															path: '/userMgmt_edit',
															component: 'pages/upms/user/userMgmt_edit',
															meta: { title: '用户/编辑' }
													},
													{
															path: '/userMgmt_password',
															component: 'pages/upms/user/userMgmt_password',
															meta: { title: '用户/修改密码' }
													},
											]
									},
									//服务
									{
											path: '/system_query',
											component: 'common/routerView',
											meta: { title: '服务' },
											children: [
													{
															path: '/',
															component: 'pages/upms/system/system_query',
															meta: { title: '服务'}
													},
													{
															path: '/system_edit',
															component: 'pages/upms/system/system_edit',
															meta: { title: '服务/编辑'}
													},
													{
															path: '/system_resource',
															component: 'common/routerView',
															meta: { title: '服务/资源'},
															children: [
																	{
																			path: '/',
																			component: 'pages/upms/system/system_resource',
																			meta: { title: '服务/资源'},
																	},
																	{
																			path: '/sysResource_edit',
																			component: 'pages/upms/system/sysResource_edit',
																			meta: { title: '服务/资源/编辑'}
																	},
																	{
																			path: '/sysResource_role',
																			component: 'pages/upms/system/sysResource_role',
																			meta: { title: '服务/资源/角色'}
																	}
															]
													},
													
											]
									},
									//项目
									{
											path: '/project_query',
											component: 'common/routerView',
											meta: { title: '项目' },
											children: [
													{
															path: '/',
															component: 'pages/upms/project/project_query',
															meta: { title: '项目'}
													},
													{
															path: '/project_add',
															component: 'pages/upms/project/project_add',
															meta: { title: '项目/新增'}
													},
													{
															path: '/project_edit',
															component: 'pages/upms/project/project_edit',
															meta: { title: '项目/修改'}
													},
													{
															path: '/project_role',
															component: 'common/routerView',
															meta: { title: '项目/角色'},
															children: [
																	{
																			path: '/',
																			component: 'pages/upms/project/project_role',
																			meta: { title: '项目/角色'}
																	},
																	{
																			path: '/projectRole_add',
																			component: 'pages/upms/project/projectRole_add',
																			meta: { title: '项目/角色/新增'}
																	},
																	{
																			path: '/projectRole_edit',
																			component: 'pages/upms/project/projectRole_edit',
																			meta: { title: '项目/角色/修改'}
																	},
															]
													},
													{
															path: '/project_menu',
															component: 'common/routerView',
															meta: { title: '项目/菜单'},
															children: [
																	{
																			path: '/',
																			component: 'pages/upms/project/project_menu',
																			meta: { title: '项目/菜单'},
																	}, 
																	{
																			path: '/projectMenu_add',
																			component: 'pages/upms/project/projectMenu_add',
																			meta: { title: '项目/菜单/新增'},
																	}, 
																	{
																			path: '/projectMenu_edit',
																			component: 'pages/upms/project/projectMenu_edit',
																			meta: { title: '项目/菜单/修改'},
																	}, 
																	{
																			path: '/projectMenu_resource',
																			component: 'pages/upms/project/projectMenu_resource',
																			meta: { title: '项目/菜单/关联资源'},
																	}, 
															]
													},
													{
															path: '/project_resource',
															component: 'pages/upms/project/project_resource',
															meta: { title: '项目/资源'}
													},
											]
									},
									
							]
					},
					//404
					{
						path: '*',
						redirect: '/404',
						hidden: true
					}
				];
				let params = {

				};
				// this.$axios.get('',params)
				// .then(res => {
				// 	data = res.data.list;
				// }).catch(err => {
				// 	console.log('err')
				// })
				this.componentUtils(data);//路由Component => object
				this.$router.addRoutes(routers);//添加路由
				
			}
			
		}
	}
</script>

<style>
.el-loading-mask{
		background-color: rgba(0,0,0,.5);
}
#wrap .login-wrap{
		overflow: hidden;
		width: 100%;
		margin: 0 auto;
		position: relative;
		height: 800px;
}
#wrap .login-wrap .header{
		height: 480px;
		width: 100%;
		background: #363D47 url("../../../static/img/login/bg_Bitmap.png") no-repeat left bottom;
		background-size: 100% ;
}
#wrap .login-wrap .main{
		position: absolute;
		top: 136px;
		left: 50%;
		transform: translate3d(-50%, 0 ,0);
}
#wrap .login-wrap .bottom{
		overflow: hidden;
		box-sizing: border-box;
		width: 100%;
		height: 320px;
		background: #F7F7F7 url("../../../static/img/login/Rectangle 17.png") no-repeat top center;
}
#wrap .login-wrap .bottom .text{
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
		letter-spacing: -0.29px;
		line-height: 12px;
		display: block;
		width: 540px;
		height: 12px;
		margin: 268px auto 40px auto;
}
#wrap .img-wrapper{
		text-align: center;
}
#wrap .img-wrapper>img{
		width: 147px;
        height: 36px;
        vertical-align: middle;
}
#wrap .img-wrapper>img.logoImg{
	width: 240px;
	height: 60px;
}
#wrap .img-wrapper>span{
		font-size: 26px;
		color: #ffffff;
		padding-left: 10px;
		margin-left: 10px;
		border-left: 1px solid #cccccc;
}
#wrap .form-wrapper{
		position: relative;
		margin-top: 40px;
}
#wrap .form-wrapper .fly{
		position: absolute;
		right: -86px;
		top: -77px;
}
#wrap .form-wrapper .line1{
		width: 328px;
		height: 4px;
		background: #F1F1F1;
		margin: 0 auto;
}
#wrap .form-wrapper .line2{
		width: 308px;
		height: 4px;
		margin: 5px auto 5.5px auto;
		background: #F2F2F2;
}
#wrap .form-wrapper .line3{
		width: 288px;
		height: 4px;
		background: #F3F3F3;
		margin: 0 auto;
}
#wrap .el-form{
		width: 330px;
		height: 370px;
		background: #FFFFFF;
		overflow: hidden;
}
#wrap .form-content .title{
		display: block;
		margin:30px auto;
		width: 64px;
		height: 16px;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #282828;
		letter-spacing: -0.39px;
		line-height: 16px;
}
#wrap .form-content .el-form-item{
		display: block;
		box-sizing: border-box;
		width: 260px;
		height: 40px;
		background: #FFFFFF;
		margin: 0 auto 20px auto;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
}
#wrap .el-form-item .el-input{
	
}
#wrap .el-form-item .el-input .el-input__inner{
		width: 260px;
		height: 40px;
}
#wrap .form-content .code-wrapper{
		margin-bottom: 23px;
		box-sizing: border-box;
}
#wrap .form-content .last-input{
		width: 160px;
		height: 40px;
		margin: 0 10px 0px 0px;
}
#wrap .form-content .last-input .el-input__inner{
		width: 160px;
		height: 40px;
		color: #333333;
}
#wrap .form-content .check-code{
		background: #F9F9F9;
		width: 90px;
		height: 40px;
		display: inline-block;
		text-align: center;
		line-height: 40px;
}
#wrap .form-content .error{
		margin: -12px auto 10px 35px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #FF6666;
		letter-spacing: -0.29px;
		height: 14px;
		line-height: 14px;
}
#wrap .form-content .tijiao{
		display: block;
		margin: 0 auto  20px auto;
		width: 260px;
		height: 40px;
		/* background: #FF9900; */
		border-radius: 4px;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: -0.39px;
		line-height: 16px;
		border: none;
}
#wrap .form-content .fegetPasswordText{
		display: block;
		width: 56px;
		height: 14px;
		margin: auto 35px 20px auto;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		/* color: #ff9900; */
		cursor: pointer;
		letter-spacing: -0.34px;
		line-height: 14px;
}
@keyframes slidedown
{
		from {height:0;}
		to {height: 14px;}
}
</style>
