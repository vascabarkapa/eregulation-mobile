import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Linking
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { useFocusEffect } from '@react-navigation/native';
import { Block, Text } from '../components';
import * as FileSystem from 'expo-file-system';
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import LiveDot from '../components/LiveDot';
import MqttService from '../services/MqttService';
import Regex from '../helpers/Regex';

const FILE_NAME = 'systemData.json';
const FILE_PATH = FileSystem.documentDirectory + FILE_NAME;

const redirectToStatistics = () => {
    Linking.openURL('https://eregulation.netlify.app');
};

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 3 && currentHour < 12) {
        return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 19) {
        return 'Good afternon';
    } else {
        return 'Good evening';
    }
};

const Dashboard = ({ navigation, settings }) => {
    const greeting = getGreeting();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);

    const TemperatureIcon = settings['temperature'].icon;
    const HumidityIcon = settings['humidity'].icon;
    const StatisticsIcon = settings['statistics'].icon;
    const SettingsIcon = settings['settings'].icon;

    const checkDataFile = async () => {
        const fileInfo = await FileSystem.getInfoAsync(FILE_PATH);

        if (!fileInfo.exists) {
            const initialData = {
                first_name: 'New',
                last_name: 'User',
            };

            const jsonString = JSON.stringify(initialData);
            await FileSystem.writeAsStringAsync(FILE_PATH, jsonString);

            const fileContent = await FileSystem.readAsStringAsync(FILE_PATH);
            const jsonData = JSON.parse(fileContent);
            setFirstName(jsonData.first_name);
            setLastName(jsonData.last_name);
        }

        const fileContent = await FileSystem.readAsStringAsync(FILE_PATH);
        const jsonData = JSON.parse(fileContent);
        setFirstName(jsonData.first_name);
        setLastName(jsonData.last_name);
    };

    useFocusEffect(() => {
        checkDataFile();
    });

    useEffect(() => {
        MqttService.connect(
            () => {
                console.log('MQTT connected');
                MqttService.subscribe('eregulation', onMessageArrived);
            },
            (error) => {
                console.error('MQTT connection failed:', error);
            }
        );

        return () => {
            MqttService.unsubscribe('eregulation');
            MqttService.client.disconnect();
        };
    }, []);

    const onMessageArrived = (message) => {
        const liveDataRegex = /^t-\d+-h-\d+$/;

        console.log('Received message:', message.payloadString);
        if (liveDataRegex.test(message.payloadString)) {
            const parsedLiveData = Regex.parseLiveTemperatureAndHumidity(message.payloadString);
            setTemperature(parsedLiveData.temperature);
            setHumidity(parsedLiveData.humidity);
        }
    };

    const sendMessage = () => {
        const message = 'Hello, MQTT!';
        MqttService.send('eregulation', message);
    };

    return (
        <Block style={styles.container}>
            <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Block style={styles.dashboard}>
                    <Block center>
                        <Image source={images.mainLogo} style={styles.logo} />
                    </Block>

                    <Block center column style={{ marginVertical: responsiveHeight(3.5) }}>
                        <Text welcome>{greeting}</Text>
                        <Text name>{(greeting && firstName && lastName) && (firstName + ' ' + lastName)}</Text>
                    </Block>

                    <Block row style={{ paddingVertical: responsiveHeight(1.5), marginHorizontal: responsiveHeight(1.5) }}>
                        <Block flex={2} row style={{ alignItems: 'flex-end', }}>
                            <Text h1>{temperature}</Text>
                            <Block column>
                                <LiveDot />
                                <Text h1 size={34} height={80} weight='600' spacing={-2}>°C</Text>
                            </Block>
                        </Block>
                        <Block flex={2} row right style={{ alignItems: 'flex-end', }}>
                            <Text h1>{humidity}</Text>
                            <Block column>
                                <LiveDot />
                                <Text h1 size={34} height={80} weight='600' spacing={-2}>%</Text>
                            </Block>
                        </Block>
                    </Block>

                    <View contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
                        <Block column space="between">
                            <Block row space="around" style={{ marginVertical: responsiveHeight(2) }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Temperature', { name: 'temperature' })}
                                >
                                    <Block center middle style={styles.button}>
                                        <TemperatureIcon size={38} />
                                        <Text
                                            button
                                            color={'secondary'}
                                            style={{ marginTop: responsiveHeight(1) }}
                                        >
                                            {settings['temperature'].name}
                                        </Text>
                                    </Block>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Humidity', { name: 'humidity' })}
                                >
                                    <Block center middle style={styles.button}>
                                        <HumidityIcon size={38} />
                                        <Text
                                            button
                                            color={'secondary'}
                                            style={{ marginTop: responsiveHeight(1) }}
                                        >
                                            {settings['humidity'].name}
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>

                            <Block row space="around" style={{ marginVertical: responsiveHeight(1) }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={redirectToStatistics}
                                >
                                    <Block center middle style={styles.button}>
                                        <StatisticsIcon size={38} />
                                        <Text
                                            button
                                            color={'secondary'}
                                            style={{ marginTop: responsiveHeight(1) }}
                                        >
                                            {settings['statistics'].name}
                                        </Text>
                                    </Block>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Settings', { name: 'settings' })}
                                >
                                    <Block center middle style={styles.button}>
                                        <SettingsIcon size={38} />
                                        <Text
                                            button
                                            color={'secondary'}
                                            style={{ marginTop: responsiveHeight(1) }}
                                        >
                                            {settings['settings'].name}
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                    </View>
                </Block>
            </ImageBackground>
        </Block>
    );
};

Dashboard.defaultProps = {
    settings: mocks,
};

export default Dashboard;

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        padding: responsiveHeight(3),
        marginTop: responsiveHeight(5),
    },
    logo: {
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
        width: '100%',
        height: responsiveHeight(6),
        resizeMode: 'contain',
    },
    buttons: {
        flex: 1,
    },
    button: {
        backgroundColor: theme.colors.primary,
        width: responsiveWidth(38),
        height: responsiveWidth(38),
        borderRadius: responsiveWidth(38) / 10,
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
})
