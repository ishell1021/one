import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login.vue';
import NotFound from '@/components/pages/404.vue';
import Home from '@/components/common/Home.vue';

Vue.use(Router);

const routes = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login,
            meta: { title: '登陆页' },
            hidden: true,
            leaf:false,
        },
        {
            path: '/404',
            component: NotFound,
            hidden: true,
            leaf:false,
        },
        {
            path: '/',
            redirect: '/dashboard',
            hidden: true,
            leaf:false,
        },
        {
            path: '/dashboard',
            iconCls: 'el-icon-setting',
            leaf:false,
            component: Home,
            meta: { title: '系统首页' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['@/components/pages/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
            ]
        },
        // {
        //     path: '/dashboard',
        //     component: resolve => require(['@/components/common/Home.vue'], resolve),
        //     leaf:false,
        //     meta: { title: '系统首页' },
        //     children:[
        //         {
        //             path: '/dashboard',
        //             component: resolve => require(['@/components/pages/Dashboard.vue'], resolve),
        //             meta: { title: '系统首页' }
        //         },
        //     ]
        // },
    //
        // {
        //     path: '/',
        //     leaf: true,
        //     component: resolve => require(['@/components/common/Home.vue'], resolve),
        //     meta: { title: '用户权限管理' },
        //     children:[
        //         {
        //             path: '/group_query',
        //             component: resolve => require(['@/components/pages/upms/group_Mgmt/group_router.vue'], resolve),
        //             meta: { title: '租户' },
        //             children: [
        //                 {
        //                     path: '/',
        //                     component: resolve => require(['@/components/pages/upms/group_Mgmt/group_query.vue'], resolve),
        //                     meta: { title: '租户' }
        //                 },
        //                 {
        //                     path: '/group_add',
        //                     component: resolve => require(['@/components/pages/upms/group_Mgmt/group_add.vue'], resolve),
        //                     meta: { title: '租户/新增'}
        //                 },
        //                 {
        //                     path: '/group_user',
        //                     component: resolve => require(['@/components/pages/upms/group_Mgmt/groupUser_router.vue'], resolve),
        //                     meta: { title: '租户/用户'},
        //                     children: [
        //                         {
        //                             path: '/',
        //                             component: resolve => require(['@/components/pages/upms/group_Mgmt/group_user.vue'], resolve),
        //                             meta: { title: '租户/用户'}
        //                         },
        //                         {
        //                             path: '/groupUser_add',
        //                             component: resolve => require(['@/components/pages/upms/group_Mgmt/groupUser_add.vue'], resolve),
        //                             meta: { title: '租户/用户/新增'}
        //                         },
        //                     ]
        //                 },
        //                 {
        //                     path: '/group_proj',
        //                     component: resolve => require(['@/components/pages/upms/group_Mgmt/group_proj.vue'], resolve),
        //                     meta: { title: '租户/项目管理'}
        //                 }
        //             ]
        //         },
        //         {
        //             path: '/user_query',
        //             component: resolve => require(['@/components/pages/upms/user_Mgmt/user_router.vue'], resolve),
        //             meta: { title: '用户' },
        //             children: [
        //                 {
        //                     path: '/',
        //                     component: resolve => require(['@/components/pages/upms/user_Mgmt/user_query.vue'], resolve),
        //                     meta: { title: '用户' }
        //                 },
        //                 {
        //                     path: '/userMgmt_add',
        //                     component: resolve => require(['@/components/pages/upms/user_Mgmt/userMgmt_add.vue'], resolve),
        //                     meta: { title: '用户/新增' }
        //                 },
        //             ]
        //         },
                
        //         {
        //             path: '/system_query',
        //             component: resolve => require(['@/components/pages/upms/system_Mgmt/system_router.vue'], resolve),
        //             meta: { title: '服务' },
        //             children: [
        //                 {
        //                     path: '/',
        //                     component: resolve => require(['@/components/pages/upms/system_Mgmt/system_query.vue'], resolve),
        //                     meta: { title: '服务'}
        //                 },
        //                 {
        //                     path: '/system_resource',
        //                     component: resolve => require(['@/components/pages/upms/system_Mgmt/system_router.vue'], resolve),
        //                     meta: { title: '服务/资源'},
        //                     children: [
        //                         {
        //                             path: '/',
        //                             component: resolve => require(['@/components/pages/upms/system_Mgmt/system_resource.vue'], resolve),
        //                             meta: { title: '服务/资源'},
        //                         },
        //                         {
        //                             path: '/sysResource_role',
        //                             component: resolve => require(['@/components/pages/upms/system_Mgmt/sysResource_role.vue'], resolve),
        //                             meta: { title: '服务/资源/角色'}
        //                         }
        //                     ]
        //                 },
                        
        //             ]
        //         },
        //         {
        //             path: '/project_query',
        //             component: resolve => require(['@/components/pages/upms/project_Mgmt/project_router.vue'], resolve),
        //             meta: { title: '项目' },
        //             children: [
        //                 {
        //                     path: '/',
        //                     component: resolve => require(['@/components/pages/upms/project_Mgmt/project_query.vue'], resolve),
        //                     meta: { title: '项目'}
        //                 },
        //                 {
        //                     path: '/project_add',
        //                     component: resolve => require(['@/components/pages/upms/project_Mgmt/project_add.vue'], resolve),
        //                     meta: { title: '项目/新增'}
        //                 },
        //                 {
        //                     path: '/project_edit',
        //                     component: resolve => require(['@/components/pages/upms/project_Mgmt/project_edit.vue'], resolve),
        //                     meta: { title: '项目/修改'}
        //                 },
        //                 {
        //                     path: '/project_role',
        //                     component: resolve => require(['@/components/pages/upms/project_Mgmt/projectRole/projectRole_router.vue'], resolve),
        //                     meta: { title: '项目/角色'},
        //                     children: [
        //                         {
        //                             path: '/',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectRole/project_role.vue'], resolve),
        //                             meta: { title: '项目/角色'}
        //                         },
        //                         {
        //                             path: '/projectRole_add',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectRole/projectRole_add.vue'], resolve),
        //                             meta: { title: '项目/角色/新增'}
        //                         },
        //                         {
        //                             path: '/projectRole_edit',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectRole/projectRole_edit.vue'], resolve),
        //                             meta: { title: '项目/角色/修改'}
        //                         },
        //                     ]
        //                 },
                        
        //                 {
        //                     path: '/project_menu',
        //                     component: resolve => require(['@/components/pages/upms/project_Mgmt/projectMenu/projectMenu_router.vue'], resolve),
        //                     meta: { title: '项目/菜单'},
        //                     children: [
        //                         {
        //                             path: '/',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectMenu/project_menu.vue'], resolve),
        //                             meta: { title: '项目/菜单'},
        //                         }, 
        //                         {
        //                             path: '/projectMenu_add',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectMenu/projectMenu_add.vue'], resolve),
        //                             meta: { title: '项目/菜单/新增'},
        //                         }, 
        //                         {
        //                             path: '/projectMenu_edit',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectMenu/projectMenu_edit.vue'], resolve),
        //                             meta: { title: '项目/菜单/修改'},
        //                         }, 
        //                         {
        //                             path: '/projectMenu_resource',
        //                             component: resolve => require(['@/components/pages/upms/project_Mgmt/projectMenu/projectMenu_resource.vue'], resolve),
        //                             meta: { title: '项目/菜单/关联资源'},
        //                         }, 
        //                     ]
        //                 },
        //                 {
        //                     path: '/project_resource',
        //                     component: resolve => require(['@/components/pages/upms/project_Mgmt/project_resource.vue'], resolve),
        //                     meta: { title: '项目/资源'}
        //                 },
        //             ]
        //         },
        //     ]
        // },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})

export default routes;