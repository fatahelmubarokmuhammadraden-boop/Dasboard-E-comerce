const mqtt = require('mqtt');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

// MQTT broker details
const mqttServer = 'mqtt://192.168.1.100';
const mqttOptions = {
  username: 'mqtt_user',
  password: 'mqtt_password'
};

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'agri_monitor';
const collectionName = 'sensor_data';

let dbClient;
let sensorCollection;

// Connect to MongoDB
async function connectMongo() {
  dbClient = new MongoClient(mongoUrl);
  await dbClient.connect();
  console.log('Connected to MongoDB');
  const db = dbClient.db(dbName);
  sensorCollection = db.collection(collectionName);
}

// MQTT client setup
const client = mqtt.connect(mqttServer, mqttOptions);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('agri/field1/sensors', (err) => {
    if (err) {
      console.error('Failed to subscribe to topic', err);
    } else {
      console.log('Subscribed to topic: agri/field1/sensors');
    }
  });
});

client.on('message', async (topic, message) => {
  try {
    if (topic === 'agri/field1/sensors') {
      const data = JSON.parse(message.toString());
      console.log('Received sensor data:', data);

      // Add timestamp
      data.timestamp = new Date();

      // Store in MongoDB
      await sensorCollection.insertOne(data);
      console.log('Data saved to MongoDB');
    }
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});

// Express API endpoint to get latest sensor data
app.get('/api/data', async (req, res) => {
  try {
    const latestData = await sensorCollection.find().sort({ timestamp: -1 }).limit(1).toArray();
    res.json(latestData[0] || {});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server and Mongo connection
async function startServer() {
  await connectMongo();
  app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });
}

startServer().catch(console.error);
