import Quagga from 'quagga';

export default {

    options: {
        locate: true,
        decoder: {
            readers: ['ean_reader'],
        },
    },

    async decode(data) {
        return await new Promise((resolve, reject) => {
            Quagga.decodeSingle({
                ...this.options,
                src: data,
            },
            (result) => {
                if (!result.codeResult) {
                    return reject();
                }

                return resolve(result);
            });
        });
    },

    async decodeStream(targetElement) {
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
            (error) => {
                if (error) {
                    return reject(error);
                }

                Quagga.start();

                Quagga.onDetected((result) => {
                    Quagga.stop();
                    return resolve(result);
                });
            });
        });
    },

    userHasCapabilities() {
        return navigator.mediaDevices
                && typeof navigator.mediaDevices.getUserMedia === 'function';
    },
}