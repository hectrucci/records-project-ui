<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link"
                   @click="$emit('setCurrentPage', currentPage - 1)">Previous</a>
            </li>
            <li  v-for="page in totalPages"
                 :key="page"
                 class="page-item"
                 :class="{ disabled: page === currentPage }">
                <a class="page-link" @click="$emit('setCurrentPage', page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link"
                   @click="$emit('setCurrentPage', currentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: Number,
        totalPages: Number,
    },
};
</script>
