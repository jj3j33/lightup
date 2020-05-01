<template>
<div>
</div>
</template>

<script>
export default {
    data() {
        return {
            // coupons: {},
        }
    },
    created() {
        this.getCoupons();
    },
    methods: {
        getCoupons() {
            // const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/admin/coupons';
            this.$http.get(url).then((response) => {
                console.log(response);
                // vm.coupons = response.data.coupons;
            });
        }
    }
}
</script>

<style scoped lang="scss">

</style>