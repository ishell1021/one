<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar :rdata="rdata"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                        <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from '@/common/bus';
    export default {
        data(){
            return {
								collapse: false,
								rdata: []
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
					// alert('Home')
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods:{
					
        }
    }
</script>
