<template>
<div class="sidebar col-md-2">
    <ul>
        <li>產品列表</li>
        <li>訂單列表</li>
        <li><router-link to="/admin/coupons">優惠券</router-link></li>
    </ul>
</div>
</template>

<style scoped lang="scss">
.sidebar {
    height: 100vh;
    padding: 20px 10px;
    border-right: 1px solid rgba(0, 0, 0, .5);
}
li {
    list-style: none;
    margin: 10px 0;
    border: 1px solid rgba(0, 0, 0, .5);
}
</style>