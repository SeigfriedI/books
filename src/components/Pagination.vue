<template>
    <div>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :small="true"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['total'],
    watch: {
        total: {
            handler(newVal) {
                this.Total = newVal
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            pageSize: 10,
            currentPage: 1,

            Total: 40
        }
    }
}
</script>

<style scoped lang="scss"></style>
