<template>
<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" :class="{'active': pages.current_page === page}" v-for="page in pages.total_pages" :key="page">
            <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pages.has_next}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.total_pages)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    props: ['pages'],
    data() {
        return {

        }
    },
    methods: {
        updatePage(page) {
            this.$emit('updatePage', page);
        }
    }
}
</script>

<style scoped lang="scss">
a {
    color: darken($color: #e8e468, $amount: 10);
}
</style>