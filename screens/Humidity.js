import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import Slider from '@react-native-community/slider';
import {
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import { Block, Text } from '../components';
import { GlobalContext } from '../contexts/GlobalContext';
import MqttService from '../services/MqttService';
import Toast from 'react-native-root-toast';

const Humidity = ({ navigation, settings }) => {
    const HumidityIcon = settings['humidity'].icon;
    const {
        liveHumidity,
        minHumidity,
        setMinHumidity,
        maxHumidity,
        setMaxHumidity,
        isTurnedOnHumidityRegulation,
        setIsTurnedOnHumidityRegulation
    } = useContext(GlobalContext);
    const opacityValue = useRef(new Animated.Value(1)).current;

    const [tempMinHumidity, setTempMinHumidity] = useState(minHumidity);
    const [tempMaxHumidity, setTempMaxHumidity] = useState(maxHumidity);

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
                        toValue: 1,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animate();
    }, [opacityValue, isTurnedOnHumidityRegulation]);

    const handleMinHumiditySliderChange = (value) => {
        setTempMinHumidity(Math.floor(value));
    };

    const handleMaxHumiditySliderChange = (value) => {
        setTempMaxHumidity(Math.floor(value));
    };

    const turnOnOffHumidity = (value) => {
        MqttService.send('eregulation', 'h-' + (isTurnedOnHumidityRegulation === true ? 'off' : 'on'));
        setIsTurnedOnHumidityRegulation(value => !value);

        Toast.show('Humidity regulation is ' + (isTurnedOnHumidityRegulation === true ? 'OFF' : 'ON'), {
            duration: 500,
            position: -responsiveHeight(5),
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: isTurnedOnHumidityRegulation === true ? theme.colors.yellow : theme.colors.green
        });
    };

    const saveHumidityRange = () => {
        MqttService.send('eregulation', 'h-' + tempMinHumidity + '-' + tempMaxHumidity);

        setMinHumidity(tempMinHumidity);
        setTempMinHumidity(tempMinHumidity);
        setMaxHumidity(tempMaxHumidity);
        setTempMaxHumidity(tempMaxHumidity);

        Toast.show('Humidity range successfully saved', {
            duration: 1000,
            position: -responsiveHeight(5),
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: theme.colors.green
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}
        >
            <Block style={styles.container}>
                <ImageBackground source={isTurnedOnHumidityRegulation ? images.backgroundOpacity15 : null} style={styles.backgroundImage}>
                    <View style={styles.bottomIconContainer}>
                        {isTurnedOnHumidityRegulation ? <Animated.View style={{ opacity: opacityValue }}>
                            <HumidityIcon size={responsiveHeight(70)} color={isTurnedOnHumidityRegulation ? theme.colors.primary : theme.colors.secondary} opacity={0.4} />
                        </Animated.View> : <HumidityIcon size={responsiveHeight(70)} color={isTurnedOnHumidityRegulation ? theme.colors.primary : theme.colors.secondary} opacity={0.4} />}
                    </View>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.humidityPage}>
                        <Block center>
                            <Text h2 bold style={!isTurnedOnHumidityRegulation && { color: theme.colors.secondary }}>Humidity</Text>
                        </Block>
                        <Block row style={{ paddingVertical: responsiveHeight(6) }}>
                            <Block flex={2} row style={{ alignItems: 'flex-end' }}>
                                <Text live style={!isTurnedOnHumidityRegulation && { color: theme.colors.secondary }}>{liveHumidity}</Text>
                                <Text h1 size={responsiveHeight(6)} height={responsiveHeight(10)} weight='600' spacing={0.1} style={!isTurnedOnHumidityRegulation && { color: theme.colors.secondary }}>%</Text>
                            </Block>
                            <Block flex={2} style={{ alignItems: 'center', marginTop: responsiveHeight(1) }}>
                                <Text welcome style={!isTurnedOnHumidityRegulation && { color: theme.colors.secondary }}>Turned <Text welcome bold style={!isTurnedOnHumidityRegulation && { color: theme.colors.secondary }}>{isTurnedOnHumidityRegulation ? 'ON' : 'OFF'}</Text></Text>
                                <Switch
                                    trackColor={{ false: theme.colors.gray, true: theme.colors.primary }}
                                    thumbColor={isTurnedOnHumidityRegulation ? theme.colors.primary : theme.colors.gray2}
                                    value={isTurnedOnHumidityRegulation}
                                    onChange={turnOnOffHumidity}
                                    style={styles.switch}
                                />
                            </Block>
                        </Block>
                        {isTurnedOnHumidityRegulation ? <Block flex={1} style={{ paddingTop: responsiveHeight(1) }}>
                            <Block center>
                                <Text welcome bold>Adjust the Humidity range</Text>
                            </Block>
                            <Block column style={{ marginVertical: responsiveHeight(3) }}>
                                <Block row space="between">
                                    <Text welcome color="black">MIN</Text>
                                    <Text welcome bold color="black">{tempMinHumidity}%</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={tempMinHumidity}
                                    minimumValue={20}
                                    maximumValue={90}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMinHumiditySliderChange}
                                    upperLimit={tempMaxHumidity - 1}
                                    step={1}
                                />
                            </Block>
                            <Block column style={{ marginVertical: responsiveHeight(1) }}>
                                <Block row space="between">
                                    <Text welcome color="black">MAX</Text>
                                    <Text welcome bold color="black">{tempMaxHumidity}%</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={tempMaxHumidity}
                                    minimumValue={20}
                                    maximumValue={90}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMaxHumiditySliderChange}
                                    lowerLimit={tempMinHumidity + 1}
                                    step={1}
                                />
                            </Block>
                            {(tempMaxHumidity !== maxHumidity || tempMinHumidity !== minHumidity) ? <Block style={styles.bottomButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.button}
                                    onPress={saveHumidityRange}
                                >
                                    <Block center middle>
                                        <Text
                                            welcome
                                            bold
                                            color={'secondary'}
                                        >
                                            Save changes
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block> : ''}
                        </Block> : ''}
                    </Block>
                </ImageBackground>
            </Block>
        </KeyboardAvoidingView>
    )
}

Humidity.defaultProps = {
    settings: mocks,
};


export default Humidity;

const styles = StyleSheet.create({
    humidityPage: {
        flex: 1,
        padding: responsiveHeight(3.5),
        marginBottom: -responsiveHeight(10),
        marginTop: responsiveHeight(5),
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    switch: {
        marginTop: responsiveHeight(0.5),
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: responsiveHeight(12),
        left: 0,
        right: 0,
        paddingHorizontal: responsiveHeight(1.5),
    },
    button: {
        marginTop: responsiveHeight(1),
        backgroundColor: theme.colors.primary,
        width: '100%',
        padding: theme.sizes.base,
        borderRadius: responsiveHeight(1.5) / 2,
        textAlign: 'center'
    },
    bottomIconContainer: {
        position: 'absolute',
        bottom: -responsiveHeight(15),
        right: -responsiveWidth(15),
    },
})