import express from 'express';

import TescoController from '../controller/TescoController';

const tescoRouter = express.Router();

tescoRouter.get('/product/search/:searchTerm', TescoController.getGrocerySearch);
tescoRouter.get('/product/tpnc/:tpnc', TescoController.getProductDataByTPNC);
tescoRouter.get('/product/gtin/:gtin', TescoController.getProductDataByGTIN);

tescoRouter.get('/shop/search/:searchTerm', TescoController.getNearbyShops);

export default tescoRouter;
