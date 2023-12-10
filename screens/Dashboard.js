import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import {
    ImageBackground,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Linking,
    ScrollView,
    RefreshControl,
    Animated,
    Easing
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { GlobalContext } from '../contexts/GlobalContext';
import { Block, Text } from '../components';
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import MqttService from '../services/MqttService';
import Regex from '../helpers/Regex';
import Toast from 'react-native-root-toast';

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

    const opacityValue = useRef(new Animated.Value(1)).current;

    const TemperatureIcon = settings['temperature'].icon;
    const HumidityIcon = settings['humidity'].icon;
    const StatisticsIcon = settings['statistics'].icon;
    const LightIcon = settings['light'].icon;

    const [refreshing, setRefreshing] = useState(false);

    const {
        liveTemperature,
        setLiveTemperature,
        liveHumidity,
        setLiveHumidity,
        liveLight,
        setLiveLight,
        setMinTemperature,
        setMaxTemperature,
        setMinHumidity,
        setMaxHumidity,
        isTurnedOnTemperatureRegulation,
        setIsTurnedOnTemperatureRegulation,
        isTurnedOnHumidityRegulation,
        setIsTurnedOnHumidityRegulation
    } = useContext(GlobalContext);

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacityValue, {
                        toValue: 0.3,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 2,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animate();
    }, [opacityValue, isTurnedOnHumidityRegulation, isTurnedOnTemperatureRegulation]);

    useEffect(() => {
        MqttService.connect(
            () => {
                console.log('MQTT connected');
                MqttService.subscribe('eregulation/android', onMessageArrived);
                MqttService.subscribe('eregulation/arduino', onMessageArrived);
                MqttService.send('eregulation/arduino', 'welcome');

                Toast.show('Connected to broker', {
                    duration: 1000,
                    position: -responsiveHeight(5),
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: theme.colors.green
                });
            },
            (error) => {
                console.error('MQTT connection failed:', error);
            }
        );

        return () => {
            MqttService.unsubscribe('eregulation/android');
            MqttService.unsubscribe('eregulation/arduino');
            MqttService.client.disconnect();
        };
    }, []);

    const onMessageArrived = (message) => {
        console.log('Received message:', message.payloadString);

        const liveDataRegex = /^t-\d+-h-\d+-l-\d+$/;
        const configDataRegex = /^t-\d+-\d+-\d+-\d+-h-\d+-\d+-\d+-\d+-l-\d+$/;

        if (configDataRegex.test(message.payloadString)) {
            const parsedConfigData = Regex.parseConfigData(message.payloadString);

            setLiveTemperature(parsedConfigData.liveTemperature);
            setIsTurnedOnTemperatureRegulation(parsedConfigData.isTurnedOnTemperatureRegulation === 1 ? true : false);
            setMinTemperature(parsedConfigData.minTemperature);
            setMaxTemperature(parsedConfigData.maxTemperature);

            setLiveHumidity(parsedConfigData.liveHumidity);
            setIsTurnedOnHumidityRegulation(parsedConfigData.isTurnedOnHumidityRegulation === 1 ? true : false);
            setMinHumidity(parsedConfigData.minHumidity);
            setMaxHumidity(parsedConfigData.maxHumidity);

            setLiveLight(parsedConfigData.liveTemperature);
        }

        if (liveDataRegex.test(message.payloadString)) {
            const parsedLiveData = Regex.parseLiveData(message.payloadString);

            setLiveTemperature(parsedLiveData.temperature);
            setLiveHumidity(parsedLiveData.humidity);
            setLiveLight(parsedLiveData.light);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            MqttService.send('eregulation/arduino', 'ping');
            setRefreshing(false);

            Toast.show('Updated live data', {
                duration: 1000,
                position: -responsiveHeight(5),
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: theme.colors.green
            });
        }, 1000);
    }, []);

    return (
        <Block style={styles.container}>
            <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Block style={styles.dashboard}>
                    <ScrollView
                        scrollEnabled={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                        <Block center>
                            <Image source={images.mainLogo} style={styles.logo} />
                        </Block>

                        <Block center column style={{ marginVertical: responsiveHeight(3.5) }}>
                            <Text name>{greeting}</Text>
                            <Text welcome>Take control of your surroundings</Text>
                        </Block>

                        <Block row style={{ paddingVertical: responsiveHeight(1.5), marginHorizontal: responsiveHeight(1.5) }}>
                            <Block flex={2} row style={{ alignItems: 'flex-end', }}>
                                <Text h1>{liveTemperature}</Text>
                                <Block column>
                                    {/* <LiveDot /> */}
                                    <Text h1 size={34} height={80} weight='600' spacing={-2}>°C</Text>
                                </Block>
                            </Block>
                            <Block flex={2} row right style={{ alignItems: 'flex-end', }}>
                                <Text h1>{liveHumidity}</Text>
                                <Block column>
                                    {/* <LiveDot /> */}
                                    <Text h1 size={34} height={80} weight='600' spacing={-2}>%</Text>
                                </Block>
                            </Block>
                        </Block>

                        <View contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
                            <Block column space="between">
                                <Block row space="around" style={{ marginVertical: responsiveHeight(2) }}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate('Temperature')}
                                    >
                                        <Block center middle style={styles.button}>
                                            {isTurnedOnTemperatureRegulation ? <Animated.View style={{ opacity: opacityValue }}>
                                                <TemperatureIcon size={42} />
                                            </Animated.View> : <TemperatureIcon size={42} />}
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
                                        onPress={() => navigation.navigate('Humidity')}
                                    >
                                        <Block center middle style={styles.button}>
                                            {isTurnedOnHumidityRegulation ? <Animated.View style={{ opacity: opacityValue }}>
                                                <HumidityIcon size={42} />
                                            </Animated.View> : <HumidityIcon size={42} />}

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
                                        onPress={() => navigation.navigate('Light')}
                                    >
                                        <Block center middle style={styles.button}>
                                            <LightIcon size={42} />
                                            <Text
                                                button
                                                color={'secondary'}
                                                style={{ marginTop: responsiveHeight(1) }}
                                            >
                                                {settings['light'].name}
                                            </Text>
                                        </Block>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={redirectToStatistics}
                                    >
                                        <Block center middle style={styles.button}>
                                            <StatisticsIcon size={42} />
                                            <Text
                                                button
                                                color={'secondary'}
                                                style={{ marginTop: responsiveHeight(1) }}
                                            >
                                                {settings['statistics'].name}
                                            </Text>
                                        </Block>
                                    </TouchableOpacity>
                                </Block>
                            </Block>
                        </View>
                    </ScrollView>
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
