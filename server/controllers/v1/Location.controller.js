/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import LocationModel from '../../model';

class LocationController {
  static async getAllLocations(req, res) {
    try {
      const locations = await LocationModel.find();
      if (locations) {
        return res.status(201).send({
          message: 'locations retrieved successfully',
          locations,
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: 'something happened retrieving locations',
        error: err.message,
      });
    }
  }

  static createLocation(req, res) {
    const {
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
      name,
    } = req.body;

    const locationWithNoSubLocation = new LocationModel({
      name,
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
    });

    locationWithNoSubLocation.save()
      .then((record) => {
        LocationModel.updateOne({
          _id: record._id,
        }, {
          $set: {
            totalPopulationCount: record.maleTotalPopulationCount + record.femaleTotalPopulationCount,
          },
        })
          .then(() => LocationModel.findById(record._id).then(data => res.status(200).send({
            message: 'Location created successfully',
            data,
          })))
          .catch(err => res.status(500).send({
            message: 'There was an error updating the location record',
          }));
      })
      .catch(err => res.status(500).send({
        message: 'There was an error saving this location',
      }));
  }

  static async updateLocation(req, res) {
    const {
      id,
    } = req.params;
    const {
      name,
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
    } = req.body;
    LocationModel.findById(id)
      .then((record) => {
        record.updateOne({
          name,
          maleTotalPopulationCount,
          femaleTotalPopulationCount,
          totalPopulationCount: maleTotalPopulationCount + femaleTotalPopulationCount,
        })
          .then(() => LocationModel.findById(record._id).then(data => res.status(200).send({
            message: 'Location updated successfully',
            data,
          })))
          .catch(err => res.status(500).send({
            message: 'error occured updating location',
          }));
      });
  }

  static removeLocation(req, res) {
    const {
      id,
    } = req.params;
    LocationModel.findOneAndDelete({
      _id: id,
    })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: 'location not found',
          });
        }
        res.status(200).send({
          message: 'location removed successfully',
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'error occurred deleting location',
          error: err.message,
        });
      });
  }

  /**
   * Adding, updating and removing a sub location
   *  */
  static createSublocation(req, res) {
    const {
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
      parentId,
      subLocationName,
    } = req.body;

    const subLocation = {
      subLocationName,
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
      totalTotalPopulationCount: maleTotalPopulationCount + femaleTotalPopulationCount,
      parentId,
    };

    LocationModel.findOne({
      _id: parentId,
    })
      .then((record) => {
        if (!record) {
          return res.status(400).send({
            message: 'Parent location not found',
          });
        }

        record.subLocations = [...record.subLocations, subLocation];
        record.save()
          .then(foundRecord => res.status(201).send({
            message: 'sublocation added to parent location successfully',
            data: foundRecord,
          }));
      })
      .catch(err => res.status(500).send({
        message: 'error occured adding a sublocation to parent location',
        error: err.message,
      }));
  }

  static updateSubLocations(req, res) {
    const {
      parentId,
      id,
    } = req.params;
    const {
      subLocationName,
      maleTotalPopulationCount,
      femaleTotalPopulationCount,
    } = req.body;

    LocationModel.updateOne({
      _id: parentId,
      'subLocations._id': id,
    }, {
      $set: {
        'subLocations.$.maleTotalPopulationCount': maleTotalPopulationCount,
        'subLocations.$.femaleTotalPopulationCount': femaleTotalPopulationCount,
        'subLocations.$.subLocationName': subLocationName,
        'subLocations.$.totalPopulationCount': femaleTotalPopulationCount + maleTotalPopulationCount,
      },
    }).then(data => LocationModel.findById(parentId).then(newData => res.status(200).send({
      message: 'Location updated successfully',
      data: newData,
    })))
      .catch(err => res.status(500).send({
        message: 'error occured updating sub location name',
        error: err.message,
      }));
  }

  static removeSubLocation(req, res) {
    const {
      id,
      parentId,
    } = req.params;
    LocationModel.findOne({
      _id: parentId,
      'subLocations._id': id,
    })
      .then((record) => {
        if (!record) {
          return res.status(400).send({
            message: 'Parent location not found',
          });
        }
        if (!record.subLocations.length > 0) {
          return res.status(422).send({
            message: 'location does not have sub locations',
          });
        }

        record.subLocations.pull(id);
        record.save()
          .then(() => res.status(200).send({
            message: 'sublocation deleted successfully',
          }))
          .catch(err => res.status(200).send({
            message: 'error occurred when deleting sublocation',
          }));
      })
      .catch(err => res.status(200).send({
        message: 'error occurred when deleting sublocation',
      }));
  }
}

export default LocationController;
