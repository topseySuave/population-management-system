import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    let serverUrl;
    if (process.env.NODE_ENV === 'development') {
      serverUrl = `mongodb://${process.env.SERVER}/${process.env.DATABASE_NAME}`;
    } else {
      serverUrl = 'mongodb://gabmicah:79xbkut4DvSZy8w@ds233596.mlab.com:33596/output-population';
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
