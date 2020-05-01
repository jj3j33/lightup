<template>
<div class="container p-5 d-flex flex-column align-items-center">
    <div class="logo mb-3">
        <router-link to="/"><img src="../assets/images/lightup_logo.png"></router-link>
    </div>
    <form class="d-flex flex-column align-items-center text-dark" @submit.prevent="signin">
        <h4>後台管理</h4>
        <input type="email" class="form-control my-3" v-model="user.username" placeholder="Email" required>
        <input type="password" class="form-control my-3" v-model="user.password" placeholder="Password" required>
        <button class="btn btn-primary text-dark my-3" type="submit">登入</button>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        signin() {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/admin/signin';
            this.$http.post(url, vm.user).then((response) => {
                // console.log(response);
                if(response.data.success) {
                    vm.$router.push('/admin/coupons');
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.logo {
    width: 160px;
    height: 100px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>