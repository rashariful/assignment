import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDB } from './app/config';



const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
