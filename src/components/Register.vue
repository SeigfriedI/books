<template>
    <div class="c-white m-t-60">
        <h1 class="m-40">注册</h1>
        <div class="m-t-48 m-l-40 m-r-60">
            <el-form :model="form" ref="form" :rules="rules" label-width="50px" class="form-box">
                <el-form-item label="账号" size="large" prop="name">
                    <el-input v-model="form.name" size="large" maxlength="20" clearable placeholder="请输入账号/手机号/邮箱" />
                </el-form-item>
                <el-form-item label="密码" size="large" prop="pass">
                    <el-input v-model="form.pass" size="large" maxlength="20" type="password" show-password clearable placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="确认" size="large" prop="ck_pass">
                    <el-input v-model="form.ck_pass" size="large" maxlength="20" type="password" show-password clearable placeholder="请确认密码" />
                </el-form-item>
                <el-form-item>
                    <slot name="cut"></slot>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" size="large" style="width: 100%" @click="onSubmit('form')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<!-- 
    这是一个名为 Register 的 Vue.js 组件，用于用户注册页面的表单验证和提交。组件使用了 Element Plus 中的 ElMessage 组件来显示注册成功的消息。以下是这个组件的关键点：

    Data：定义了表单数据 form 和表单验证规则 rules。

    form 包含了账号名 name、密码 pass、确认密码 ck_pass。
    rules 定义了各字段的验证规则，包括必填项和密码确认。
    Methods：

    validatePass2(rule, value, callback)：自定义验证方法，用于验证确认密码与密码是否一致。
    onSubmit(formName)：表单提交方法，先进行表单验证，验证通过后显示注册成功消息，并触发 success 事件。
 -->
<script>
import { ElMessage } from 'element-plus'

export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: '',
                pass: '',
                ck_pass: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '账号不能为空',
                        trigger: 'change'
                    }
                ],
                pass: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'change'
                    }
                ],
                ck_pass: [
                    {
                        required: true,
                        validator: this.validatePass2,
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    methods: {
        validatePass2(rule, value, callback) {
            if (value === '') {
                callback(new Error('确认密码不能为空'))
            } else if (value !== this.form.pass) {
                callback(new Error('2次输入的密码不同！请重新输入'))
            } else {
                callback()
            }
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    ElMessage({
                        message: '注册成功！',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.$emit('success', true)
                        }
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.form-box :deep(.el-form-item__label) {
    color: white;
}
</style>
