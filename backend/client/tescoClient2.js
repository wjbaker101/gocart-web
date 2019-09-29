const axios = require('axios');
const secret = require('../../config/secretProperties.json');

module.exports = {

    async get(url) {
        console.log(url);
        try {
            const response = await axios.get(`https://dev.tescolabs.com${url}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': secret.tescoAPI.secretKey,
                },
            });

            return response.data;
        }
        catch(exception) {
            throw 'An error occurred when requesting Tesco API.';
        }
    },
}
