<template>
    <div class="crumbs">
        <!-- <el-row>
            <el-col :span="22">
                <span class="title">当前位置：</span> -->
                <el-breadcrumb separator="/" class="breadcrumb-inner">
                    <el-breadcrumb-item v-if="yiji" :to="{ path: link[1].path }" class="test1">{{yiji}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="erji" :to="{ path: link[2].path }" class="test1">{{erji}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="sanji" :to="{ path: link[3].path }" class="test1">{{sanji}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="siji" :to="{ path: link[4].path }" class="test1">{{siji}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="wuji" :to="{ path: link[5].path }" class="test1">{{wuji}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="liuji" :to="{ path: link[6].path}" class="test1">{{liuji}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if='false'>{{activeTab}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if='false'>{{pactNo}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if='false'>{{userNo}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if='false'>{{pactSubFlag}}</el-breadcrumb-item>
                </el-breadcrumb>
            <!-- </el-col>
            <el-col :span="2" v-show="breadItemLength>2">
                <img src="../../../static/img/common/back.png" alt="pic" width="19" height="12" class="pic" @click="jump">
            </el-col>
        </el-row> -->
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
    data() {
        return {
            yiji:  '',
            erji: '',
            sanji:'',
            siji:  '' ,
            wuji:  '',
            liuji:  '',
            link: [],
            breadItemLength: 0,
        }
    },
    created() {
        this.link = this.$route.matched;
        this.yiji=  this.$route.matched[1].meta.title ;
        this.erji= sessionStorage.getItem(this.link[2].path.replace(/\//,'')) ;
        if(this.link[3]){
            this.sanji= sessionStorage.getItem(this.link[3].path.replace(/\//,'')) ;
        }
        if(this.link[4]){
            this.siji=  sessionStorage.getItem(this.link[4].path.replace(/\//,'')) ;
        }
        if(this.link[5]){
            this.wuji=  sessionStorage.getItem(this.link[5].path.replace(/\//,'')) ;
        }
        if(this.link[6]){
            this.liuji=  sessionStorage.getItem(this.link[6].path.replace(/\//,'')) ;
        }
        
        // 获取当期路由链的长度  例子:home/detail/01  此路由链的长度为3
        let length = this.$route.matched.length
        // 正则匹配以/开头和结尾的任意路由 例 /home/
        let reg = /^\/.*\/$/g
        // 正则匹配最后一级路由, 如果最后一级路由是/01/这样子就返回ture
        let showIcon = reg.test(this.$route.matched[length-1].path)
        // 只有标题大于3级才显示返回按钮
        if(showIcon) {
            this.breadItemLength = length-1
        }else {
            this.breadItemLength = length
        }
    },
    methods: {
        jump() {
            let aa = this.link[this.breadItemLength - 2]
            if (!aa) return false
            if (this.activeTab && this.pactNo && this.userNo && this.pactSubFlag) {
                this.$router.push({
                    name: 'detail_contract',
                    params: {
                        activeTab: this.activeTab,
                        pactNo: this.pactNo,
                        userNo: this.userNo
                    }
                })
            } else if(this.activeTab && this.pactNo){
                this.$router.push({
                    name: aa,
                    params: {
                        activeTab: this.activeTab,
                        pactNo: this.pactNo
                    }
                })
            } else if (this.userNo) {
                console.log("走我的判断了");
                this.$router.push(aa)
            } else {
                
                this.$router.go(-1);
            }
        },
    },

    props: {
        activeTab: {
            type: String,
            default: ''
        },
        pactNo: {
            type: String,
            default: ''
        },
        userNo: {
            type: String,
            default: ''
        },
        pactSubFlag: {
            type: String,
            default: ''
        },
    }
}
</script>

<style scoped>
.location-wrapper {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
}

.location-wrapper .el-row {
    width: 100%;
}

.location-wrapper .title {
    color: #475669;
    vertical-align: middle;
}

.location-wrapper .breadcrumb-inner {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
}

.pic {
    cursor: pointer;
}
</style>
