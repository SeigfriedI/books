<template>
    <div class="cardbooks-box b-1 brd-4">
        <div class="p-12 f-12">
            <div class="flex-r flex-jc-c flex-ai-c">
                <div class="image-box">
                    <el-image
                        style="width: 100%"
                        :src="require('@/assets/imgs/cardbooks/' + Image + '')"
                        :preview-src-list="[require('@/assets/imgs/cardbooks/' + Image + '')]"
                        :z-index="9999"
                        hide-on-click-modal
                        preview-teleported
                        close-on-press-escape
                    />
                </div>
            </div>
            <div class="p-t-12 cardbook-text">
                <div class="no-warp name-box" @click="this.dialogVisible = true">
                    <span>{{ Name }}</span>
                </div>
                <div>
                    <span class="c-gray">{{ Auth }}</span>
                </div>
            </div>
            <div class="flex-r flex-jc-sb flex-ai-c">
                <div>
                    <span class="f-14 f-b c-red">￥{{ Price }}</span
                    >&nbsp;&nbsp;<span class="c-gray cardbook-span">￥{{ Priceold }}</span>
                </div>
                <div class="shopping c-p">
                    <AddShopping :active="Active" v-on:join="joinEvent" v-on:nojoin="nojoinEvent" />
                </div>
            </div>
        </div>

        <!-- 加弹出框-显示详情 -->
        <div>
            <Dialog :dialog="dialogVisible" :title="Name" v-on:handleClose="handleClose">
                <template v-slot:content>
                    <div>
                        <Details :image="Image" :name="Name" :auth="Auth" :price="Price" :number="'20'" />
                    </div>
                </template>
            </Dialog>
        </div>
    </div>
</template>
<!-- 
    这是一个名为 CardBooks 的 Vue.js 组件，用于显示书籍信息，并允许用户将书籍加入购物车或移出购物车。组件还使用了 Vuex 进行状态管理。以下是这个组件的关键点：
    Props：接收多个 props，包括 id、image、name、auth、price、priceold、active 和 type。
    Watchers：监听各个 props 的变化，并在变化时更新本地数据。
    Vuex State：通过 mapState 从 Vuex 中映射 shopnum 和 shopbooks。
    Data：定义了一些本地数据属性，包括 Id、Image、Name、Auth、Price、Priceold、Active、Type 和 dialogVisible。
    生命周期钩子：在 mounted 钩子中打印了一些调试信息。
    Methods：
    handleClose(done)：关闭对话框。
    joinEvent()：将书籍信息添加到购物车，并更新 Vuex 状态和本地存储。
    nojoinEvent()：从购物车中移除书籍信息，并更新 Vuex 状态和本地存储。
 -->
<script>
import { mapState } from 'vuex'
export default {
    name: 'CardBooks',
    props: ['id', 'image', 'name', 'auth', 'price', 'priceold', 'active', 'type'],
    watch: {
        id: {
            handler(newVal) {
                this.Id = newVal
            },
            immediate: true,
            deep: true
        },
        image: {
            handler(newVal) {
                this.Image = newVal
            },
            immediate: true,
            deep: true
        },
        name: {
            handler(newVal) {
                this.Name = newVal
            },
            immediate: true,
            deep: true
        },
        auth: {
            handler(newVal) {
                this.Auth = newVal
            },
            immediate: true,
            deep: true
        },
        price: {
            handler(newVal) {
                this.Price = newVal
            },
            immediate: true,
            deep: true
        },
        priceold: {
            handler(newVal) {
                this.Priceold = newVal
            },
            immediate: true,
            deep: true
        },
        active: {
            handler(newVal) {
                this.Active = newVal
            },
            immediate: true,
            deep: true
        },
        type: {
            handler(newVal) {
                this.Type = newVal
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        ...mapState({
            shopnum: (state) => state.shopcar.shopnum,
            shopbooks: (state) => state.shopcar.shopbooks
        })
    },
    data() {
        return {
            Id: '1',
            Image: 'cardbooks-01.jpg',
            Name: '博物馆里的大语文',
            Auth: '曲现龙',
            Price: '￥90.00',
            Priceold: '￥128.00',
            Active: '0',
            Type:'',
            dialogVisible: false
        }
    },
    mounted() {
        console.log(this.name);
        console.log('0---');
        console.log(this.type);
    },  
    methods: {
        handleClose(done) {
            done()
            this.dialogVisible = false
        },
        joinEvent() {
        alert(this.type)
            let data = {
                id: this.Id,
                image: this.Image,
                name: this.Name,
                auth: this.Auth,
                price: this.Price,
                priceold: this.Priceold,
                type: this.type,
                active: '1',
                num: '1'
            }

            this.shopbooks.push(data)
            console.log(this.shopbooks);
            localStorage.setItem('shopbooks', JSON.stringify(this.shopbooks))
            this.$store.dispatch('shopcar/revise_shopnum', this.shopbooks.length)
            this.$store.dispatch('shopcar/revise_shopbooks', this.shopbooks)
        },
        nojoinEvent() {
            let newdata = this.shopbooks.filter((n) => n.id != this.Id)
            localStorage.setItem('shopbooks', JSON.stringify(newdata))
            this.$store.dispatch('shopcar/revise_shopnum', newdata.length)
            this.$store.dispatch('shopcar/revise_shopbooks', newdata)
        }
    }
}
</script>

<style scoped lang="scss">
.cardbooks-box {
    height: 290px;
    min-width: 220px;
    max-width: 240px;

    .image-box {
        max-width: 180px;
    }

    .name-box {
        font-size: 14px;
        line-height: 28px;
    }
    .name-box:hover {
        cursor: pointer;
        color: var(--el-color-primary);
    }

    .cardbook-text {
        text-align: left;
        line-height: 18px;
    }

    .cardbook-span {
        text-decoration: line-through;
    }

    .shopping:hover {
        color: var(--el-color-primary);
    }
}
</style>
