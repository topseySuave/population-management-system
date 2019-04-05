import express from 'express';
import LocationController from '../../controllers/v1/Location.controller';
import LocationMiddleware from '../../location.middleware';

const router = express.Router();

router.post('/locations', LocationMiddleware.checkLocationReqBody, LocationController.createLocation);
router.get('/locations', LocationController.getAllLocations);
router.put('/locations/:id', LocationController.updateLocation);
router.delete('/locations/:id', LocationController.removeLocation);

router.post('/locations/sublocations', LocationMiddleware.checkCreateSublocationReqBody, LocationController.createSublocation);
router.put('/locations/sublocations/:id/parent/:parentId', LocationMiddleware.checkUpdateSublocationReqBody, LocationController.updateSubLocations);
router.delete('/locations/sublocations/:id/parent/:parentId', LocationController.removeSubLocation);

export default router;
