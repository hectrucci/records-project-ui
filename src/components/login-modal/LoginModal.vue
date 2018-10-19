<template>
    <b-modal ref="loginModal" hide-footer title="Sing In" size="sm">
        <div class="d-block text-center">
            <div class="input-group input-group-sm mb-3">
                <input type="text"
                       v-model="username"
                       :class="{ 'is-invalid': isUsernameInvalid }"
                       class="form-control"
                       placeholder="Username">
            </div>
            <div class="input-group input-group-sm mb-3">
                <input type="password"
                       v-model="password"
                       :class="{ 'is-invalid': isPasswordInvalid }"
                       class="form-control"
                       placeholder="Password"
                       @keyup.enter="signIn">
            </div>
        </div>
        <div class="modal-messages">
            <div class="modal-spinner" v-if="isLoading">
                <half-circle-spinner
                    :animation-duration="1000"
                    :size="30"
                    :color="'#343a40'"
                />
            </div>
            <div v-if="errorMessage" class="alert alert-danger modal-message">{{ errorMessage }}</div>
        </div>
        <b-btn class="mt-3" variant="outline-primary" @click="signIn">Sign In</b-btn>
        <b-btn class="mt-3" variant="outline-danger" @click="hideLoginModal">Cancel</b-btn>
    </b-modal>
</template>

<script>
import EventBus from '@/helpers/event-bus';
import AuthenticationService from '@/services/AuthenticationService';
import { HalfCircleSpinner } from 'epic-spinners';

export default {
    name: 'LoginModal',
    mounted() {
        // opens login modal when the openLoginModal event is triggered
        EventBus.$on('openLoginModal', () => {
            this.openLoginModal();
        });
    },
    data() {
        return {
            errorMessage: '',
            isLoading: false,
            username: '',
            password: '',
            enableInvalidIndicator: false,
        };
    },
    components: { HalfCircleSpinner },
    computed: {
        isUsernameInvalid() {
            return this.enableInvalidIndicator && !this.username;
        },
        isPasswordInvalid() {
            return this.enableInvalidIndicator && !this.password;
        },
    },
    methods: {
        clearModalInputs() {
            this.username = '';
            this.password = '';
            this.errorMessage = '';
            this.enableInvalidIndicator = false;
        },
        signIn() {
            const user = { username: this.username, password: this.password };

            // verify the inputs, if one of them is empty then the input invalid indicator should be enabled
            if (!user.username || !user.password) {
                this.enableInvalidIndicator = true;

                return;
            }

            this.isLoading = true;
            this.errorMessage = '';

            AuthenticationService.authenticate(user)
                .then(this.hideLoginModal)
                .catch(({ response }) => {
                    this.errorMessage = response.data.message;
                })
                .then(() => {
                    this.isLoading = false;
                });
        },
        openLoginModal() {
            this.clearModalInputs();
            this.$refs.loginModal.show();
        },
        hideLoginModal() {
            this.$refs.loginModal.hide();
            this.clearModalInputs();
        },
    },
};
</script>

<style scoped>
    .modal-message {
        margin-bottom: 0;
    }

    .modal-spinner {
        position: relative;
        top: 50%;
        left: 50%;
        margin-left:-15px;
    }

    .is-invalid::placeholder {
        color: #dc3545;
    }
</style>
