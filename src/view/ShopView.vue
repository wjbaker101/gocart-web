<template>
    <div class="shop-view">
        <HeaderComponent>
            <template #right-side>
                <router-link to="/shop/search">
                    <EditIcon />
                </router-link>
            </template>
            <template #below v-if="shop">
                <div class="shop-title-container">
                    <h2>{{ shop.location.name }}</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="select-shop-container text-centered" v-if="!shop">
            <p>
                <strong>Choose a shop</strong>
                <span>, it'll appear here!</span>
            </p>
        </div>
        <div class="selected-shop-container" v-if="shop">
            <div class="opening-hours-section">
                <h3>Opening Hours</h3>
                <table class="opening-hours-table">
                    <tbody>
                        <tr>
                            <td>Mon</td>
                            <!-- <td>6am - 12pm</td> -->
                            <td>{{ getOpeningHour(openingHours.mo) }}</td>
                        </tr>
                        <tr>
                            <td>Tues</td>
                            <td>{{ getOpeningHour(openingHours.tu) }}</td>
                        </tr>
                        <tr>
                            <td>Weds</td>
                            <td>{{ getOpeningHour(openingHours.we) }}</td>
                        </tr>
                        <tr>
                            <td>Thurs</td>
                            <td>{{ getOpeningHour(openingHours.th) }}</td>
                        </tr>
                        <tr>
                            <td>Fri</td>
                            <td>{{ getOpeningHour(openingHours.fr) }}</td>
                        </tr>
                        <tr>
                            <td>Sat</td>
                            <td>{{ getOpeningHour(openingHours.sa) }}</td>
                        </tr>
                        <tr>
                            <td>Sun</td>
                            <td>{{ getOpeningHour(openingHours.su) }}</td>
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

        data() {
            return {
                shop: null,
            }
        },

        computed: {
            openingHours() {
                return this.shop.location.openingHours[0].standardOpeningHours;
            },
        },

        created() {
            const cachedShop = this.$root.$data.getSelectedShop();

            if (cachedShop && cachedShop !== null) {
                this.shop = cachedShop;
            }
        },

        methods: {
            getOpeningHour(openingHour) {
                if (!openingHour.isOpen) {
                    return 'Closed';
                }

                if (!openingHour.open && !openingHour.close
                    || openingHour.open === '0000' && !openingHour.close
                    || !openingHour.open && openingHour.close === '2400') {
                    return '24 Hours';
                }

                const open = this.formatOpeningHour(!openingHour.open ? '0000' : openingHour.open);
                const close = this.formatOpeningHour(!openingHour.close ? '0000' : openingHour.close);

                return `${open} - ${close}`;
            },

            formatOpeningHour(openingHour) {
                const hour = Number(`${openingHour[0]}${openingHour[1]}`);
                const minutes = Number(`${openingHour[2]}${openingHour[3]}`);

                if (hour === 0 || hour === 24) {
                    return 'Midnight';
                }

                const hourPostfix = (hour > 12) ? 'pm' : 'am';
                const hour12Hour = (hour > 12) ? hour - 12 : hour;

                const minutesFormatted = minutes.toString().padStart(2, '0');

                if (minutes === 0) {
                    return `${hour12Hour}${hourPostfix}`;
                }

                return `${hour12Hour}:${minutesFormatted}${hourPostfix}`;
            },
        },
    }
</script>

<style lang="scss">
    .shop-view {

        .select-shop-container {
            padding: 1rem;
        }

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
                border-bottom: 1px solid theme(grey-dark);

                &:first-child {
                    width: 33%;
                }
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