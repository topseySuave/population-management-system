import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../';
import util from 'util';
import dotenv from 'dotenv';
import { doesNotReject } from 'assert';
import Location from '../model';

dotenv.config();

const { DATABASE_NAME: dbName, SERVER: dbServer } = process.env;
// this.serverUrl = process.env.NODE_ENV === 'development' ? `mongodb://${process.env.SERVER}/${process.env.DATABASE_NAME}` : 'mongodb://gabmicah:textforoutput20@ds145574.mlab.com:45574/output-sms';

const testUrl = `mongodb://${dbServer}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(testUrl);
mongoose.connection
  .once('open', () => console.log('connected to test database'))
  .on('error', (error) => {
    console.warn('Error occurred connecting to test database : ', error);
  });

const server = request(app);
let seed;
let seedWithNoSublocation;
let seedWithSublocation;

describe('POPULATION MANAGEMENT API TEST', () => {
  before(async() => {});
});
