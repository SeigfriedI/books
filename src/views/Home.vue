<template>
    <div>
        <el-affix :offset="0">
            <Header :active="'/home'" />
        </el-affix>
    </div>
    <div>
        <Carousel v-on:search="searchEvent" />
    </div>
    <div>
        <Content>
            <template v-slot:content>
                <div class="content-slot flex-r flex-jc-sb flex-ac-fs flex-col">
                    <div v-for="(item, index) in books" :key="index">
                        <CardBooks :id="item.id" :image="item.image" :name="item.name" :auth="item.auth" :price="item.price"
                            :priceold="item.priceold" :active="item.active" :type="item.type" />
                    </div>
                </div>
                <div class="w-100 flex-r flex-jc-c flex-ai-c m-t-20">
                    <!-- <Pagination :total="this.books.length" /> -->
                </div>
            </template>
        </Content>
    </div>
    <div class="footer-box f-12 bg-primary">
        <Footer />
    </div>
</template>

<script>
import booksjson from '@/assets/json/books.json'
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
    name: 'Home',
    data() {
        return {
            books: booksjson,
            shopbooks:[],
            totalBook:[],
        }
    },
    // computed: {
    //     ...mapState({
    //         shopbooks: (state) => state.shopcar.shopbooks,
    //     })
    // },
    methods: {
        fatherMethod(type) {
            console.log(type);
            if(type == 0) {
                this.books = this.totalBook
            } else {
                this.books = this.totalBook.filter(n => n.type == type)
            }

        },
        searchEvent(data) {
            this.books = booksjson
            let search = this.books.filter(n => n.name == data)
            if (!search[0]) {
                ElMessage({
                    message: '未找到相关书籍！',
                    type: 'warning',
                    offset: 80
                })
            } else {
                this.books = search
            }

        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('shopbooks')) && JSON.parse(localStorage.getItem('shopbooks')).length > 0) {
            this.shopbooks = JSON.parse(localStorage.getItem('shopbooks'))
        }
        if (this.shopbooks.length > 0 && this.books.length > 0) {
            const newdata = this.books.filter(n => this.shopbooks.every((val) => val.id != n.id))
            this.books = [...this.shopbooks, ...newdata]
        }
        var arr2 = this.books.filter(n => this.shopbooks.every((val) => val.id != n.id))
        var arr1 = JSON.parse(localStorage.getItem('shopbooks')) || []
        console.log(arr1);
        this.books = [...arr2, ...arr1]
        this.totalBook = this.books
        console.log(this.books);
    },
    mounted() {
        // if(JSON.parse(localStorage.getItem('shopbooks')).length > 0) {
        //     this.shopbooks = JSON.parse(localStorage.getItem('shopbooks'))
        // }

    },  
}
</script>

<style lang="scss">
body {
    background-color: #cacaca55;
}

.footer-box {
    height: 40px;
    line-height: 40px;
    color: #ffffff;
}

.content-slot {
    width: 100%;
    min-height: 330px;
    gap: 30px;
}
</style>
