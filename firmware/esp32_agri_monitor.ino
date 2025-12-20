// ESP32 Agricultural Monitoring Firmware Example
// Uses WiFi and MQTT to send sensor data for soil moisture, temperature, humidity

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// WiFi credentials
const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";

// MQTT broker details
const char* mqtt_server = "192.168.1.100";  // Replace with your broker IP or domain
const int mqtt_port = 1883;
const char* mqtt_user = "mqtt_user";
const char* mqtt_password = "mqtt_password";

WiFiClient espClient;
PubSubClient client(espClient);

// DHT sensor setup
#define DHTPIN 4          // DHT22 data pin connected to GPIO4
#define DHTTYPE DHT22     // DHT 22 (AM2302)
DHT dht(DHTPIN, DHTTYPE);

// Soil moisture sensor analog pin
const int soilMoisturePin = 34;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 30) {
    delay(500);
    Serial.print(".");
    retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("WiFi connection failed");
  }
}

void reconnect() {
  // Loop until we're reconnected to MQTT broker
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32AgriMonitor", mqtt_user, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read sensors
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int soilMoistureRaw = analogRead(soilMoisturePin);
  // Map soil moisture raw ADC reading to percentage (calibrate as needed)
  int soilMoisturePercent = map(soilMoistureRaw, 4095, 0, 0, 100);
  if (soilMoisturePercent < 0) soilMoisturePercent = 0;
  if (soilMoisturePercent > 100) soilMoisturePercent = 100;

  // Check if any reads failed
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Prepare JSON payload
  String payload = "{";
  payload += "\"temperature\":" + String(temperature, 1) + ",";
  payload += "\"humidity\":" + String(humidity, 1) + ",";
  payload += "\"soilMoisture\":" + String(soilMoisturePercent);
  payload += "}";

  Serial.print("Publishing: ");
  Serial.println(payload);

  client.publish("agri/field1/sensors", (char*) payload.c_str());

  delay(60000); // Publish every 60 seconds

  // Optional: deep sleep for power saving (uncomment if using deep sleep mode)
  // esp_deep_sleep_start();
}
