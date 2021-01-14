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

app.use(express.json());

//@@ desc routes
app.use('/api/users',userRoutes);

// @@ desc global error handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})


app.listen(PORT,()=>{ console.log(`Server is successfully connected on ${PORT}`)});

module.exports = app;