<template>
    <div class="box">
        <div class="login">
          <div class="ss">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules"  class="demo-ruleForm"
                :size="formSize" status-icon>
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" />
                </el-form-item>
             
            
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 80%; margin-left: 20%;">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {   type FormInstance, type FormRules } from 'element-plus'
import {loginApi} from '@/api/index'
import { useRouter } from "vue-router";

interface RuleForm {
    username: string
    password: string
}

const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: 'demo',
    password: 'zh@hm#23',
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 8, message: '账号长度在3-8位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 8, message: '密码长度在3-8位', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
           if(ruleForm.username=='demo'&&ruleForm.password=='zh@hm#23'){
               loginApi(ruleForm).then(res=>{
                   console.log(res)
                   localStorage.setItem('token',res.data.token)
                   ElMessage.success('登录成功')
                   router.push('/index')
               })
           }else{
                ElMessage.error('账号或密码错误')
           }
        } else {
            console.log('error submit!', fields)
        }
    })
}


</script>

<style lang="scss" scoped>
.box {
    width: 100vw;
    height: 100vh;
    background-color: #ccc;

    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100vh;
        background-color: white;
        margin-left: 50%;
        .ss{
            width: 300px;
        }
    }
}
</style>