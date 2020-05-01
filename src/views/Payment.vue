<template>
<div class="itemInCart d-flex flex-column align-items-center text-dark container">
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive-md w-100 m-3">
        <table class="items table table-borderless text-dark">
            <thead>
                <tr class="bg-primary">
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">商品名稱</th>
                    <th scope="col">單價</th>
                    <th scope="col">數量</th>
                    <th scope="col">小計</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key, index) in order.products" :key="item.id">
                    <th scope="row">#{{ index+1 }}</th>
                    <td><img class="item-img" :src="item.product.image"></td>
                    <td>{{ item.product.title }}</td>
                    <td>${{ item.product.price }}</td>
                    <td>{{ item.qty }}</td>
                    <td>${{ item.final_total }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="total mb-5">
        <h4>總計 ${{ order.total }}</h4>
    </div>
    <ol class="list d-flex justify-content-between p-0 mb-5">
        <li class="d-flex flex-column justify-content-center align-items-center active">
            <i class="fas fa-file-alt" aria-hidden="true"></i>
            <span>填寫資料</span>
        </li>
        <li class="d-flex flex-column justify-content-center align-items-center active">
            <i class="fas fa-money-check-alt" aria-hidden="true"></i>
            <span>確認付款</span>
        </li>
        <li class="d-flex flex-column justify-content-center align-items-center" :class="{'active': order.is_paid}">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            <span>完成訂單</span>
        </li>
    </ol>
    <div class="text-dark d-flex flex-column align-items-center mb-5">
        <h3 class="mb-3">收件人資訊</h3>
        <table class="table table-borderless text-dark payment">
            <tbody>
                <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                    <th>電話</th>
                    <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                    <th>地址</th>
                    <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                    <th>付款狀態</th>
                    <td v-if="!order.is_paid" class="text-danger">尚未付款</td>
                    <td v-else class="text-success">付款完成</td>
                </tr>
            </tbody>
        </table>
        <button v-if="!order.is_paid" class="btn btn-primary text-dark" @click="payOrder">付款去～</button>
        <router-link v-else to="/items"><button class="btn btn-primary text-dark">繼續逛逛<i class="fas fa-shopping-bag ml-1"></i></button></router-link>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            orderID: '',
            order: {
                user: {}
            }
        }
    },
    created() {
        const vm = this;
        vm.orderID = vm.$route.params.id;
        vm.getOrder();
    },
    methods: {
        getOrder() {
            const vm = this;
            const url = `https://vue-course-api.herokuapp.com/api/lightup/order/${vm.orderID}`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                if(response.data.success) {
                    vm.order = response.data.order;
                    vm.isLoading = false;
                }
            });
        },
        payOrder() {
            const vm = this;
            const url = `https://vue-course-api.herokuapp.com/api/lightup/pay/${vm.orderID}`;
            this.$http.post(url).then((response) => {
                if(response.data.success) {
                    vm.getOrder();
                }
            })
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
.list {
    width: 400px;
    li {
        list-style: none;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 0 5px darken($color: #e8e468, $amount: 10);
        &+li::before {
            content: '';
            width: 50px;
            height: 15px;
            position: absolute;
            left: -50px;
            top: 0;
            bottom: 0;
            margin: auto;
            background-color: #f1eeb1;
            border-top: 5px solid darken($color: #e8e468, $amount: 10);
            border-bottom: 5px solid darken($color: #e8e468, $amount: 10);
        }
        &.active {
            background-color: #e8e468;
            &::before {
                background-color: #e8e468;
            }
        }
    }
}
table.items {
    min-width: 700px;
}
tbody {
    th, td {
        line-height: 100px;
    }
}
.payment {
    th, td {
        padding: 0 10px;
        line-height: 50px;
    }
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