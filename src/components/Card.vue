<template>
    <div>
        <div class="card-img">
            <img :src="item.image" class="card-img-top">
        </div>
        <div class="card-body">
            <h6 class="card-title">{{ item.title }}</h6>
            <h6 class="m-0"><span class="badge badge-primary text-dark">#{{ item.category }}</span></h6>
            <div class="card-info d-flex justify-content-between align-items-end py-2">
                <div class="price">
                    <s class="card-text my-0">${{ item.origin_price }}</s>
                    <p class="text-danger my-0">${{ item.price }}</p>
                </div>
                <a class="btn btn-primary text-dark" @click.prevent="itemInfo(item.id)">商品細節</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        itemInfo(id) {
            const vm = this;
            vm.$router.push(`item/${id}`);
        }
    }
}
</script>

<style scoped lang="scss">
.card-img {
    width: 100%;
    height: 250px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: .5s;
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
        }
    }
}
.price {
    p {
        font-size: 20px;
    }
}
</style>