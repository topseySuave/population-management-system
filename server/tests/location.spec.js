/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import {
  expect,
} from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '..';
import LocationModel from '../model';

const server = request(app);
let seed;
let seedWithSublocation;
let seedWithNoSublocation;

const locationsRoute = '/api/v1/locations';
const subLocationsRoute = `${locationsRoute}/sublocations`;

describe('POPULATION MANAGEMENT API TEST', () => {
  before(async () => {
    await mongoose.connection.collections.locations.drop();
    console.log('locations collection dropped');
    const seedLocation = new LocationModel({
      name: 'vikendi',
      subLocations: [{
        maleTotalPopulationCount: 1253,
        femaleTotalPopulationCount: 1243,
        subLocationName: 'castle',
      }],
    });

    seedLocation.save().then((record) => {
      seed = record;
    });
  });

  describe('Location post endpoint', () => {
    it('should create a location successfully', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          name: 'miramar',
          maleTotalPopulationCount: 5,
          femaleTotalPopulationCount: 15,
          subLocationName: 'picanto',
        });

      const {
        message,
        data,
      } = response.body;
      expect(message).to.equal('Location created successfully');
      expect(data.maleTotalPopulationCount).to.equal(5);
      expect(data.femaleTotalPopulationCount).to.equal(15);
      expect(data.totalPopulationCount).to.equal(20);
      expect(data.name).to.equal('miramar');
    });

    it('should throw error when maleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations\' endpoint', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          name: 'sanhok',
          femaleTotalPopulationCount: 3,
          subLocationName: 'the cave',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of male resident field is required');
    });

    it('should throw error when femaleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations\' endpoint', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          name: 'sanhok',
          maleTotalPopulationCount: 5,
          subLocationName: 'the cave',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of female resident field is required');
    });

    it('should throw error when name is not supplied in the request body for \'/api/v1/locations\' endpoint', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          femaleTotalPopulationCount: 3,
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Name of location is required');
    });


    it('should create sub location successfully', async () => {
      const response = await server
        .post(subLocationsRoute)
        .set('Accept', 'Application/json')
        .send({
          parentId: seed._id,
          maleTotalPopulationCount: 9,
          femaleTotalPopulationCount: 9,
          subLocationName: 'the cave',
        });
      const {
        message,
        data,
      } = response.body;
      seedWithSublocation = data;
      expect(message).to.equal('sublocation added to parent location successfully');
      expect(data.subLocations.length).to.equal(2);
      expect(data.subLocations[1].subLocationName).to.equal('the cave');
    });

    it('should return 500 if no parent location is found for \'/api/v1/locations/sublocations\'', async () => {
      const response = await server
        .post(subLocationsRoute)
        .set('Accept', 'Application/json')
        .send({
          parentId: 'wieuncsdmd',
          maleTotalPopulationCount: 9,
          femaleTotalPopulationCount: 9,
          subLocationName: 'vikendi',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('error occured adding a sublocation to parent location');
    });

    it('should throw error when maleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations/sublocations\' endpoint', async () => {
      const response = await server
        .post(subLocationsRoute)
        .set('Accept', 'Application/json')
        .send({
          femaleTotalPopulationCount: 3,
          subLocationName: 'vikendi',
          parentId: 'rubbish',

        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of male resident field is required');
    });

    it('should throw error when femaleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations/sublocations\' endpoint', async () => {
      const response = await server
        .post(subLocationsRoute)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          subLocationName: 'miramar',
          parentId: 'parentId',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of female resident field is required');
    });

    it('should throw error when subLocationName is not supplied in the request body for \'/api/v1/locations/sublocations\' endpoint', async () => {
      const response = await server
        .post(subLocationsRoute)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          femaleTotalPopulationCount: 3,
          parentId: 'parentId',
        });
      const {
        message,
        data,
      } = response.body;
      expect(message).to.equal('The Name of sublocation is required');
    });

    it('should throw error when parentId is not supplied in the request body for \'/api/v1/locations/sublocations\' endpoint', async () => {
      const response = await server
        .post(subLocationsRoute)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          femaleTotalPopulationCount: 3,
          subLocationName: 'vikendi',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The parent location id is required');
    });


    it('should create location with no sublocation', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 9,
          femaleTotalPopulationCount: 9,
          name: 'sanhok',
        });
      const {
        message,
        data,
      } = response.body;
      seedWithNoSublocation = data;
      expect(message).to.equal('Location created successfully');
      expect(data.name).to.equal('sanhok');
    });

    it('should throw error when maleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations\' endpoint', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          femaleTotalPopulationCount: 3,
          subLocanametionName: 'valhar',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of male resident field is required');
    });

    it('should throw error when femaleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations\' endpoint', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          name: 'VI',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of female resident field is required');
    });

    it('should throw error when name is not supplied in the request body for \'/api/v1/locations\' endpoint', async () => {
      const response = await server
        .post(locationsRoute)
        .set('Accept', 'Application/json')
        .send({
          femaleTotalPopulationCount: 3,
          maleTotalPopulationCount: 3,
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Name of location is required');
    });

    it('should get all locations and their resident count', async () => {
      const response = await server
        .get(locationsRoute);
      const {
        message,
        locations,
      } = response.body;
      expect(locations.length).to.be.greaterThan(1);
      expect(message).to.equal('locations retrieved successfully');
    });

    it('should update location with no sublocation', async () => {
      const response = await server
        .put(`${locationsRoute}/${seedWithNoSublocation._id}`)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 9,
          femaleTotalPopulationCount: 9,
          name: 'docks',
        });
      const {
        message,
        data,
      } = response.body;
      expect(message).to.equal('Location updated successfully');
      expect(data.name).to.equal('docks');
    });

    it('should update sublocation', async () => {
      const response = await server
        .put(`${locationsRoute}/sublocations/${seedWithSublocation.subLocations[1]._id}/parent/${seedWithSublocation._id}`)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 9,
          femaleTotalPopulationCount: 7,
          subLocationName: 'docks',
        });
      const {
        message,
        data,
      } = response.body;
      expect(message).to.equal('Location updated successfully');
      expect(data.subLocations.length).to.equal(2);
      expect(data.subLocations[1].subLocationName).to.equal('docks');
      expect(data.subLocations[1].totalPopulationCount).to.equal(16);
    });

    it('should throw error when maleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations/sublocations/:id/parent/:parentId\' endpoint', async () => {
      const response = await server
        .put(`${locationsRoute}/sublocations/${seedWithSublocation.subLocations[1]._id}/parent/${seedWithSublocation._id}`)
        .set('Accept', 'Application/json')
        .send({
          femaleTotalPopulationCount: 3,
          subLocationName: 'pi',
          parentId: 'parentId',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of male resident field is required');
    });

    it('should throw error when femaleTotalPopulationCount is not supplied in the request body for \'/api/v1/locations/sub/:id/parent/:parentId\' endpoint', async () => {
      const response = await server
        .put(`${locationsRoute}/sublocations/${seedWithSublocation.subLocations[1]._id}/parent/${seedWithSublocation._id}`)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          subLocationName: 'waves',
          parentId: 'parentId',
        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Number of female resident field is required');
    });

    it('should throw error when subLocationName is not supplied in the request body for \'/api/v1/locations/apex/:parentId/sub/:id\' endpoint', async () => {
      const response = await server
        .put(`${locationsRoute}/sublocations/${seedWithSublocation.subLocations[1]._id}/parent/${seedWithSublocation._id}`)
        .set('Accept', 'Application/json')
        .send({
          maleTotalPopulationCount: 3,
          femaleTotalPopulationCount: 3,
          parentId: 'parentId',

        });
      const {
        message,
      } = response.body;
      expect(message).to.equal('The Name of sublocation is required');
    });

    it('should try to delete a location that does not exist', async () => {
      const response = await server
        .delete(`${locationsRoute}/3245678654321merkjnhb`)
        .set('Accept', 'Application/json');
      const {
        message,
      } = response.body;
      expect(message).to.equal('error occurred deleting location');
    });

    it('should delete location', async () => {
      const response = await server
        .delete(`${locationsRoute}/${seedWithNoSublocation._id}`)
        .set('Accept', 'Application/json');
      const {
        message,
      } = response.body;
      expect(message).to.equal('location removed successfully');
    });

    it('should try to delete a sublocation that does not exist', async () => {
      const response = await server
        .delete(`${locationsRoute}/3245678654321merkjnhb`)
        .set('Accept', 'Application/json');
      const {
        message,
      } = response.body;
      expect(message).to.equal('error occurred deleting location');
    });

    it('should delete sublocation', async () => {
      const response = await server
        .delete(`${locationsRoute}/sublocations/${seedWithSublocation.subLocations[1]._id}/parent/${seedWithSublocation._id}`)
        .set('Accept', 'Application/json');
      const {
        message,
      } = response.body;
      expect(message).to.equal('sublocation deleted successfully');
    });
  });
});
