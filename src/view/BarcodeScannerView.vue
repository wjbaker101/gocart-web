<template>
    <div class="barcode-scanner-view">
        <HeaderComponent>
            <template v-slot:below>
                <div class="scan-title-container">
                    <h2>Barcode Scanner</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="barcode-scanner-container">
            <div class="scanning-container" ref="scanningContainer">
                <div class="blank-scan-container">
                    <div v-if="isError">
                        <p>I was unable to scan that barcode.</p>
                        <p>
                            <ButtonComponent @click="onTryAgainClick">
                                Try Again
                            </ButtonComponent>
                        </p>
                    </div>
                    <p v-else>
                        <strong>Black screen?</strong>
                        <br>
                        Please enable permissions to allow for video.
                        <br>
                        <strong>or</strong>
                        <br>
                        Use an image of a barcode by tapping the button below.
                    </p>
                </div>
            </div>
            <FileInputComponent @change="onDecodeImageChange" class="file-input-button">
                <UploadIcon />
            </FileInputComponent>
        </div>
    </div>
</template>

<script>
    import API from '@/api/API.js';
    import BarcodeService from '@/service/BarcodeService.js';

    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import ButtonComponent from '@/component/item/ButtonComponent.vue';
    import FileInputComponent from '@/component/item/FileInputComponent.vue';

    import UploadIcon from '@/assets/icon/upload.svg';

    export default {
        name: 'BarcodeScannerView',

        components: {
            HeaderComponent,
            ButtonComponent,
            FileInputComponent,
            UploadIcon,
        },

        data() {
            return {
                isError: false,
            }
        },

        async mounted() {
            this.doBarcodeStream();
        },

        methods: {
            async onTryAgainClick() {
                this.doBarcodeStream();
                this.isError = false;
            },

            async doBarcodeStream() {
                const result = await BarcodeService.decodeStream(this.$refs.scanningContainer);

                this.handleBarcodeScan(result);
            },

            async handleBarcodeScan(result) {
                const barcode = result.codeResult.code;

                try {
                    const product = await this.getProductFromBarcode(barcode);

                    if (product === null) {
                        this.isError = true;
                        return;
                    }

                    this.$router.push({
                        name: 'product-route',
                        params: { product },
                    });
                }
                catch (error) {
                    this.isError = true;
                }
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

            async onDecodeImageChange(event, fileInput) {
                if (fileInput.files.length === 0) {
                    return;
                }

                const file = fileInput.files[0];
                const data = URL.createObjectURL(file);

                try {
                    const result = await BarcodeService.decode(data);

                    this.handleBarcodeScan(result);
                }
                catch (error) {
                    this.isError = true;
                }
            },
        },
    }
</script>

<style lang="scss">
    .barcode-scanner-view {
        .barcode-scanner-container {
            padding: 1rem;
        }

        .scan-title-container {
            text-align: center;

            h2 {
                margin-bottom: 0;
            }
        }

        .blank-scan-container {
            padding: 1rem;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            text-align: center;
            color: theme(grey-light);

            & > * {
                margin: auto;
            }
        }

        .barcode-button {
            width: 100%;
        }

        .scanning-container {
            width: 100%;
            height: 50vh;
            position: relative;
            border-radius: layout(border-radius);
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
            background-color: theme(black);
            background: linear-gradient(-15deg, theme(black-dark), theme(black));
            overflow: hidden;

            video {
                width: 100%;
                height: 100%;
                background: linear-gradient(-15deg, theme(black-dark), theme(black));
            }
        }

        .file-input-button {
            border-radius: 50%;
            position: fixed;
            right: 1rem;
            bottom: calc(75.8px + 1rem);

            .button-component {
                border-radius: inherit;
            }
        }
    }
</style>