<template>
    <div class="help-view">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <h2>Help</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="view-content">
            <h2>
                <span>What Do You Need Help With?</span>
            </h2>
            <section>
                <ul v-for="(section, index) in sections" :key="`section-link-${index}`">
                    <li><a class="link" :href="`#${section.id}`">{{ section.title }}</a></li>
                </ul>
            </section>
            <h2 :id="sections[0].id">
                <span>{{ sections[0].title }}</span>
            </h2>
            <section>
                <p>
                    The purpose of the shopping list is to collate all your
                    wanted products for your next Tesco shop.
                </p>
                <p>
                    When adding a product to your shopping list, it will be
                    displayed in the top-most list.
                </p>
                <p>
                    Once you have decided on what you want to buy, right before
                    you do the shop, you can click on the total price at the top
                    of the screen to "lock" the current value. When you are
                    checking off products, the price will not change.
                </p>
                <p>
                    During the shop, you are able to check off products. This
                    will move the product from the shopping list to the "checked
                    items" list. Meaning you are able to see the remaining
                    products you should buy next.
                </p>
                <p>
                    To add an existing product to your shopping list, look for
                    it in your checked items list and simply uncheck it. The
                    product will be moved back into yoru shopping list.
                </p>
            </section>
            <h2 :id="sections[1].id">
                <span>{{ sections[1].title }}</span>
            </h2>
            <section>
                <p>
                    Searching for products is the main way of adding products to
                    your shopping list.
                </p>
                <p>
                    Simply write what product you wish to buy and execute the
                    search. You will be presented with a list of products that
                    closely match with your search term.
                </p>
                <p>
                    Once you see a product you like, tap on it to view more
                    information about it. For speed, tap on the checkbox to add
                    it to your shopping list instantly.
                </p>
            </section>
            <h2 :id="sections[2].id">
                <span>{{ sections[2].title }}</span>
            </h2>
            <section>
                <p>
                    The purpose of choosing a shop is so that you have a
                    quick-access method of viewing information about a specific
                    Tesco shop.
                </p>
                <p>
                    To choose a shop, navigate to the shop search and allow for
                    the location permission. The app will find a rough postcode
                    for your current location (alternatively, enter your
                    postcode manually). A list of the closest Tesco shops will
                    be displayed to you.
                </p>
            </section>
            <h2 :id="sections[3].id">
                <span>{{ sections[3].title }}</span>
            </h2>
            <section>
                <p>
                    If you have a physical product you want to add to your
                    shopping list, the barcode scanner will be able to scan the
                    barcode of that product and give you the option of adding it
                    to your shopping list.
                </p>
                <p>
                    Navigate to the barcode scanner screen, and use your phone's
                    camera to point to the barcode on the product. Once a
                    barcode is found, the camera feed will freeze and a popup
                    will be displayed with that product.
                </p>
                <p>
                    Alternatively, upload a photo of a barcode and, again, the
                    app will attempt to find that product.
                </p>
                <p>
                    It is possible that the app will not find a product. If this
                    is the case, it is most likely easier to manually search for
                    that product.
                </p>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';

    export default Vue.extend({
        name: 'HelpView',

        components: {
            HeaderComponent,
        },

        data() {
            return {
                sections: [
                    {
                        id: 'managing-your-shopping-list',
                        title: 'Managing Your Shopping List',
                    },
                    {
                        id: 'searching-for-products',
                        title: 'Searching For Products',
                    },
                    {
                        id: 'choosing-a-shop',
                        title: 'Choosing A Shop',
                    },
                    {
                        id: 'the-barcode-scanner',
                        title: 'The Barcode Scanner',
                    },
                ],
            }
        },
    })
</script>

<style lang="scss">
    .help-view {

        .product-title-container {
            text-align: center;

            h2 {
                margin-bottom: 0;
            }
        }
    }
</style>