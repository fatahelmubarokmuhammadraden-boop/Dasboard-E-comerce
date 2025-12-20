async function fetchSensorData() {
  try {
    const response = await fetch('http://localhost:3000/api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    document.getElementById('temperature').textContent = data.temperature ? data.temperature + ' °C' : 'N/A';
    document.getElementById('humidity').textContent = data.humidity ? data.humidity + ' %' : 'N/A';
    document.getElementById('soilMoisture').textContent = data.soilMoisture ? data.soilMoisture + ' %' : 'N/A';
    document.getElementById('lastUpdated').textContent = data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A';
  } catch (error) {
    console.error('Failed to fetch sensor data:', error);
  }
}

// Fetch sensor data every 60 seconds
fetchSensorData();
setInterval(fetchSensorData, 60000);
