<template>
    <div>
        <div :class="bgDiv">
            <div>1</div>
            <div>2</div>
        </div>
        <span :class="mbriHearth"></span>
        <button @click="bttnClicked">test</button>
        <ShitButton :msg="propMsgForCom" />
    </div>
</template>

<script>
    import ShitButton from "com-btn/shit-button-vue" // 这里com-btn是打包配置中的别名

    export default {
        components: {
            ShitButton
        },
        data: function () {
            return {
                useBgDiv: true,
                useMbriHearth: true,
                isTest: true,
                currentNodeEnv: process.env.NODE_ENV
            }
        },
        computed: {
            bgDiv: function () {
                return {
                    "bg-div": this.useBgDiv
                }
            },
            mbriHearth: function () {
                return {
                    "mbri-hearth": this.useMbriHearth
                }
            },
            bttnTxt: function () {
                return isTest ? "test" : "(empty)"
            },
            propMsgForCom: function () {
                return "NODE_ENV in app.js: " + this.currentNodeEnv
            }
        },
        methods: {
            bttnClicked: function () {
                var {
                    a: x,
                    b: y
                } = {
                    a: "ctm",
                    b: "的"
                }; // 解构无声明赋值（及变量重命名，严格模式）
                alert(x + y);
            }
        }
    }
</script>
<style>
    @import "./assets/css/base.css";
    @import "./assets/css/addon-index.css";
    @import "./assets/fonts/mobiriseicons.css";
</style>