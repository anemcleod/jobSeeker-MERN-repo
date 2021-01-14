const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const searchRouter = require('./routes/searchRouter');

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());


//connect with Mongo DB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database");
});


app.use('/user', userRouter);
app.use('/search', searchRouter);


//listen on port
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`the server has started on ${Port}`)
);
