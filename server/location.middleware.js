class LocationMiddleware {
  static checkLocationReqBody(req, res, next) {
    const {
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
      name,
    } = req.body;

    if (!maleTotalPopulationCount) {
      return res.status(400).send({
        message: 'The Number of male resident field is required',
      });
    }

    if (!femaleTotalPopulationCount) {
      return res.status(400).send({
        message: 'The Number of female resident field is required',
      });
    }

    if (!name) {
      return res.status(400).send({
        message: 'The Name of location is required',
      });
    }

    return next();
  }

  static checkCreateSublocationReqBody(req, res, next) {
    const {
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
      subLocationName,
      parentId,
    } = req.body;

    if (!maleTotalPopulationCount) {
      return res.status(400).send({
        message: 'The Number of male resident field is required',
      });
    }

    if (!femaleTotalPopulationCount) {
      return res.status(400).send({
        message: 'The Number of female resident field is required',
      });
    }

    if (!subLocationName) {
      return res.status(400).send({
        message: 'The Name of sublocation is required',
      });
    }

    if (!parentId) {
      return res.status(400).send({
        message: 'The parent location id is required',
      });
    }

    return next();
  }

  static checkUpdateSublocationReqBody(req, res, next) {
    const {
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
      subLocationName,
    } = req.body;

    if (!maleTotalPopulationCount) {
      return res.status(400).send({
        message: 'The Number of male resident field is required',
      });
    }

    if (!femaleTotalPopulationCount) {
      return res.status(400).send({
        message: 'The Number of female resident field is required',
      });
    }

    if (!subLocationName) {
      return res.status(400).send({
        message: 'The Name of sublocation is required',
      });
    }

    return next();
  }
}

export default LocationMiddleware;
