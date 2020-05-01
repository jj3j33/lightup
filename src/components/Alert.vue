<template>
<div class="alertMessage">
    <div class="alert alert-primary alert-dismissible fade show" role="alert" v-for="(message, i) in messages" :key="i">
        {{ message.message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            messages: []
        }
    },
    created() {
        const vm = this;
        vm.$bus.$on('message: push', (message, status = 'warning') => {
            vm.updateAlert(message, status);
        })
    },
    methods: {
        updateAlert(message, status) {
            const timeStamp = Math.floor(new Date() / 1000);
            this.messages.push({
                message,
                status,
                timeStamp
            });
            this.removeAlertWithTiming(timeStamp);
        },
        removeAlertWithTiming(timeStamp) {
            const vm = this;
            setTimeout(() => {
                vm.messages.forEach((message, i) => {
                    if(message.timeStamp === timeStamp) {
                        vm.messages.splice(i, 1);
                    }
                });
            }, 2000);
        }
    }
}
</script>

<style scoped lang="scss">
.alertMessage {
    position: fixed;
    top: 86px;
    right: 10px;
    z-index: 1100;
}
</style>