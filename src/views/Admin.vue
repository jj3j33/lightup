<template>
<div class="container-fluid">
    <div class="row">
        <Sidebar></Sidebar>
        <div class="col-md-10">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}
</script>

<style scoped lang="scss">
.container-fluid {
    // padding: 0;
    // margin: 0;
    // height: 100vh;
}
</style>