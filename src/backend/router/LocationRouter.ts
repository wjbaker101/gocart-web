import express from 'express';

import { LocationController } from '../controller/LocationController';

const locationRouter = express.Router();

locationRouter.get('/location/postcode/:latitude/:longitude', LocationController.getPostcodeFromGeocode);

export default locationRouter;
