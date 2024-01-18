<template>
    <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="车牌号码">
            <el-input v-model="query.carNumber" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="车主姓名">
            <el-input v-model="query.personName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="query.cardStatus" placeholder="Activity zone" clearable>
                <el-option label="全部"  />
                <el-option label="有效" value="0" />
                <el-option label="失效" value="1" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>

    <div class="btn">
        <el-button type="primary" @click="add">添加月卡</el-button>
        <el-button>批量删除</el-button>
    </div>
    <el-table :data="tableData">
        <el-table-column prop="cardStatus" label="状态">
            <template #default="scope">
                <input type="checkbox" :checked="scope.row.cardStatus == 0 ? false : true">
            </template>
        </el-table-column>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="personName" label="车主名称" />
        <el-table-column prop="phoneNumber" label="联系方式" />
        <el-table-column prop="carNumber" label="车牌号码" />
        <el-table-column prop="carBrand" label="车辆品牌" />
        <el-table-column prop="totalEffectiveDate" label="剩余有效天数" />
        <el-table-column prop="cardStatus" label="状态">
            <template #default="scope">
                <span v-if="scope.row.cardStatus == 0">有效</span>
                <span v-else>无效</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <a href="#">续费</a>
                <a href="#">查看</a>
                <a href="#" @click="bj(scope.row)">编辑</a>
                <a href="#" @click="del(scope.row)">删除</a>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="query.page" v-model:page-size="query.pageSize" :page-sizes="[1, 3, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleSizeChange" />
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getCardList, delCard } from '@/api/index'
import { useRouter } from "vue-router";

const tableData = ref([]);

const query = reactive({
    page: '1',
    pageSize: '5',
    carNumber: '',//车牌号
    personName: '',//姓名
    cardStatus: '',//状态
})

const total = ref(0)

const getDate = () => {
    getCardList(query).then(res => {
        console.log(res);
        total.value = res.data.total
        tableData.value = res.data.rows
    })
}

getDate()

const handleSizeChange = (val: number) => {
    //   console.log(`${val} items per page`)
    getDate()
}

const del = (row: any) => {
    console.log(row.id);
    const ids = row.id
    delCard({ ids }).then(res => {
        console.log(res);
        getDate()
    })
}



const onSubmit = () => {
  console.log('submit!')
  getDate()
}

const router = useRouter()

const add = () =>{
    router.push('/add')
}

const bj = (row: any) =>{
    console.log(row);
    router.push({path:'/add',query:{id:row.id}})
}
</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>