<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top text-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/" class="navbar-brand"><img src="../assets/images/lightup_logo.png"></router-link>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link to="/about" class="nav-item nav-link text-center"><i class="far fa-lightbulb"></i>關於我們</router-link>
                <router-link to="/items" class="nav-item nav-link text-center"><i class="far fa-lightbulb"></i>燈燈燈燈</router-link>
                <router-link to="/discount" class="nav-item nav-link text-center"><i class="far fa-lightbulb"></i>優惠活動</router-link>    
                <router-link to="/order" class="nav-item nav-link text-center"><i class="far fa-lightbulb"></i>我的訂單</router-link>
            </div>
        </div>
        <div class="icons">
            <router-link class="cart" to="/shoppingcart" :class="{shake: cart.length!=0}"><img src="../assets/images/cart_icon.png"><span class="bg-secondary text-dark text-center" v-if="cart.length">{{ cart.length }}</span></router-link>
            <router-link class="admin" to="/login"><img src="../assets/images/admin_icon.png"></router-link>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            cart: [],
        }
    },
    created() {
        const vm = this;
        vm.getCart();
        vm.$bus.$on('updateCart', () => {
            vm.getCart();
        });
    },
    methods: {
        getCart() {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/cart';
            vm.$http.get(url).then((response) => {
                if(response.data.success) {
                    vm.cart = response.data.data.carts;
                }
            });
        }
    },
}
</script>

<style scoped lang="scss">
@keyframes shake {
    0% {
        transform: rotate(-10deg);
    }
    100% {
        transform: rotate(10deg);
    }
}

.navbar-toggler {
    outline: none;
}
.navbar {
    background-color: rgba(#e8e468, .8);
}
.navbar-brand {
    img {
        width: 80px;
        height: 50px;
    }
}
.nav-link {
    font-size: 20px;
    font-weight: 700;
    margin: 0 10px;
    position: relative;
    &::after {
        content: '';
        height: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 50%;
        right: 50%;
        bottom: 0;
        transition: .3s;
    }
    &:hover {
        i {
            animation: shake .15s linear infinite alternate;
        }
        &::after {
            left: 0;
            right: 0;
        }
    }
    i {
        margin-right: 5px;
    }
}
.icons {
    a {
        margin: 0 10px;
    }
}
.cart {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
    img {
        width: 100%;
        height: 100%;
    }
    span {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 14px;
        border-radius: 50%;
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 15px;
    }
    &.shake {
        img {
            animation: shake .25s linear infinite alternate;
        }
    }
}
.admin {
    display: inline-block;
    width: 30px;
    height: 30px;
    img {
        width: 100%;
        height: 100%;
    }
}

@media (max-width: 992px) {
    .navbar-collapse {
        order: 1;
    }
}
</style>