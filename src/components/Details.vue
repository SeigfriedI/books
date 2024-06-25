<template>
    <div>
        <div class="flex-r flex-jc-l flex-ai-c" style="height: 180px">
            <div>
                <el-image
                    style="height: 180px"
                    :src="require('@/assets/imgs/cardbooks/' + Image + '')"
                    :preview-src-list="[require('@/assets/imgs/cardbooks/' + Image + '')]"
                    :z-index="9999"
                    hide-on-click-modal
                    preview-teleported
                    close-on-press-escape
                />
            </div>
            <div class="flex-c flex-jc-sb flex-ai-l" style="height: 160px; text-align: left">
                <div>
                    <span>书名：</span><span>{{ Name }}</span>
                </div>
                <div>
                    <span>作者：</span><span>{{ Auth }}</span>
                </div>
                <div>
                    <span>价格：</span><span class="c-red f-b">￥ {{ Price }}</span>
                </div>
                <div>
                    <span>库存：</span><span>{{ Numbers }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 
    这个 Vue.js 组件名为 Details，用于显示项目详情，并根据窗口大小动态调整弹窗的宽度。以下是一些关键点：
    Props：接收 image、name、auth、price 和 number 作为 props。
    计算属性：将 props 映射到计算属性，便于在模板中访问。
    方法：
    handleClose(done)：使用 done 回调函数关闭弹窗。
    getwindowinfo()：根据当前窗口宽度计算并设置弹窗的宽度。
    生命周期钩子：
    created()：添加一个 resize 事件监听器，当窗口大小变化时动态更新弹窗宽度，并在初始化时调用 getwindowinfo() 设置正确的宽度。
 -->
<script>
export default {
    name: 'Details',
    props: ['image', 'name', 'auth', 'price', 'number'],
    data() {
        return {}
    },
    computed: {
        Image() {
            return this.image
        },
        Name() {
            return this.name
        },
        Auth() {
            return this.auth
        },
        Price() {
            return this.price
        },
        Numbers() {
            return this.number
        }
    },
    methods: {
        handleClose(done) {
            done()
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
