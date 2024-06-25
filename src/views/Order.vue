<template>
    <div>
        <el-affix :offset="0">
            <Header :active="'/shopping'" />
        </el-affix>
    </div>
    <div style="padding: 0 10%">
        <div class="bg-white p-20" style="text-align: left; min-height: 80vh">
            <div class="m-b-20">
                <span>我的订单</span>
            </div>
            <el-table :data="orderList" border style="width: 100%" :header-cell-style="{ background: '#F5F7FA', color: '#666' }" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column prop="image" label="书籍" width="140">
                    <template #default="scope">
                        <div>
                            <el-image
                                style="width: 100px"
                                :src="require('@/assets/imgs/cardbooks/' + scope.row.image + '')"
                                :preview-src-list="[require('@/assets/imgs/cardbooks/' + scope.row.image + '')]"
                                :z-index="9999"
                                hide-on-click-modal
                                preview-teleported
                                close-on-press-escape
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="shopinfo" label="书籍简介" width="180">
                    <template #default="scope">
                        <div>
                            <div>
                                <span>书名：</span><span>{{ scope.row.name }}</span>
                            </div>
                            <div>
                                <span>作者：</span><span>{{ scope.row.auth }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="单价" min-width="120">
                    <template #default="scope">
                        <div>
                            <span>￥{{ scope.row.price }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="数量" min-width="180">
                    <template #default="scope">
                        <div>
                            {{ scope.row.num }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sum" label="小计" min-width="120">
                    <template #default="scope">
                        <div>￥{{ parseFloat((parseInt(scope.row.price * 100) / 100) * scope.row.num).toFixed(2) }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作" min-width="140">
                    <template #default="scope">
                        <div>
                            <el-button type="danger" icon="Delete" @click="delEvent(scope.$index)">删除订单</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 加弹出框-显示详情 -->
            <div>
                <Dialog :dialog="dialogVisible" :title="taninfo.Name" v-on:handleClose="handleClose">
                    <template v-slot:content>
                        <div>
                            <Details :image="taninfo.Image" :name="taninfo.Name" :auth="taninfo.Auth" :price="taninfo.Price" :number="'20'" />
                        </div>
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
    <div class="footer-box f-12 bg-primary">
        <Footer />
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Shopping',
    data() {
        return {
            number: 0,
            money: '0.00',
            selectiondata: [],

            dialogVisible: false,
            taninfo: {
                Name: '',
                Image: '',
                Auth: '',
                Price: ''
            },
            orderList:[],
            orderNum:0,
        }
    },
    mounted() {
        this.orderList = localStorage.getItem('orderList') ? JSON.parse(localStorage.getItem('orderList')) : []
        this.orderNum = this.orderList.length
    },
    methods: {
        shopInfoEvent(data) {
            this.taninfo = {
                Name: data.name,
                Image: data.image,
                Auth: data.auth,
                Price: data.price
            }

            this.dialogVisible = true
        },
        handleClose(done) {
            done()
            this.dialogVisible = false
        },
        delEvent(index) {
            this.orderList.splice(index, 1)
            localStorage.setItem('orderList', JSON.stringify(this.orderList))
            // this.shopbooks.splice(index, 1)
            // this.$store.dispatch('shopcar/revise_shopnum', this.shopbooks.length)
            // this.$store.dispatch('shopcar/revise_shopbooks', this.shopbooks)
        },
        handleChange(num, data) {
            if (this.selectiondata.length > 0) {
                this.selectiondata.map((n) => {
                    if (n.id == data.id) {
                        n = data
                    }

                    return n
                })

                this.handleSelectionChange(this.selectiondata)
            }
        },

        handleSelectionChange(data) {
            this.selectiondata = data

            if (data.length > 0) {
                this.number = eval(
                    data
                        .map((n) => {
                            return n.num
                        })
                        .join('+')
                )

                this.money = eval(
                    data
                        .map((n) => {
                            return parseFloat((parseInt(n.price * 100) / 100) * n.num).toFixed(2)
                        })
                        .join('+')
                ).toFixed(2)
            } else {
                this.number = 0
                this.money = '0.00'
            }
        }
    }
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

.end-sum {
    gap: 40px;
}
</style>
