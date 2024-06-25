<template>
    <div @click="clickEvent(Active)">
        <div v-if="Active == '0'">
            <el-tooltip content="加入购物车" placement="bottom">
                <el-button type="primary" icon="" size="small" round
                    ><el-icon size="14"><ShoppingCartFull /></el-icon
                ></el-button>
            </el-tooltip>
        </div>
        <div v-else>
            <el-button type="primary" size="small" round plain>
                <span class="f-12">已加入</span>
            </el-button>
        </div>
    </div>
</template>
<!-- 
    这是一个名为 AddShopping 的 Vue.js 组件，用于处理购物车的加入和移除操作。以下是这个组件的关键点：

Props：接收一个名为 active 的 prop，用于指示当前状态。
Watch：监听 active 的变化，并在发生变化时更新本地数据 Active。
Data：定义一个本地数据 Active，初始值为 0，表示未加入状态，1 表示已加入状态。
Methods：
clickEvent(data)：根据传入的 data 值切换 Active 的状态，并通过 $emit 触发 join 或 nojoin 事件，通知父组件状态的变化。
 -->
<script>
export default {
    name: 'AddShopping',
    props: ['active'],
    watch: {
        active: {
            handler(newVal) {
                this.Active = newVal
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            Active: 0 // 0为加入状态 1已加入状态
        }
    },
    methods: {
        clickEvent(data) {
            if (data == 1) {
                this.Active = 0
                this.$emit('nojoin', true)
            } else {
                this.Active = 1
                this.$emit('join', true)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.demo-tabs {
    width: 100%;
}
</style>
