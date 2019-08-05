const axios = require('axios');
const secretProperties = require('../../config/secretProperties.json');
const tescoClientHelper = require('../helper/TescoClientHelper.js');

/**
 * This class will request the Tesco API endpoints, with any available
 * parameters defined by their API.
 */
class TescoClient {

    constructor() {
        this.baseURL = 'https://dev.tescolabs.com';
        this.resultLimit = 20;
    }

    /**
     * Constructs a Tesco API GET request, adding the necessary security header.
     *
     * @param {string} url A Tesco API endpoint to call.
     */
    async query(url) {
        try {
            const response = await axios.get(`${this.baseURL}${url}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key':
                            secretProperties.tescoAPI.secretKey,
                }
            });

            return response.data;
        }
        catch(exception) {
            throw 'An error occurred when requesting Tesco API.';
        }
    }

    /**
     * Searches for a Tesco product related to the given search term.
     *
     * @param {string} searchTerm Product to be searched for.
     * @param {number} offset The index to start the search at. Used for
     *                 pagination.
     * @param {number} limit The maximum number of products that should be
     *                 returned.
     */
    async searchProducts({
        searchTerm,
        offset = 0,
        limit = this.resultLimit,
    }) {

        return await this.query(`/grocery/products/?query=${searchTerm}&offset=${offset}&limit=${limit}`);
    }

    /**
     * Gets a list of individual product data of the given ID types.
     *
     * @param {list} gtin An array of products to get with the gtin IDs.
     * @param {list} tpnb An array of products to get with the tpnb IDs.
     * @param {list} tpnc An array of products to get with the tpnc IDs.
     * @param {list} catid An array of products to get with the catid IDs.
     */
    async getProducts({
        gtin = [],
        tpnb = [],
        tpnc = [],
        catid = [],
    }) {

        // Return null if no ID exists. We don't return an empty list as it
        // might be confused with no products being returned
        if (gtin.length + tpnb.length + tpnc.length + catid.length === 0) {
            return null;
        }

        const gtinList = gtin
                .map(p => `gtin=${p}`)
                .join('&');

        const tpnbList = tpnb
                .map(p => `tpnb=${p}`)
                .join('&');

        const tpncList = tpnc
                .map(p => `tpnc=${p}`)
                .join('&');

        const catidList = catid
                .map(p => `catid=${p}`)
                .join('&');

        const joined = [gtinList, tpnbList, tpncList, catidList].join('&');

        return await this.query(`/product/?${joined}`);
    }
}

module.exports = new TescoClient();