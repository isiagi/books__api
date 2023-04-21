import dotenv from 'dotenv'

dotenv.config()

import {connect} from 'mongoose';

const connectDB = async () => {
    try {
      await connect(process.env.localDB as string);
      console.log('DB connection established');
    } catch (error: any) {
      console.log('Error connecting', error.message);
    }
  
    const db = connect;
    return db;
  };

export default connectDB