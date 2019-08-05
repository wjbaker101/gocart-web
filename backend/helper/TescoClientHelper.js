class TescoClientHelper {

    constructor() {}

    /**
     * Recreates an array of products based on the response from the Tesco API,
     * filling in any that were not returned with a null entry.
     *
     * The order of the products returned by the Tesco API may not be the same
     * as the input list.
     *
     * @param {array} tpncList List of the original tpnc IDs that were
     *                requested.
     * @param {array} productList List of products returned by the Tesco API,
     *                that may contain missing tpnc IDs.
     */
    reconstructProductList(tpncList, productList) {
        const sortedTPNCList = tpncList.sort((a, b) => b < a);
        const sortedProductList = productList.sort((a, b) => a.tpnc < b.tpnc);

        const finalProductList = [];

        let tpncIndex = 0;
        let productIndex = 0;

        while (productIndex < sortedProductList.length) {
            const currentProduct = sortedProductList[productIndex];

            while (tpncIndex < sortedTPNCList.length) {
                const currentTPNC = sortedTPNCList[tpncIndex++];

                if (currentTPNC === currentProduct.tpnc) {
                    finalProductList.push(currentProduct);
                    productIndex++;
                    break;
                }
                else {
                    finalProductList.push(null);
                }
            }
        }
    }
}

module.exports = new TescoClientHelper();