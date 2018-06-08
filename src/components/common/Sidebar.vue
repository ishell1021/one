<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="(node,index) in nodes" v-if="!node.hidden">
                <template v-if="node.leaf">
                    <el-submenu :index="node.path" :key="index">
                        <template slot="title">
                            <i :class="node.iconCls"></i><span slot="title">{{ node.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in node.children" :key="i" :index="subItem.path" @click="menuItemClick(subItem)">
                            {{ subItem.meta.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="node.path" :key="node.path" @click="menuItemClick(node)">
                        <i :class="node.iconCls"></i><span slot="title">{{ node.meta.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '@/common/bus';
    export default {
        data() {
            return {
                collapse: false,
                nodes: this.$router.options.routes
            }
        },
        props:{
            rdata:{
                default: []
            }
        },
        computed:{
            onRoutes(value){
                //保持左侧菜单激活状态
                return this.$route.matched[1].path;
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.getNodes();//获取路由信息

        },
        methods: {
            getNodes(){
                //这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
                //另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
                let isLoadNodes = sessionStorage.getItem('isLoadNodes');
                if (!isLoadNodes) {
                    let data = JSON.parse(window.sessionStorage.getItem('user_dynmRd'))
                    this.nodes.push(...data)
                    console.log('this.nodes after',this.nodes)
                    sessionStorage.setItem('isLoadNodes', 'true')
                }
            },
            menuItemClick(item){
                
            },
            
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-submenu.is-active i{
        color: #409EFF;
    }
</style>
