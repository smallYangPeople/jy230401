<template>
  
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {getqylist} from '@/api/index'

const query = reactive({
    name:'',
    page:1,
    pageSize:10
})

const list = ref([])

getqylist(query).then(res=>{
    console.log(res);
    list.value = res.data.row.list
})
</script>

<style lang="scss" scoped></style>