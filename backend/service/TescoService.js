const tescoClient = require('../client/TescoClient.js');
const TescoProductBuilder = require('../model/TescoProductBuilder.js');

class TescoService {

    async searchProduct(searchTerm, page = 0) {
        const response = await tescoClient.searchProducts({ searchTerm, page } );

        return {
            result: response.uk.ghs.products.results
                    .map(product => TescoProductBuilder.fromResponse(product)),
        };
    }

    async getProducts(tpnc) {
        const response = await tescoClient.getProducts(tpnc);

        return {
            result: response.products,
        };
    }

    async getProduct(tpnc) {
        const response = await tescoClient.getProduct(tpnc);

        return {
            result: response.products[0],
        }
    }
}

module.exports = new TescoService();