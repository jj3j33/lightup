<template>
<div class="itemInCart d-flex flex-column align-items-center text-dark container">
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive-md w-100 m-3" v-if="cart.carts.length != 0">
        <table class="table table-borderless text-dark">
            <thead>
                <tr class="bg-primary">
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">商品名稱</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
                <th></th>
                </tr>
            </thead>
            <transition-group name="fade" tag="tbody">
                <tr v-for="(item, index) in cart.carts" :key="item.id">
                    <th scope="row">#{{ index+1 }}</th>
                    <td><img class="item-img" :src="item.product.image"></td>
                    <td>{{ item.product.title }}</td>
                    <td>${{ item.product.price }}</td>
                    <td>{{ item.qty }}</td>
                    <td>${{ item.final_total }}</td>
                    <td @click="removeItem(item.id)"><img class="delete-img" src="../assets/images/delete_icon.png"></td>
                </tr>
            </transition-group>
        </table>
    </div>
    <div class="total mb-5" v-if="cart.carts.length != 0">
        <h4>總計 ${{ cart.total }}</h4>
        <h4 v-if="cart.total != cart.final_total" class="text-danger">折扣價 ${{ cart.final_total }}</h4>
    </div>
    <div class="input-group mb-5" v-if="cart.carts.length != 0">
        <input type="text" class="form-control coupon-input" placeholder="輸入優惠券" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="coupon">
        <div class="input-group-append">
            <button class="btn btn-primary text-dark" type="button" id="button-addon2" @click="addCoupon">套用優惠券</button>
        </div>
    </div>
    <h5 v-else class="m-5">購物車目前是空的！</h5>
    <router-link to="/checkout" class="btn btn-primary button text-dark mb-5" v-if="cart.carts.length != 0">結帳去～</router-link>
    <router-link to="/items" class="btn btn-primary button text-dark" v-else>繼續逛逛<i class="fas fa-shopping-bag ml-1"></i></router-link>
    
</div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            cart: {
                carts: []
            },
            coupon: ''
        }
    },
    created() {
        this.getCart();
    },
    methods: {
        getCart() {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/cart';
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.cart = response.data.data;
                vm.isLoading = false;
            });
        },
        removeItem(id) {
            const vm = this;
            const url = `https://vue-course-api.herokuapp.com/api/lightup/cart/${id}`;
            this.$http.delete(url).then((response) => {
                if(response.data.success) {
                    vm.$bus.$emit('updateCart');
                    vm.$bus.$emit('message: push', response.data.message, 'warning');
                    vm.getCart();
                }
            });
        },
        addCoupon() {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/coupon';
            const coupon = {
                code: vm.coupon
            };
            this.$http.post(url, {data: coupon}).then((response) => {
                vm.getCart();
                vm.$bus.$emit('message: push', response.data.message, 'warning');
            });
        }
    }
}
</script>

<style scoped lang="scss">
.itemInCart {
    min-height: calc(100vh - 50px);
    padding-top: 76px;
}
.item-img {
    width: 125px;
    height: 100px;
    object-fit: cover;
}
.delete-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
table {
    min-width: 700px;
}
tbody {
    th, td {
        line-height: 100px;
    }
}
.input-group {
    width: 300px;
}
.coupon-input {
    border: none;
}
.button {
    width: 120px;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

::-webkit-scrollbar {
    height: 10px;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: #e8e468;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: darken($color: #e8e468, $amount: 10);
}
</style>