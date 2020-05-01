<template>
    <div class="d-flex flex-column align-items-center text-dark">
        <div id="carouselExampleControls" class="carousel slide mb-5 w-100" data-ride="carousel">
            <div class="carousel-inner w-100 h-100">
                <div class="carousel-item active w-100 h-100">
                    <img src="../assets/images/slider_a.jpg" class="d-block w-100 h-100">
                </div>
                <div class="carousel-item w-100 h-100">
                    <img src="../assets/images/slider_b.jpg" class="d-block w-100 h-100">
                </div>
                <div class="carousel-item w-100 h-100">
                    <img src="../assets/images/slider_c.jpg" class="d-block w-100 h-100">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="intro text-center text-dark my-5">
            <h1 class="title mb-5">歡迎來到<span class="pl-1">#燈一下</span></h1>
            <p class="mb-5">燈是每個人生活中不可或缺的一部份<br>希望每個來到這裡的你<br>都能讓<span class="light px-1">#燈一下</span>走進你的生活</p>
            <router-link to="/about" class="btn btn-primary btn-lg text-dark more"><i class="far fa-hand-point-right"></i>瞭解更多</router-link>
        </div>
        
        <section class="card-header container d-flex justify-content-center align-items-center text-white">
            <p>精選推薦</p>
        </section>
        <div class="cards p-5 row">
            <div class="col-lg-3 col-md-6 col-sm-12" v-for="item in items" :key="item.id">
                <div class="card my-3">
                    <Card :item="item"></Card>
                </div>
            </div>
        </div>
        <div class="subscription row p-5 mb-5 d-flex align-items-center text-dark">
            <div class="text col-md-6 col-sm-12">
                <h4>對 #燈一下 有興趣嗎？</h4>
                <h4>那就快快訂閱我們獲得最新消息吧！</h4>
            </div>      
            <div class="col-md-6 mail c0l-sm-12">
                <input type="email" class="form-control px-2 py-4 mail-input">
                <i class="fas fa-envelope h4"></i>
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
            items: []
        }
    },
    created() {
        this.getItem();
    },
    methods: {
        getItem() {
            const vm = this;
            const url = 'https://vue-course-api.herokuapp.com/api/lightup/products';
            this.$http.get(url).then((response) => {
                let items = response.data.products;
                vm.items = items.slice(0, 4);
            });
        }
    }
}
</script>

<style scoped lang="scss">
@keyframes jump {
    100% {
        transform: translateY(-10px);
    }
}

// slider
.slide {
    height: 100vh;
    img {
        object-fit: cover;
    }
}
// introduce
.intro {
    .title {
        font-family: 'Noto Serif TC', serif;
        font-weight: 900;
    }
    p {
        font-size: 24px;
        line-height: 2;
        letter-spacing: .1rem;
        font-weight: 500;
    }
    .more {
        animation: jump .5s linear infinite alternate;
    }
}
// card-header
.card-header {
    height: 150px;
    background-image: url('https://images.unsplash.com/photo-1511720940-f5d20758312b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2009&q=80');
    background-attachment: fixed;
    background-size: cover;
    background-position: 50%;
    border-radius: 10px;
    p {
        font-size: 28px;
        border-bottom: 1px solid #e8e468;
    }
}
// card
.cards {
    width: 100%;
    .card {
        height: 420px;
    }
}
//subscription
.subscription {
    width: 80%;
    border: 3px solid #e8e468;
    border-radius: 10px;
    .text {
        margin: 5px 0;
    }
    .mail {
        margin: 5px 0;
        .mail-input {
            position: relative;
            background: transparent;
            border: none;
            border-bottom: 2px solid rgba(0, 0, 0, .5);
            border-radius: 0;
        }
        i {
            position: absolute;
            right: 20px;
            bottom: 5px;
            cursor: pointer;
        }
    }
    
}
</style>