<template>
    <div class="shop-view">
        <HeaderComponent>
            <template #right-side>
                <router-link to="/shop/search">
                    <EditIcon />
                </router-link>
            </template>
            <template #below>
                <div class="shop-title-container">
                    <h2>Tesco Extra</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="selected-shop-container">
            <div class="opening-hours-section">
                <h3>Opening Hours</h3>
                <table class="opening-hours-table">
                    <tbody>
                        <tr>
                            <td>Mon</td>
                            <td>6am - 12pm</td>
                        </tr>
                        <tr>
                            <td>Tues</td>
                            <td>24 Hours</td>
                        </tr>
                        <tr>
                            <td>Weds</td>
                            <td>24 Hours</td>
                        </tr>
                        <tr>
                            <td>Thurs</td>
                            <td>24 Hours</td>
                        </tr>
                        <tr>
                            <td>Fri</td>
                            <td>24 Hours</td>
                        </tr>
                        <tr>
                            <td>Sat</td>
                            <td>24 Hours</td>
                        </tr>
                        <tr>
                            <td>Sun</td>
                            <td>12am - 4pm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="services-section">
                <h3>Services Provided</h3>
                <ul>
                    <li>Cafe</li>
                    <li>Tesco Mobile</li>
                    <li>Car Wash</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from '@/component/page/HeaderComponent.vue';

    import EditIcon from '@/assets/icon/edit.svg';

    export default {
        name: 'ShopView',

        components: {
            HeaderComponent,
            EditIcon,
        },
    }
</script>

<style lang="scss">
    .shop-view {

        .shop-title-container {
            text-align: center;

            h2 {
                margin-bottom: 0;
            }
        }

        .selected-shop-container {
            padding: 1rem;
        }

        .opening-hours-table {
            width: 100%;

            td {

                border-bottom: 1px solid theme(grey);
            }

            tr {

                :first-child {
                    font-weight: bold;
                    padding-right: 1rem;
                }
            }
        }
    }
</style>