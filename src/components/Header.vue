<template>
    <div class="bg-primary">
        <div style="padding: 0 10%">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                background-color="#BB16C9"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
            >
                <el-menu-item>图书商城</el-menu-item>
                <div style="flex-grow: 1" />
                <el-menu-item index="/home">书籍</el-menu-item>
                <el-menu-item index="/shopping">
                    购物车 <span class="shopcar-num">{{ shopnum }}</span>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>admin</template>
                    <el-menu-item index="/">
                        <el-icon> <SwitchButton /> </el-icon>退出登录
                    </el-menu-item>
                    <el-menu-item index="/order">
                        》我的订单
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>
<!-- 
    这是一个名为 Header 的 Vue.js 组件，用于显示页面头部并处理导航和购物车数量的显示。以下是这个组件的关键点：
    Props：
    active：当前激活的导航项索引。
    Watchers：
    监听 active prop 的变化，并在变化时更新本地数据 activeIndex。
    Data：
    activeIndex：当前激活的导航项索引，初始值为 '0'。
    shopnum：购物车中的商品数量，初始值为 0。
    Lifecycle Hooks：
    mounted()：在组件挂载时从 localStorage 获取购物车数据，并更新 shopnum。
    Methods：

    handleSelect(index)：处理导航项的选择事件，根据选择的索引进行路由跳转。
 -->
<script>
import { mapState } from 'vuex'

export default {
    name: 'Header',
    props: ['active'],
    watch: {
        active: {
            handler(newVal) {
                this.activeIndex = newVal
            },
            immediate: true,
            deep: true
        }
    },
    // computed: {
    //     ...mapState({
    //         shopnum: (state) => state.shopcar.shopnum
    //     })
    // },
    data() {
        return {
            activeIndex: '0',
            shopnum:0,
        }
    },
    mounted() {
        let arr = localStorage.getItem('shopbooks') ? JSON.parse(localStorage.getItem('shopbooks')) : []
        this.shopnum = arr.length
    },
    methods: {
        handleSelect(index) {
            this.$router.push({ path: index }).catch((error) => error)
        }
    }
}
</script>

<style scoped lang="scss">
.el-menu--horizontal {
    border-bottom: solid 0px var(--el-menu-border-color);
}

.shopcar-num {
    width: 10px;
    height: 10px;
    line-height: 10px;
    background-color: red;
    padding: 6px;
    border-radius: 50%;
    margin-left: 5px;
}
</style>
