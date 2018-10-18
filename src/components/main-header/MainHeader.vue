<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">Records Project</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="{name: routes.HOME}" exact>Home</b-nav-item>
                <b-nav-item v-if="isAuthenticated"
                            :to="{name: routes.RECORDS, query: { page: 1, size: 5 }}">
                    Records
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm"
                          class="my-2 my-sm-0"
                          @click="openLoginModal"
                          v-if="!isAuthenticated">Sign In</b-button>
                <b-nav-item-dropdown right v-if="isAuthenticated">
                    <template slot="button-content">
                        <em>{{ user.name }}</em>
                    </template>
                    <b-dropdown-item>
                        <b-btn variant="outline-danger"
                               size="sm"
                               class="signout-button"
                               @click="signout">Signout</b-btn>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
import { mapGetters } from 'vuex';
import { routes } from '@/router';
import EventBus from '@/helpers/event-bus';
import AuthenticationService from '@/services/AuthenticationService';

export default {
    name: 'MainHeader',
    methods: {
        openLoginModal() {
            EventBus.$emit('openLoginModal');
        },
        signout() {
            AuthenticationService.logOut();
        },
    },
    computed: {
        routes() {
            return routes;
        },
        ...mapGetters(['isAuthenticated', 'user']),
    },
};
</script>

<style scoped>
    .signout-button {
        width: 100%;
    }
    .dropdown-item:active {
        background: #fff;
    }
</style>
