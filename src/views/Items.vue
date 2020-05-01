<template>
<div class="items-page text-dark row container-fluid my-3">
    <loading :active.sync="isLoading"></loading>
    <div class="list-menu col-lg-3 col-md-12">
        <ul class="text-center mx-auto my-3 p-0">
            <li @click="filter='所有商品'" :class="{active: filter=='所有商品'}">所有商品</li>
            <li @click="filter='店長推薦'" :class="{active: filter=='店長推薦'}">店長推薦</li>
            <li @click="filter='熱銷好評'" :class="{active: filter=='熱銷好評'}">熱銷好評</li>
            <li @click="filter='折扣優惠'" :class="{active: filter=='折扣優惠'}">折扣優惠</li>
        </ul>
    </div>
    <div class="items col-lg-9 col-md-12">
        <div class="items-content row">
            <div class="px-3 my-3 col-md-4 col-sm-6 col-12" v-for="item in filteredItems" :key="item.id">
                <div class="card">
                    <Card :item="item"></Card>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
    components: {
        Card
    },
    data() {
        return {
            isLoading: false,
            items: [],
            filter: '所有商品'
        }
    },
    created() {
        const vm = this;
        vm.getItems();
    },
    methods: {
        getItems() {
            const vm = this;
            // const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/products/all';
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.items = response.data.products;
                vm.isLoading = false;
            })
        }
    },
    computed: {
        filteredItems() {
            const vm = this;
            return vm.items.filter( (item) => {
                if(vm.filter == '所有商品') {
                    return true
                }
                if(item.category == vm.filter) {
                    return true
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.items-page {
    min-height: calc(100vh - 50px);
    padding-top: 76px;
}
.list-menu {
    ul {
        li {
            list-style: none;
            font-size: 16px;
            padding: 10px 10px;
            margin: 15px 10px;
            background-color: #e8e468;
            cursor: pointer;
            transition: .5s;
            &:hover {
                background-color: darken($color: #e8e468, $amount: 10);
            }
            &.active {
                background-color: darken($color: #e8e468, $amount: 10);
            }
        }
    }
}
.items {
    .card {
        height: 420px;
        border: none;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, .3);
        font-size: 16px;
    }
}

@media (max-width: 992px) {
    .list-menu {
        ul {
            display: flex;
            justify-content: center;
        }
    }
}
</style>