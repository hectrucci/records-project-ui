<template>
    <div class="records-container">
        <div class="modal-spinner" v-if="isLoading">
            <half-circle-spinner
                :animation-duration="1000"
                :size="30"
                :color="'#343a40'"
            />
        </div>
        <h1 class="mt-5">Records</h1>
        <div class="table-responsive mt-5 records-table">
            <table class="table table-hover" v-if="!isLoading">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Favorite Color</th>
                    <th scope="col">Created At</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="record in records" :key="record.id">
                        <td class="record-cell">{{ record.name }}</td>
                        <td class="record-cell">{{ record.favoriteColor }}</td>
                        <td class="record-cell">
                            {{ record.createdAt | timezone('America/Denver', 'MMM DD, YYYY. hh:mm a') }}
                        </td>
                        <td class="record-cell">
                            <b-btn variant="outline-danger"
                                   @click="deleteRecord(record)">Delete</b-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mb-5" v-if="!isLoading">
            <b-btn class="mt-3"
                   variant="outline-primary"
                   @click="openRecordModal">New Record</b-btn>
        </div>
        <pagination v-if="displayPagination"
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @setCurrentPage="setCurrentPage"></pagination>
        <b-modal ref="recordModal" hide-footer title="Add New Record" size="sm">
            <div class="d-block text-center">
                <div class="input-group input-group-sm mb-3">
                    <input type="text"
                           v-model="name"
                           :class="{ 'is-invalid': isNameInvalid }"
                           class="form-control"
                           placeholder="Record Name">
                </div>
                <div class="input-group input-group-sm mb-3">
                    <input type="text"
                           v-model="favoriteColor"
                           :class="{ 'is-invalid': isFavoriteColorInvalid }"
                           class="form-control"
                           placeholder="Favorite Color">
                </div>
            </div>
            <b-btn class="mt-3"
                   variant="outline-primary"
                   @click="createNewRecord">Create Record</b-btn>
            <b-btn class="mt-3"
                   variant="outline-danger"
                   @click="hideRecordModal">Cancel</b-btn>
        </b-modal>
    </div>
</template>

<script>
import moment from 'moment-timezone';
import { HalfCircleSpinner } from 'epic-spinners';

import { routes } from '@/router';
import Pagination from '@/components/pagination/Pagination';
import RecordsService from '@/services/RecordsService';
import AuthenticationService from '@/services/AuthenticationService';

export default {
    name: 'Records',
    components: { Pagination, HalfCircleSpinner },
    data() {
        return {
            currentPage: 1,
            totalPages: 1,
            records: [],
            isLoading: false,
            name: '',
            enableInvalidIndicator: false,
            favoriteColor: '',
        };
    },
    mounted() {
        this.getRecords();
    },
    computed: {
        displayPagination() {
            return this.totalPages > 1 && !this.isLoading;
        },
        isNameInvalid() {
            return this.enableInvalidIndicator && !this.name;
        },
        isFavoriteColorInvalid() {
            return this.enableInvalidIndicator && !this.favoriteColor;
        },
    },
    methods: {
        getRecords(goToFirstPaginationPage = false) {
            const { page, size } = this.$route.query;

            this.isLoading = true;

            RecordsService.getRecords(page, size)
                .then(({ data: records }) => {
                    /*
                     *  decreasing the current page number when there are
                     *  no more results in case of a deletion
                     */
                    if (records.count && !records.rows.length) {
                        this.setCurrentPage(page - 1);
                    } else {
                        this.records = records.rows;
                        this.totalPages = Math.ceil(records.count / size);

                        if (goToFirstPaginationPage) {
                            this.setCurrentPage(1);
                        }
                    }
                })
                .catch(error => AuthenticationService.handleUnauthorizedResponse(error, this.$swal))
                .then(() => {
                    this.isLoading = false;
                });
        },
        clearModalInputs() {
            this.name = '';
            this.favoriteColor = '';
            this.enableInvalidIndicator = false;
        },
        openRecordModal() {
            this.clearModalInputs();
            this.$refs.recordModal.show();
        },
        hideRecordModal() {
            this.$refs.recordModal.hide();
            this.clearModalInputs();
        },
        createNewRecord() {
            const record = { name: this.name, favoriteColor: this.favoriteColor };

            // verify the inputs, if one of them is empty then the input invalid indicator should be enabled
            if (!record.name || !record.favoriteColor) {
                this.enableInvalidIndicator = true;

                return;
            }

            this.isLoading = true;
            this.hideRecordModal();

            RecordsService.createNewRecord(record)
                .then(() => {
                    this.getRecords(true);
                })
                .catch(error => AuthenticationService.handleUnauthorizedResponse(error, this.$swal));
        },
        deleteRecord(record) {
            const { id } = record;

            this.isLoading = true;

            RecordsService.deleteRecord(id)
                .then(() => {
                    this.getRecords();
                })
                .catch(error => AuthenticationService.handleUnauthorizedResponse(error, this.$swal));
        },
        setCurrentPage(page) {
            this.isLoading = true;
            this.currentPage = page;
            this.$router.push({ name: routes.RECORDS, query: { page: this.currentPage, size: 5 } });
            this.getRecords();
        },
    },
    filters: {
        timezone(date, timezone, format) {
            return moment(date).tz(timezone).format(format);
        },
    },
};
</script>

<style scoped>
    .records-table {
        min-height: 381px;
    }

    .modal-spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left:-15px;
    }

    .is-invalid::placeholder {
        color: #dc3545;
    }
</style>
