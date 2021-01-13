const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const { PORT, MONGO_URI } = process.env;

//@@ desc MongoDB
mongoose.connect(MONGO_URI,{
  useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {console.log("MongoDB is successfully connected")}).catch(err =>{console.log("Something happened in MongoDB")})

//@@ desc routes
app.use('/api/users',userRoutes);
 
app.listen(PORT,()=>{ console.log(`Server is successfully connected on ${PORT}`)});
