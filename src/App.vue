<template>
    <div id="app">
        <main-header></main-header>
        <div class="container">
            <router-view/>
            <login-modal></login-modal>
        </div>
    </div>
</template>

<script>
import MainHeader from '@/components/main-header/MainHeader';
import LoginModal from '@/components/login-modal/LoginModal';

export default {
    name: 'App',
    components: { MainHeader, LoginModal },
};
</script>

<style>
    #app {
      text-align: center;
      color: #2c3e50;
    }
</style>
