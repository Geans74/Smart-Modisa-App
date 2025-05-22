const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

const animalSchema = new mongoose.Schema({
  tagId: String,
  name: String,
  species: String,
  breed: String,
  birthDate: Date,
  weight: Number,
  healthStatus: String,
  vaccinationStatus: String,
  feedingPlan: String,
  productionData: String,
  sensorData: {
    temperature: Number,
    heartRate: Number,
    activityLevel: Number,
    lastUpdated: Date,
  }
});

const Animal = mongoose.model('Animal', animalSchema);

const marketSchema = new mongoose.Schema({
  tagId: String,
  imageUrl: String,
  description: String,
  datePosted: { type: Date, default: Date.now }
});

const MarketItem = mongoose.model('MarketItem', marketSchema);

const consultationSchema = new mongoose.Schema({
  symptoms: String,
  animalTagId: String,
  farmerEmail: String,
  dateRequested: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

// Routes

app.post('/animals', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).send(animal);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/animals', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.send(animals);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/animals/:tagId', async (req, res) => {
  try {
    const animal = await Animal.findOne({ tagId: req.params.tagId });
    if (!animal) return res.status(404).send({ message: 'Animal not found' });
    res.send(animal);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/sensor-update/:tagId', async (req, res) => {
  try {
    const { temperature, heartRate, activityLevel } = req.body;
    const animal = await Animal.findOne({ tagId: req.params.tagId });
    if (!animal) return res.status(404).send({ message: 'Animal not found' });

    animal.sensorData = {
      temperature,
      heartRate,
      activityLevel,
      lastUpdated: new Date()
    };
    await animal.save();
    res.send(animal);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/market', async (req, res) => {
  try {
    const item = new MarketItem(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/market', async (req, res) => {
  try {
    const items = await MarketItem.find().sort({ datePosted: -1 });
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/consultation', async (req, res) => {
  try {
    const consult = new Consultation(req.body);
    await consult.save();
    res.status(201).send(consult);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/consultations', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ dateRequested: -1 });
    res.send(consultations);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching consultations' });
  }
});

app.get('/', (req, res) => {
  res.send('AgriTech API is running');
});

app.listen(5000, () => console.log('Server running on port 5000'));
