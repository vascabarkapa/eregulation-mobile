import { Client } from 'paho-mqtt';


const mqttHost = 'broker.hivemq.com'; // Replace with your MQTT broker host
const mqttPort = Number(8000); // Replace with the appropriate port for your MQTT broker

class MQTTClient {
  constructor(topic, onMessageReceived) {
    this.client = new Client(mqttHost, mqttPort, 'clientId-' + Math.random().toString(36).substring(7));
    this.topic = topic;
    this.onMessageReceived = onMessageReceived;
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  }

  connect() {
    this.client.connect({
      onSuccess: this.onConnect,
      onFailure: this.onConnectFailure,
    });
  }

  disconnect() {
    this.client.disconnect();
  }

  onConnect = () => {
    console.log('Connected to MQTT broker');
    this.client.subscribe(this.topic);
  };

  onConnectFailure = (error) => {
    console.log('Failed to connect to MQTT broker:', error);
  };

  onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('Connection lost:', responseObject.errorMessage);
    }
  };

  onMessageArrived = (message) => {
    const payload = message.payloadString;
    console.log('Message received:', payload);
    this.onMessageReceived(payload);
  };

  publishMessage(message) {
    const mqttMessage = new window.Paho.MQTT.Message(message);
    mqttMessage.destinationName = this.topic;
    this.client.send(mqttMessage);
  }
}

export default MQTTClient;
