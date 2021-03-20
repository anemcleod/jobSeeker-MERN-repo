const express = require('express');
//uncomment for production build
//const path = require('path');
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


// Have Node serve the files for our built React app
//uncomment for production build
// app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);

// All other GET requests not handled before will return our React app
//uncomment for production build
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  // });


//listen on port
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`the server has started on ${Port}`)
);
