const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('myparently');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

app.post('/api/register', async (req, res) => {
  const { name, emailId, password } = req.body;
  const db = await connectToDatabase();
  const users = db.collection('users');

  const existingUser = await users.findOne({ emailId });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({ name, emailId, password: hashedPassword });

  const token = jwt.sign({ emailId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ token });
});

app.post('/api/login', async (req, res) => {
  const { emailId, password } = req.body;
  const db = await connectToDatabase();
  const users = db.collection('users');

  const user = await users.findOne({ emailId });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ emailId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));