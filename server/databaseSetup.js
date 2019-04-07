import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    let serverUrl;
    if (process.env.NODE_ENV === 'development') {
      serverUrl = `mongodb://${process.env.SERVER}/${process.env.DATABASE_NAME}`;
    } else if (process.env.NODE_ENV === 'test') {
      serverUrl = `mongodb://${process.env.SERVER}/${process.env.DATABASE_TEST_NAME}`;
    } else {
      serverUrl = 'mongodb://gabmicah:textforoutput20@ds145574.mlab.com:45574/output-sms';
    }
    this.serverUrl = serverUrl;
    this.connect();
  }

  async connect() {
    // Make the connection to the database
    await mongoose.connect(this.serverUrl, {
      useNewUrlParser: true,
    });
    console.log('Database has full connection');
  }
}

export default Database;
