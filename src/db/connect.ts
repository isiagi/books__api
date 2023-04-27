import dotenv from 'dotenv'
// import Book from "../models/bookModel"
// import {data} from '../../utils/utils'

dotenv.config()

import {connect} from 'mongoose';

const connectDB = async () => {
    try {
      await connect(process.env.remoteDB as string);
      console.log('DB connection established');

    // await Book.deleteMany(); // removing all previous data (if any) (Never use this in production)
    // const dataz = await Book.insertMany(data);
    // console.log(dataz);
      
    } catch (error: any) {
      console.log('Error connecting', error.message);
    }
  
    const db = connect;
    return db;
  };

export default connectDB