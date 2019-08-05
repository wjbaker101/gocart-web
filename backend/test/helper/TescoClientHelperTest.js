const assert = require('assert');
const tescoClientHelper = require('../../helper/TescoClientHelper.js');

const tpncList = [1, 2, 3, 4, 5, 6, 7, 8, 9, ];

const productList = [
    { tpnc: 1 },
    { tpnc: 3 },
    { tpnc: 4 },
    { tpnc: 6 },
    { tpnc: 7 },
    { tpnc: 9 },
];

const expectedList = [
    { tpnc: 1 },
    null,
    { tpnc: 3 },
    { tpnc: 4 },
    null,
    { tpnc: 6 },
    { tpnc: 7 },
    null,
    { tpnc: 9 },
];

describe('reconstructProductList()', function() {
    describe('given 2 valid inputs', function() {
        it('should return the correct final product list', function() {
            const result = tescoClientHelper
                    .reconstructProductList(tpncList, productList);

            assert.equal(result, expectedList);
        });
    });
});
