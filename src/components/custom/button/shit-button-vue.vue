<template>
    <button @click="bttnClicked">fukin button</button>
</template>
<script>
    export default {
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        data: function () {
            return {
                dMsg: this.msg
            }
        },
        computed: {
            msgComp: function () {
                return this.dMsg + "; NODE_ENV in shit-button: " + process.env.NODE_ENV
            }
        },
        methods: {
            bttnClicked: function () {
                alert(this.msgComp);
            }
        }
    }
</script>