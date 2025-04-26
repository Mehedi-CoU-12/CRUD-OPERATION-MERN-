import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { connectDB } from './db/database.js';

const PORT=process.env.PORT || 8000;

connectDB();
app.listen(PORT,()=>{
    console.log(`SERVER LISTEN ON PORT: http://localhost:${PORT}`);
})