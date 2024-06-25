<template>
    <div class="login-box flex-c flex-jc-c flex-ai-c" style="height: 100vh">
        <div class="flex-r flex-jc-c flex-ai-c" style="position: absolute; width: 100%">
            <div class="flex-c flex-jc-c" style="width: 50%">
                <div class="model-box brd-4" :class="modelactive">
                    <div class="p-20">
                        <SignIn v-if="modelactive == 'model-denglu'">
                            <template v-slot:cut>
                                <div class="f-12"><span>没有账号？</span><span class="model-button-a"
                                        @click="modelactive = 'model-zhuce'">立即注册</span></div>
                            </template>
                        </SignIn>
                        <Register v-else v-on:success="successEvent">
                            <template v-slot:cut>
                                <div class="f-12"><span>想起来了？</span><span class="model-button-a"
                                        @click="modelactive = 'model-denglu'">直接登录</span></div>
                            </template>
                        </Register>
                    </div>
                </div>
                <div class="bg-white brd-4 flex-r flex-jc-sb flex-ai-c login-bg-card">
                    <div class="w-50" :class="modelactive == 'model-denglu' ? 'images-out' : 'images-in'">
                        <!-- <el-image style="width: 90%" :src="require('@/assets/imgs/login-dl-amico.png')" /> -->
                        <div class="f-12 c-gray">
                            <Footer />
                        </div>
                    </div>
                    <div class="w-50" :class="modelactive == 'model-zhuce' ? 'images-out' : 'images-in'">
                        <!-- <el-image style="width: 90%" :src="require('@/assets/imgs/login-zc-pana.png')" /> -->
                        <div class="f-12 c-gray">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'animate.css'

export default {
    data() {
        return {
            modelactive: 'model-denglu'
        }
    },
    methods: {
        successEvent(data) {
            this.modelactive = 'model-denglu'
        }
    }
}
</script>
<style lang="scss">
.login-box {
    background-image: linear-gradient(#9198e5, #BB16C9);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #46464609;
}

.model-box {
    background-color: #407bff;
    height: 600px;
    width: 400px;
    z-index: 2000;
}

.model-denglu {
    position: relative;
    left: calc(0px + 40px);
    transition: left 1s;
    -webkit-transition: left 1s;
}

.model-zhuce {
    position: relative;
    left: calc(480px + 40px);
    transition: left 1s;
    -webkit-transition: left 1s;
}

.images-in {
    animation: zoomIn;
    animation-duration: 1s;
}

.images-out {
    animation: zoomOut;
    animation-duration: 1s;
}

.login-bg-card {
    height: 560px;
    width: 960px;
    min-width: 400px;
    position: absolute;
}

.model-button-a:hover {
    cursor: pointer;
    color: #ffe600;
}
</style>
