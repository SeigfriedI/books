<template>
    <div class="bg-images-box" style="height: 340px;">
        <div class="flex-r flex-jc-c flex-ai-c">
            <div class="select-box flex-c flex-jc-c">
                <div class="f-24 f-b c-white">
                    <span>{{ tips }}</span>
                </div>
                <div class="flex-r flex-jc-sb flex-ai-c input-box">
                    <div style="width: calc(100% - 70px);">
                        <el-input v-model="value" placeholder="请输入书籍名称" size="large" prefix-icon="Search" maxlength="30"
                            clearable />
                    </div>
                    <div class="w-px-60">
                        <el-button type="primary" size="large" icon="Search" style="width: 100%;"
                            @click="searchEvent(value)"></el-button>
                    </div>
                </div>
                <div class="f-16 c-white items-box flex-r flex-jc-c flex-ai-c">
                    <div v-for="(item, index) in items" :key="index" class="item-hover" @click="changeEvent(item)"><span>{{
                        item }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 
    这是一个名为 Carousel 的 Vue.js 组件，主要用于显示一个轮播组件并处理搜索事件。以下是这个组件的关键点：
    Data：定义了三个本地数据属性：
    tips：显示的提示信息。
    value：当前输入的搜索值。
    items：一个包含书名的数组。
    Methods：

    searchEvent(data)：触发 search 事件，传递数据 data 给父组件。
    changeEvent(data)：更新本地数据 value，并调用 searchEvent 方法，触发搜索事件。
 -->
<script>
export default {
    name: 'Carousel',
    data() {
        return {
            tips: '书中自有黄金屋,书中自有颜如玉',
            value: '',
            items: ['三体', '狂飙', '流浪地球', '阿甘正传', '神圣婚姻', '浪漫地理学']
        }
    },
    methods: {
        searchEvent(data) {
            this.$emit('search', data)
        },
        changeEvent(data) {
            this.value = data;
            this.searchEvent(data)
        }
    }
}
</script>

<style scoped lang="scss">
.bg-images-box {
    background-image: url('../assets/imgs/home-books-04.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #00000009;
}

.select-box {
    width: 30%;
    min-width: 460px;
    height: 320px;

    .f-b span {
        letter-spacing: 4px;
    }

    .input-box {
        margin: 20px 0 10px;
    }

    .items-box {
        letter-spacing: 2px;

        div {
            margin-right: 10px;
        }

        .item-hover:hover {
            cursor: pointer;
            color: var(--el-color-warning)
        }
    }
}
</style>
