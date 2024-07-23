const mongoose = require('mongoose');

const express = require('express')

const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();
const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: { type: String, required: true },
  mySID: { type: String, required: true }
});

// Create a Model object
const Student = mongoose.model('s24students', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const uri = req.body.myuri;

  try {
    // connect to the database and log the connection
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Summer24'
    });
    console.log('Connected to MongoDB');

    // add the data to the database

    // Create a document
    const newStudent = new Student({
      myName: 'Timothy Donato', 
      mySID: '300392122'  
    });

    // Save the document
    await newStudent.save();

    // send a response to the user
    res.send(`<h1>Document  Added</h1>`);
  } catch (error) {
    console.error('Error connecting to MongoDB or saving document:', error);
    res.status(500).send(`<h1>Error: ${error.message}</h1>`);
  } finally {
    // Close the connection after use
    mongoose.connection.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
