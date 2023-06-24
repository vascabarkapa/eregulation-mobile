import { Client, Message } from 'paho-mqtt';

class MQTTClient {
  constructor() {
    this.client = new Client('e3a0ad2ab69842fbb684a383f2306b47.s2.eu.hivemq.cloud', 8884, 'clientId' + Math.random(1, 1000));
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.isConnected = false;
  }

  connect(username, password) {
    const options = {
      userName: username,
      password: password,
      useSSL: true,
      onSuccess: this.onConnect.bind(this),
      onFailure: this.onConnectionFailed.bind(this),
    };

    this.client.connect(options);
  }

  disconnect() {
    if (this.isConnected) {
      this.client.disconnect();
    }
  }

  onConnect() {
    console.log('Connected to HiveMQ Cloud');
    this.isConnected = true;

    // Subscribe to a topic after connecting
    this.client.subscribe('eregulation');
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection lost:', responseObject.errorMessage);
    }
    this.isConnected = false;
  }

  onConnectionFailed(responseObject) {
    console.log('Connection failed:', responseObject.errorMessage);
    this.isConnected = false;
  }

  onMessageArrived(message) {
    console.log('Received message:', message.payloadString);
    // Process the received message here
    return message.payloadString;
  }

  sendMessage(topic, payload) {
    if (this.isConnected) {
      const message = new Message(payload);
      message.destinationName = topic;
      this.client.send(message);
    } else {
      console.log('Not connected to HiveMQ Cloud');
    }
  }
}

export default MQTTClient;
