<template>
<div class="order-page d-flex flex-column align-items-center container py-3">
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive-md mb-3 w-100">
        <table class="table table-borderless text-dark mb-3">
            <thead>
                <tr class="bg-primary">
                    <th scope="col"></th>
                    <th scope="col">訂單編號</th>
                    <th scope="col">訂單內容</th>
                    <th scope="col">總金額</th>
                    <th scope="col">付款狀態</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                    <th scope="row">#{{ (pagination.current_page - 1) * 10 + (index + 1) }}</th>
                    <td><a class="orderDetail" href="#" @click.prevent="orderDetail(order.id)">{{ order.id}}</a></td>
                    <td><h6 v-for="(product, id) in order.products" :key="id">{{ product.product.title }} *{{ product.qty }}</h6></td>
                    <td>{{ order.total }}</td>
                    <td v-if="order.is_paid">付款完成</td>
                    <td v-else>尚未付款</td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :pages="pagination" @updatePage="getOrders"></Pagination>
</div>
</template>

<script>
import Pagination from '../components/Pagination';

export default {
    data() {
        return {
            isLoading: false,
            orders: [],
            pagination: {},
        }
    },
    components: {
        Pagination
    },
    created() {
        this.getOrders();
    },
    methods: {
        getOrders(page = 1) {
            const vm = this;
            const url = `https://vue-course-api.herokuapp.com/api/lightup/orders?page=${page}`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                if(response.data.success) {
                    vm.orders = response.data.orders;
                    vm.pagination = response.data.pagination;
                    vm.isLoading = false;
                }
            })
        },
        orderDetail(id) {
            const vm = this;
            vm.$router.push(`/payment/${id}`);
        }
    }
}
</script>

<style scoped lang="scss">
.order-page {
    min-height: calc(100vh - 50px);
    margin-top: 76px;
}
.orderDetail {
    color: darken($color: #e8e468, $amount: 10);
    &:hover {
        color: darken($color: #e8e468, $amount: 20);
    }
}
table {
    min-width: 700px;
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