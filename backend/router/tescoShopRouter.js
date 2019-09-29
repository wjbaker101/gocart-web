const tescoShopRouter = require('express').Router();

const tescoShopService = require('../service/tescoShopService.js');

tescoShopRouter.get('/tesco/shop/search/:location', async (req, res) => {
    const { location } = req.params;

    const shops = await tescoShopService.searchShops(location, null);

    if (shops instanceof Error) {
        return res.status(400).send({ error: shops.message });
    }

    return res.status(200).send({ result: shops });
});

module.exports = tescoShopRouter;
