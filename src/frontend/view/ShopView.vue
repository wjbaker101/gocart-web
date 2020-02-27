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
        <div class="view-content zerostate-shop-view" v-if="!shop">
            <section class="text-centered">
                <ShopIcon class="zerostate-shop-icon icon-xlarge" />
                <p><strong>No shop selected!</strong></p>
                <p>Choose a shop, and it'll appear here.</p>
            </section>
        </div>
        <div class="view-content" v-if="shop">
            <h2>Opening Hours</h2>
            <section>
                <table class="opening-hours-table">
                    <tbody>
                        <tr>
                            <td>Mon</td>
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
            </section>
            <h2>Facilities Provided</h2>
            <section>
                <ul>
                    <li v-for="(facility, index) in facilities" :key="index">{{ facility }}</li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import {
        IStoreLocationResponseResult,
        IStoreLocationResponseOpeningHour,
        IStoreLocationResponseOpeningHours,
        IStoreLocationResponseFacility,
    }
    from '@common/interface/response/IStoreLocationResponse';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';

    import EditIcon from '@frontend/assets/icon/edit.svg';
    import ShopIcon from '@frontend/assets/icon/shop.svg';

    export default Vue.extend({
        name: 'ShopView',

        components: {
            HeaderComponent,
            EditIcon,
            ShopIcon,
        },

        data() {
            return {
                shop: null as (IStoreLocationResponseResult | null),

                allowedFacilities: {
                    'ATM': 'ATM',
                    'Cafe': 'Cafe',
                    'Clothing Range': 'Clothing Range',
                    'Customer Recycling Point': 'Recycling Point',
                    'Disabled parking facilities are available': 'Disabled Parking',
                    'Facilities are available for people who are visually impaired. Including large print and braille.': 'Visually Impaired Facilities',
                    'Facilities are available for people with hearing impairments.': 'Hearing Impaired Facilities',
                    'Facilities are available for people with mobility impairment.': 'Mobility Impaired Facilities',
                    'Jet Wash': 'Jet Wash',
                    'Hand Car Wash': 'Hand Car Wash',
                    'Petrol': 'Petrol',
                    'Photo Booth - Digital Passport Enabled': 'Photo Booth',
                    'Scan as you Shop': 'Scan as you Shop',
                    'Tesco Mobile Shop': 'Tesco Mobile Shop',
                    'Tesco Pay+': 'Tesco Pay+',
                    'Toilets': 'Toilets',
                    'Wifi': 'Wifi',
                    'Collect+': 'Collect+',
                    'Self-Service Instant Photo Printing': 'Self-Service Instant Photo Printing',
                    'Pharmacy': 'Pharmacy',
                    'Timpson': 'Timpson',
                },
            }
        },

        computed: {
            openingHours(): Record<string, IStoreLocationResponseOpeningHour> | null {
                if (!this.shop) return null;

                return this.shop.location.openingHours[0].standardOpeningHours;
            },

            facilities(): IStoreLocationResponseFacility[] {
                return this.shop.location.facilities
                        .slice()
                        .filter((f: IStoreLocationResponseFacility) => (f.description in this.allowedFacilities))
                        .map((f: IStoreLocationResponseFacility) => this.allowedFacilities[f.description])
                        .sort(this.sortByFacilityDescription);
            },
        },

        async created(): Promise<void> {
            const cachedShop = await this.$root.$data.getSelectedShop();

            if (cachedShop && cachedShop !== null) {
                this.shop = cachedShop;
            }
        },

        methods: {
            getOpeningHour(openingHour: IStoreLocationResponseOpeningHour): string {
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

            formatOpeningHour(openingHour: string): string {
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

            sortByFacilityDescription(a: string, b: string): number {
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            },
        },
    })
</script>

<style lang="scss">
    .shop-view {

        .shop-title-container {
            text-align: center;

            h2 {
                margin-bottom: 0;
            }
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

        .zerostate-shop-view {
            padding-top: 25vh;

            .zerostate-shop-icon {
                color: theme(primary);
            }
        }
    }
</style>