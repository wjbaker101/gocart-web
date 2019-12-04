import Quagga from 'quagga';

import { IBarcodeResult } from '@frontend/interface/IBarcodeResult';

export default {

    options: {
        locate: true,
        decoder: {
            readers: ['ean_reader'],
        },
    },

    async decode(data: string): Promise<IBarcodeResult> {
        return await new Promise((resolve, reject) => {
            Quagga.decodeSingle({
                ...this.options,
                src: data,
            },
            (result: IBarcodeResult) => {
                if (!result || !result.codeResult) {
                    return reject();
                }

                return resolve(result);
            });
        });
    },

    async decodeStream(targetElement: HTMLElement): Promise<IBarcodeResult> {
        return await new Promise((resolve, reject) => {
            if (!this.userHasCapabilities()) {
                reject('User does not have video capabilities.');
            }

            Quagga.init({
                ...this.options,
                inputStream: {
                    name : "Live",
                    type : "LiveStream",
                    target: targetElement,
                },
            },
            (error: any) => {
                if (error) {
                    return reject('Sorry, an error occured when trying to decode the barcode.');
                }

                Quagga.start();

                Quagga.onDetected((result: IBarcodeResult) => {
                    Quagga.stop();
                    return resolve(result);
                });
            });
        });
    },

    userHasCapabilities(): boolean {
        return navigator.mediaDevices
                && typeof navigator.mediaDevices.getUserMedia === 'function';
    },
}
