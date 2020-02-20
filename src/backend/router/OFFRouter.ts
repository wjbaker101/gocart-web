import express from 'express';

import { OFFController } from '../controller/OFFController';

const offRouter = express.Router();

offRouter.get('/product-data/:barcodeID', OFFController.getProductData);

export default offRouter;
