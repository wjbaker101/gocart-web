const express = require('express');
const tescoRouter = express.Router();

const tescoService = require('../service/TescoService.js');

tescoRouter.get('/tesco/search/:searchTerm/:page?', async (req, res) => {
    const { searchTerm, page } = req.params;
    const response = await tescoService.searchProduct(searchTerm, page);

    res.send(response);
});

tescoRouter.get('/tesco/products/:tpncList', async (req, res) => {
    const { tpncList } = req.params;
    const list = tpncList.split(',');
    const uniques = [ ...new Set(list) ];

    const response = await tescoService.getProducts(uniques);

    res.send(response);
});

tescoRouter.get('/tesco/product/:tpnc', async (req, res) => {
    const { tpnc } = req.params;
    const response = await tescoService.getProduct(tpnc);

    res.send(response);
});

module.exports = tescoRouter;