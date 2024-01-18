<template>
    <el-page-header @back="goBack"
        style="position: fixed; top: 0; left: 0; background-color: white; width: 100vw; padding: 20px 0;" title="返回">
        <template #content>
            <span class="text-large font-600 mr-3"> 新增月卡 </span>
        </template>
    </el-page-header>
    <div class="big">
        <div class="box1">
            <h3>车辆信息</h3>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon
                inline="true">
                <el-form-item label="车主姓名" prop="personName">
                    <el-input v-model="ruleForm.personName" style="width: 400px;" />
                </el-form-item>
                <el-form-item label="联系方式" prop="phoneNumber">
                    <el-input v-model="ruleForm.phoneNumber" style="width: 400px;" />
                </el-form-item>
                <el-form-item label="车牌号码" prop="carNumber">
                    <el-input v-model="ruleForm.carNumber" style="width: 400px;" />
                </el-form-item>
                <el-form-item label="车牌品牌" prop="carBrand">
                    <el-input v-model="ruleForm.carBrand" style="width: 400px;" />
                </el-form-item>


            </el-form>
        </div>
        <div class="box2">
            <h3>最新一次月卡缴费信息</h3>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon
                inline="true">
                <el-form-item label="有效日期">
                    <el-date-picker v-model="value1" type="daterange" range-separator="To" start-placeholder="Start date"
                        end-placeholder="End date" :size="size" @change="change" />
                </el-form-item>

                <el-form-item label="支付金额" prop="paymentAmount">
                    <el-input v-model="ruleForm.paymentAmount" style="width: 400px;" />
                </el-form-item>
                <el-form-item label="支付方式" prop="paymentMethod">
                    <el-select v-model="ruleForm.paymentMethod" class="m-2" placeholder="Select" style="width: 240px">
                        <el-option label="支付宝" value="Alipay" />
                        <el-option label="微信" value="WeChat" />
                        <el-option label="线下" value="Cash" />
                    </el-select>
                </el-form-item>

            </el-form>
        </div>
       <div class="ann" style="margin-left: 45%;">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
            确定
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
       </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {addCard,getCardInfo,editCard} from '@/api/index'

const goBack = () => {
    // 返回上一页
    history.back();
}

const route = useRoute();

// console.log(route.query.id);

let id = ref('')
id.value = route.query.id as string;



const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from "vue-router";

interface RuleForm {
    personName: string;
    phoneNumber: string;
    carNumber: string;
    carBrand: string;
    cardStartDate: string;
    cardEndDate: string;
    paymentAmount: string;
    paymentMethod: string;
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    personName: '',
    phoneNumber: '',
    carNumber: '',
    carBrand: '',
    cardStartDate: '',
    cardEndDate: '',
    paymentAmount: '',
    paymentMethod: '',
})

const hui = () =>{
    if(id.value == ''){
        return false
    }else{
        getCardInfo({id:id.value}).then(res=>{
            console.log(res);
            ruleForm.carBrand=res.data.carBrand
            ruleForm.cardEndDate=res.data.cardEndDate
            // ruleForm.cardStartDate=res.data.cardStartDate
            value1['value']=res.data.cardStartDate
            ruleForm.carNumber=res.data.carNumber
            ruleForm.paymentAmount=res.data.paymentAmount
            ruleForm.paymentMethod=res.data.paymentMethod
            ruleForm.personName=res.data.personName
            ruleForm.phoneNumber=res.data.phoneNumber
            id.value=res.data.id
        })
    }
}

hui()

const rules = reactive<FormRules<RuleForm>>({
    personName: [
        { required: true, message: '请输入车主姓名', trigger: 'blur' },
        { min: 3, max: 5, message: '长度应该在3-5位', trigger: 'blur' },
    ],

    phoneNumber: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
        { min: 3, max: 12, message: '长度应该在3-12位', trigger: 'blur' },
    ],
    carNumber: [
        { required: true, message: '请输入车牌号码', trigger: 'blur' },
        { min: 7, max: 7, message: '长度应该在7位', trigger: 'blur' },
    ],
    carBrand: [
        { required: true, message: '请输入车量品牌', trigger: 'blur' },
        { min: 3, max: 10, message: '长度应该在3-10位', trigger: 'blur' },
    ],
    paymentAmount: [
        { required: true, message: '请输入支付金额', trigger: 'blur' },
        { min: 3, max: 10, message: '长度应该在3-10位', trigger: 'blur' },
    ],
    paymentMethod: [
        { required: true, message: '请选择支付方式', trigger: 'blur' },
    ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            addCard(ruleForm).then(res=>{
                console.log(res);
                
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const change = (value: string) => {

    console.log(value);
    ruleForm.cardStartDate = value[0]
    ruleForm.cardEndDate = value[1]
}
</script>

<style lang="scss" scoped>
.big {
    width: 100vw;
    height: 100vh;
    background-color: #f4f6f8;
}

.box1,
.box2 {
    background-color: white;
    width: 80%;
    height: 200px;
}

.box1 {
    margin: 100px auto;
}

.box2 {
    margin: 100px auto;
}
</style>