<template>
<div class="itemInCart d-flex flex-column align-items-center text-dark container">
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive-md w-100 m-3">
        <table class="table table-borderless text-dark">
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
                <tr v-for="(item, index) in cart.carts" :key="item.id">
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
    <div class="total mb-5" v-if="cart.carts.length != 0">
        <h4>總計 ${{ cart.total }}</h4>
        <h4 v-if="cart.total != cart.final_total" class="text-danger">折扣價 ${{ cart.final_total }}</h4>
    </div>
    <ol class="list d-flex justify-content-between p-0 mb-5">
        <li class="d-flex flex-column justify-content-center align-items-center active">
            <i class="fas fa-file-alt" aria-hidden="true"></i>
            <span>填寫資料</span>
        </li>
        <li class="d-flex flex-column justify-content-center align-items-center">
            <i class="fas fa-money-check-alt" aria-hidden="true"></i>
            <span>確認付款</span>
        </li>
        <li class="d-flex flex-column justify-content-center align-items-center">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
            <span>完成訂單</span>
        </li>
    </ol>
    <div class="form mb-5 d-flex flex-column align-items-center">
        <h3 class="mb-3">收件人資訊</h3>
        <form @submit.prevent="createOrder">
            <h6 class="text-danger">*必填</h6>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputName">*姓名</label>
                    <input type="text" class="form-control" id="inputName" name="name" v-validate="'required'" :class="{ 'is-invalid': errors.has('name')}" v-model="form.user.name">
                    <div v-if="errors.has('name')" class="invalid-feedback">
                        請輸入姓名
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPhone">*電話</label>
                    <input type="text" class="form-control" id="inputPhone" name="phone" v-validate="'required'" :class="{ 'is-invalid': errors.has('phone')}" v-model="form.user.tel">
                    <div v-if="errors.has('phone')" class="invalid-feedback">
                        請輸入電話
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="inputEMail">*Email</label>
                <input type="email" class="form-control" id="inputEMail" name="email" v-validate="'required'" :class="{ 'is-invalid': errors.has('email')}" v-model="form.user.email">
                <div v-if="errors.has('email')" class="invalid-feedback">
                    請輸入有效的Email
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">*地址</label>
                <input type="text" class="form-control" id="inputAddress" name="address" v-validate="'required'" :class="{ 'is-invalid': errors.has('address')}" v-model="form.user.address">
                <div v-if="errors.has('address')" class="invalid-feedback">
                    請輸入地址
                </div>
            </div>
            <div class="form-group">
                <label for="FormControlTextarea">備註</label>
                <textarea class="form-control" id="FormControlTextarea" rows="3" v-model="form.message"></textarea>
            </div>
            <div class="form-row mt-3">
                <div class="col-md-4"></div>
                <div class="col-md-4 text-center">
                    <button type="submit" class="btn btn-primary text-dark">送出訂單</button>
                </div> 
                <div class="col-md-4"></div>
            </div>
        </form>
    </div>
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
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
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
                if(response.data.success) {
                    vm.cart = response.data.data;
                    vm.isLoading = false;
                }
            })
        },
        createOrder() {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/order';
            this.$validator.validate().then((valid) => {
                if(valid) {
                    this.$http.post(url, {data: vm.form}).then((response) => {
                        if(response.data.success) {
                            vm.$bus.$emit('updateCart');
                            vm.$bus.$emit('message: push', response.data.message, 'warning');
                            vm.$router.push(`payment/${response.data.orderId}`);
                        }
                    });
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
table {
    min-width: 700px;
}
tbody {
    th, td {
        line-height: 100px;
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