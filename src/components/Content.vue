<template>
    <div style="padding: 0 10%">
        <div class="bg-white p-20">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item" :name="index">
                    <div>
                        <slot name="content"></slot>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>
<!-- 
    这是一个名为 Content 的 Vue.js 组件，用于显示带有标签导航的内容，并通过点击标签切换内容分类。以下是这个组件的关键点：

    Data：定义了两个本地数据属性：

    activeName：当前激活的标签索引。
    tabs：一个包含标签名称的数组。
    Methods：

    handleClick(tab, event)：处理标签点击事件，打印当前激活的标签索引，并调用父组件的方法 fatherMethod，传递当前激活的标签索引 activeName。
 -->
<script>
export default {
    name: 'Content',
    data() {
        return {
            activeName: 0,
            tabs: ['全部分类', '历史', '心理学', '哲学', '亲子', '古典', '文学', '科技', '艺术', '经济', '教育', '旅游', '健康', '烹饪', '体育']
        }
    },
    
    methods: {
        handleClick(tab, event) {
            console.log(this.activeName);
            this.$parent    .fatherMethod(this.activeName);
        }
    }
}
</script>

<style scoped lang="scss">
.demo-tabs {
    width: 100%;
}
</style>
