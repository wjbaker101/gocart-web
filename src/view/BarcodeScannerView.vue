<template>
    <div class="barcode-scanner-view">
        <HeaderComponent>
        </HeaderComponent>
        <div class="barcode-scanner-container">
            <h1>Scan a Barcode</h1>
            <p>
                <input ref="fileInput" type="file" @change="onDecodeImageChange">
            </p>
            <div class="scanning-container" ref="scanningContainer"></div>
        </div>
    </div>
</template>

<script>
    import API from '@/api/API.js';
    import BarcodeService from '@/service/BarcodeService.js';

    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import ButtonComponent from '@/component/item/ButtonComponent.vue';

    export default {
        name: 'BarcodeScannerView',

        components: {
            HeaderComponent,
            ButtonComponent,
        },

        async mounted() {
            const result = await BarcodeService.decodeStream(this.$refs.scanningContainer);

            this.handleBarcodeScan(result);
        },

        methods: {
            async handleBarcodeScan(result) {
                const barcode = result.codeResult.code;

                const product = await this.getProductFromBarcode(barcode);

                if (product === null) {
                    return;
                }

                this.$router.push({
                    name: 'product-route',
                    params: { product },
                });
            },

            async getProductFromBarcode(barcode) {
                const productData = await API.getProductFromBarcode(barcode);
                const description = productData.data.result.description;
                const tpncToFind = productData.data.result.tpnc;

                console.log(productData.data.result);

                const products = await API.searchProduct(description);

                console.log(products.data.result);

                const product = products.data.result
                        .filter(p => String(p.tpnc) === tpncToFind);

                if (product.length === 0) {
                    return null;
                }

                return {
                    ...product[0],
                    quantity: 1,
                }
            },

            async onDecodeImageChange() {
                if (this.$refs.fileInput.files.length === 0) {
                    return;
                }

                const file = this.$refs.fileInput.files[0];
                const data = URL.createObjectURL(file);

                try {
                    const result = await BarcodeService.decode(data);

                    this.handleBarcodeScan(result);
                }
                catch (error) {
                    console.log('Unable to decode barcode.');
                }
            },
        },
    }
</script>

<style lang="scss">
    .barcode-scanner-view {
        .barcode-scanner-container {
            padding: 0 1rem;
        }

        .barcode-button {
            width: 100%;
        }

        .scanning-container {
            width: 100%;
            height: 50vh;
            border-radius: layout(border-radius);
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
            background-color: theme(black);
            background: linear-gradient(-15deg, theme(black-dark), theme(black));

            video {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>