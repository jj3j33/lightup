<template>
<div class="item-detail text-dark container-fluid">
    <loading :active.sync="isLoading"></loading>
    <div class="item-content d-flex justify-content-center align-items-center m-3">
        <div class="image text-right m-3">
            <router-link to="/items" class="btn btn-primary">←</router-link>
            <img :src="item.image">
        </div>
        <div class="m-3">
            <div class="info d-flex flex-column justify-content-around">
                <h3>{{ item.title }}</h3>
                <h5><span class="badge badge-primary">#{{ item.category }}</span></h5>
                <div class="d-flex justify-content-between">
                    <h5><s>原價${{ item.origin_price }}</s></h5>
                    <h4 class="text-danger">特價${{ item.price }}</h4>
                </div>
                <div class="d-flex align-self-end align-items-center">
                    <select v-model="amount" class="form-control">
                        <option v-for="num in 10" :key="num" :value="num">{{ num }}</option>
                    </select>
                    <h5 class="m-0">{{ item.unit }}</h5>
                </div>
                <h4 class="align-self-end">小計${{ item.price * amount }}</h4>
                <a class="btn btn-primary py-2" @click="addToCart(item.id, amount)">加入購物車</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            itemID: '',
            item: {},
            amount: 1,
        }
    },
    created() {
        const vm = this;
        vm.itemID = vm.$route.params.id;
        vm.getItem(vm.itemID);
    },
    methods: {
        getItem(id) {
            const vm = this;
            const url = `https://vue-course-api.herokuapp.com/api/lightup/product/${id}`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.item = response.data.product;
                vm.isLoading = false;
            });
        },
        addToCart(id, amount) {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/cart';
            const cart = {
                product_id: id,
                qty: amount
            };
            this.$http.post(url, {data: cart}).then((response) => {
                if(response.data.success) {
                    vm.$bus.$emit('updateCart');
                    vm.$bus.$emit('message: push', response.data.message, 'warning');
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.item-detail {
    min-height: calc(100vh - 50px);
    padding-top: 76px;
    .image {
        width: 450px;
        height: 400px;
        position: relative;
        a.btn {
            position: absolute;
            left: 0;
            top: 0;
        }
        img {
            width: 400px;
            height: 350px;
            object-fit: cover;
        }
        &::before {
            content: '';
            width: 400px;
            height: 350px;
            border: 3px solid rgba(#e8e468, .5);
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: -1;
        }
    }
    .info {
        height: 300px;
        select {
            width: 80px;
        }
    }
}

@media (max-width: 992px) {
.item-content {
    flex-direction: column;
}
}
</style>