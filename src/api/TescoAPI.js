import axios from 'axios';

const baseURL = '/api/tesco';

/**
 * Constructs a Tesco API GET request, adding the necessary security header.
 *
 * @param {string} url A Tesco API endpoint to call.
 */
const query = async (url) => {
    return await axios.get(`${baseURL}${url}`);
};

export default {

    /**
     * Searches for a Tesco product related to the given search term.
     *
     * @param {string} searchTerm Product to be searched for.
     * @param {number} page Which page number the products should be returned
     *                      from.
     */
    async searchProduct(searchTerm, page = 0) {
        return await query(`/search/${searchTerm}/${page}`);
    },

    async searchShops(location, services) {
        return await query(`/shop/search/${location}`);
    },
}