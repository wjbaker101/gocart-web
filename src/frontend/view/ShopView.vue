<template>
    <PageContainerComponent>
        <template #header-right>
            <router-link class="header-shop-view-edit-group" to="/shop/search">
                <EditIcon />
                <span>Edit</span>
            </router-link>
        </template>
        <template #header-bottom v-if="shop !== null">
            <h3 class="header-shop-view-shop-name">{{ shop.name }}</h3>
        </template>
        <div class="shop-view">
            <section class="zero-state" v-if="shop === null">
                <ShopIcon massive />
                <p><strong>You haven't selected a shop yet!</strong></p>
                <p>Press the 'Edit' button above to choose one.</p>
            </section>
            <div v-else>
                <section class="background">
                    <h2>Opening Hours</h2>
                    <table class="opening-hours-table">
                        <tbody>
                            <tr>
                                <td>Mon</td>
                                <td>{{ getOpeningHour(shop.openingHour?.mo) }}</td>
                            </tr>
                            <tr>
                                <td>Tues</td>
                                <td>{{ getOpeningHour(shop.openingHour?.tu) }}</td>
                            </tr>
                            <tr>
                                <td>Weds</td>
                                <td>{{ getOpeningHour(shop.openingHour?.we) }}</td>
                            </tr>
                            <tr>
                                <td>Thurs</td>
                                <td>{{ getOpeningHour(shop.openingHour?.th) }}</td>
                            </tr>
                            <tr>
                                <td>Fri</td>
                                <td>{{ getOpeningHour(shop.openingHour?.fr) }}</td>
                            </tr>
                            <tr>
                                <td>Sat</td>
                                <td>{{ getOpeningHour(shop.openingHour?.sa) }}</td>
                            </tr>
                            <tr>
                                <td>Sun</td>
                                <td>{{ getOpeningHour(shop.openingHour?.su) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section class="background">
                    <h2>Location Preview</h2>
                    <div class="preview-image-container text-centered">
                        <div
                            class="preview-image-placeholder"
                            v-if="!shop.location.mapImage"
                        >
                            <LoadingComponent>
                                <p>Just grabbing a preview image,<br> one moment...</p>
                            </LoadingComponent>
                        </div>
                        <img
                            v-else
                            width="350"
                            height="350"
                            class="preview-image fade-in-long"
                            :src="`data:image/png;base64,${shop.location.mapImage}`"
                        >
                    </div>
                </section>
                <section class="background" v-if="displayFacilities.length > 0">
                    <h2>Facilities Provided</h2>
                    <ul>
                        <li
                            :key="`facility-${index}`"
                            v-for="(facility, index) in displayFacilities"
                        >
                            {{ facility }}
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, defineComponent, readonly } from 'vue';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import LoadingComponent from '@/component/LoadingComponent.vue';
import EditIcon from '@/component/icon/PencilIcon.vue';
import ShopIcon from '@/component/icon/ShopIcon.vue';

import { UseShop } from '@/use/state/Shop.use';
import { UseScrollPosition } from '@/use/ScrollPosition.use';

import { Shop, ShopOpeningHourHours } from '@/model/Shop.model';

export default defineComponent({
    name: 'ShopView',

    components: {
        PageContainerComponent,
        LoadingComponent,
        EditIcon,
        ShopIcon,
    },

    setup() {
        const useShop = UseShop();

        const shop = computed<Shop | null>(() => useShop.shop.value);

        const allowedFacilities = readonly<Record<string, string>>({
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
        });

        const displayFacilities = computed<string[]>(() => {
            if (shop.value === null || shop.value.facilities === null)
                return [];

            return shop.value.facilities
                .map(f => allowedFacilities[f])
                .filter(f => f !== undefined)
                .sort((a: string, b: string) => {
                    if(a < b) return -1;
                    if(a > b) return 1;
                    return 0;
                });
        });

        const formatOpeningHour = (openingHour: string): string => {
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
        };

        UseScrollPosition('ShopView');

        return {
            shop,
            displayFacilities,

            getOpeningHour(openingHour: ShopOpeningHourHours): string {
                if (!openingHour) {
                    return 'No data';
                }
                if (!openingHour.isOpen) {
                    return 'Closed';
                }

                if (!openingHour.open && !openingHour.close
                    || openingHour.open === '0000' && !openingHour.close
                    || !openingHour.open && openingHour.close === '2400') {
                    return '24 Hours';
                }

                const open = formatOpeningHour(!openingHour.open ? '0000' : openingHour.open);
                const close = formatOpeningHour(!openingHour.close ? '0000' : openingHour.close);

                return `${open} - ${close}`;
            },
        }
    },
})
</script>

<style lang="scss">
.header-shop-view-edit-group {
    color: inherit;
    text-decoration: none;
}

.header-shop-view-shop-name {
    margin: 0;
    text-align: center;
}

.shop-view {

    .preview-image-container {
        line-height: 0;
    }

    .preview-image {
        max-width: 100%;
        height: auto;
        border-radius: layout(border-radius);

        @include box-shadow-small;
    }

    .preview-image-placeholder {
        width: 350px;
        max-width: 100%;
        position: relative;
        margin: 0 auto;
        border-radius: layout(border-radius);
        line-height: 1.6rem;

        @include box-shadow-small;

        .loading-component {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &::before {
            content: '';
            display: block;
            padding-top: 100%;
        }
    }
}
</style>