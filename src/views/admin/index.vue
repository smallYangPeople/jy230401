<template>
    <el-container>
        <el-aside width="200px">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
                text-color="#fff" router>
                <el-sub-menu :index="index" v-for="item,index in list">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="ite.title" v-for="ite,ind in item.children" @click="go(ite.title)">{{ ite.title }}</el-menu-item>

                    </el-menu-item-group>

                </el-sub-menu>



            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-button @click="logout" size="small" style="margin-left: 80vw;" type="primary">退出</el-button>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {getMenuList} from '@/api/index'
import { useRouter } from "vue-router";


const list = ref([])

getMenuList().then(res=>{
    console.log(res);
    list.value = res.data
})

const router = useRouter()

const logout = () => {
    localStorage.removeItem("token")
    ElMessage.success("退出成功")
    router.push("/")
}

const go = (title: string) => {
    if(title == "月卡管理"){
        // console.log(1);
        router.push("/card")
    }else if(title == "企业管理"){
        router.push("/qiye")
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100vh;
    width: 100vw;
    .el-aside {
        height: 100vh;
        background-color: gold;
    }
}
</style>