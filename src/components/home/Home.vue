<template>
    <div class="mt-5">
        <h1 v-if="isAuthenticated">{{ `Welcome ${user.name}!`}}</h1>
        <div v-if="!isAuthenticated">
            <h1>Welcome Guest!</h1>
            <b-btn class="mt-3"
                   variant="outline-primary"
                   @click="openLoginModal">Click here to Sign In</b-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'Home',
    methods: {
        openLoginModal() {
            EventBus.$emit('openLoginModal');
        },
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user']),
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        font-weight: normal;
    }
</style>
