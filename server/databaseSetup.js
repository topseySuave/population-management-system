import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.serverUrl = process.env.NODE_ENV === 'development' ? `mongodb://${process.env.SERVER}/${process.env.DATABASE_NAME}` : 'mongodb://gabmicah:textforoutput20@ds145574.mlab.com:45574/output-sms';
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
