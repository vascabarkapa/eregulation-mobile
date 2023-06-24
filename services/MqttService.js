import { Client, Message } from 'paho-mqtt';

class MqttService {
  constructor() {
    this.clientId = 'clientId' + Math.random().toString(16).substr(2, 8); // Generate a random client ID
    this.userName = 'eregulation'; // Replace with your MQTT username
    this.password = 'eRegulation123!'; // Replace with your MQTT password

    this.client = new Client('e3a0ad2ab69842fbb684a383f2306b47.s2.eu.hivemq.cloud', 8884, 'clientId' + Math.random(1, 1000));
  }

  connect(onConnect, onFailure) {
    this.client.connect({
      onSuccess: onConnect,
      onFailure: onFailure,
      useSSL: true,
      userName: this.userName,
      password: this.password,
    });
  }

  subscribe(topic, onMessageArrived) {
    this.client.subscribe(topic);
    this.client.onMessageArrived = onMessageArrived;
  }

  unsubscribe(topic) {
    this.client.unsubscribe(topic);
  }

  send(topic, message) {
    const mqttMessage = new Message(message);
    mqttMessage.destinationName = topic;
    this.client.send(mqttMessage);
  }
}

export default new MqttService();
