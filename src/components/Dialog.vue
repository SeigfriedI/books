<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="titleVisible" :width="searchwidth" :before-close="handleClose" draggable>
            <slot name="content"></slot>
        </el-dialog>
    </div>
</template>
<!-- 
    这是一个名为 Dialog 的 Vue.js 组件，用于显示和管理一个弹窗对话框。组件接收 dialog 和 title 两个 props，并根据窗口大小动态调整弹窗的宽度。以下是这个组件的关键点：

    Props：

    dialog：控制弹窗的显示状态。
    title：弹窗的标题。
    Data：

    dialogVisible：本地数据属性，用于控制弹窗的显示状态，初始值为 false。
    sreenwidth：弹窗的宽度，初始值为 '580px'。
    Computed：

    dialogVisible：返回 dialog prop 的值，用于同步弹窗显示状态。
    titleVisible：返回 title prop 的值，用于显示弹窗标题。
    Methods：

    handleClose(done)：处理弹窗关闭事件，并触发 handleClose 事件，将 done 回调函数传递给父组件。
    getwindowinfo()：获取当前窗口宽度并根据窗口大小动态调整弹窗的宽度。
    Lifecycle Hooks：

    created()：在组件创建时添加一个 resize 事件监听器，以便实时检测浏览器窗口宽度的变化，并调用 getwindowinfo 方法设置弹窗宽度

 -->
<script>
export default {
    name: 'Dialog',
    props: ['dialog', 'title'],
    data() {
        return {
            dialogVisible: false,
            sreenwidth: '580px'
        }
    },
    computed: {
        dialogVisible() {
            return this.dialog
        },
        titleVisible() {
            return this.title
        }
    },
    methods: {
        handleClose(done) {
            this.$emit('handleClose', done)
        },
        //获取当前windows页面信息-实时修改【弹窗】的宽度
        getwindowinfo() {
            this.sreenwidth = document.documentElement.clientWidth
            if (this.sreenwidth < 600) {
                this.searchwidth = this.sreenwidth * 0.8 + 'px'
            } else {
                this.searchwidth = '580px'
            }
        }
    },
    created() {
        window.addEventListener('resize', this.getwindowinfo) // 注册监听器-实时检测浏览器页面宽高
        this.getwindowinfo()
    }
}
</script>

<style scoped lang="scss">
.demo-tabs {
    width: 100%;
}
</style>
