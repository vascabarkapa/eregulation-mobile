import React, { useEffect, useRef, useState, useContext } from 'react';
import Slider from '@react-native-community/slider';
import {
    Animated,
    Easing,
    View,
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Block, Text } from '../components';
import { GlobalContext } from '../contexts/GlobalContext';
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import MqttService from '../services/MqttService';
import Toast from 'react-native-root-toast';

const Temperature = ({ navigation, settings = mocks }) => {
    const TemperatureIcon = settings['temperature'].icon;
    const {
        liveTemperature,
        minTemperature,
        setMinTemperature,
        maxTemperature,
        setMaxTemperature,
        isTurnedOnTemperatureRegulation,
        setIsTurnedOnTemperatureRegulation
    } = useContext(GlobalContext);
    const opacityValue = useRef(new Animated.Value(1)).current;

    const [tempMinTemperature, setTempMinTemperature] = useState(minTemperature);
    const [tempMaxTemperature, setTempMaxTemperature] = useState(maxTemperature);

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
    }, [opacityValue, isTurnedOnTemperatureRegulation]);

    const handleMinTemperatureSliderChange = (value) => {
        setTempMinTemperature(Math.floor(value));
    };

    const handleMaxTemperatureSliderChange = (value) => {
        setTempMaxTemperature(Math.floor(value));
    };

    const turnOnOffTemperature = (value) => {
        MqttService.send('eregulation/arduino', 't-' + (isTurnedOnTemperatureRegulation === true ? 'off' : 'on'))
        setIsTurnedOnTemperatureRegulation(value => !value);

        Toast.show('Temperature regulation is ' + (isTurnedOnTemperatureRegulation === true ? 'OFF' : 'ON'), {
            duration: 500,
            position: -responsiveHeight(5),
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: isTurnedOnTemperatureRegulation === true ? theme.colors.yellow : theme.colors.green
        });
    };

    const saveTemperatureRange = () => {
        MqttService.send('eregulation/arduino', 't-' + tempMinTemperature + '-' + tempMaxTemperature);

        setMinTemperature(tempMinTemperature);
        setTempMinTemperature(tempMinTemperature);
        setMaxTemperature(tempMaxTemperature);
        setTempMaxTemperature(tempMaxTemperature);

        Toast.show('Temperature range successfully saved', {
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
                <ImageBackground source={isTurnedOnTemperatureRegulation ? images.backgroundOpacity15 : images.backgroundOpacityFull} style={styles.backgroundImage}>
                    <View style={styles.bottomIconContainer}>
                        {isTurnedOnTemperatureRegulation ? <Animated.View style={{ opacity: opacityValue }}>
                            <TemperatureIcon size={responsiveHeight(55)} color={isTurnedOnTemperatureRegulation ? theme.colors.primary : theme.colors.secondary} opacity={0.4} />
                        </Animated.View> : <TemperatureIcon size={responsiveHeight(55)} color={isTurnedOnTemperatureRegulation ? theme.colors.primary : theme.colors.secondary} opacity={0.4} />}
                    </View>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.temperaturePage}>
                        <Block center>
                            <Text h2 bold style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>Temperature</Text>
                        </Block>
                        <Block row style={{ paddingVertical: responsiveHeight(6) }}>
                            <Block flex={2} row style={{ alignItems: 'flex-end' }}>
                                <Text live style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>{liveTemperature}</Text>
                                <Text h1 size={responsiveHeight(6)} height={responsiveHeight(10)} weight='600' spacing={-2} style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>°C</Text>
                            </Block>
                            <Block flex={2} style={{ alignItems: 'center', marginTop: responsiveHeight(1) }}>
                                <Text welcome style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>Turned <Text welcome bold style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>{isTurnedOnTemperatureRegulation ? 'ON' : 'OFF'}</Text></Text>
                                <Switch
                                    trackColor={{ false: theme.colors.gray, true: theme.colors.primary }}
                                    thumbColor={isTurnedOnTemperatureRegulation ? theme.colors.primary : theme.colors.gray2}
                                    value={isTurnedOnTemperatureRegulation}
                                    onChange={turnOnOffTemperature}
                                    style={styles.switch}
                                />
                            </Block>
                        </Block>
                        {isTurnedOnTemperatureRegulation ? <Block flex={1} style={{ paddingTop: responsiveHeight(1) }}>
                            <Block center>
                                <Text welcome bold>Adjust the Temperature range</Text>
                            </Block>
                            <Block column style={{ marginVertical: responsiveHeight(3) }}>
                                <Block row space="between">
                                    <Text welcome color="black">MIN</Text>
                                    <Text welcome bold color="black">{tempMinTemperature}°C</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={tempMinTemperature}
                                    minimumValue={0}
                                    maximumValue={50}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMinTemperatureSliderChange}
                                    upperLimit={tempMaxTemperature - 1}
                                    step={1}
                                />
                            </Block>
                            <Block column style={{ marginVertical: responsiveHeight(1) }}>
                                <Block row space="between">
                                    <Text welcome color="black">MAX</Text>
                                    <Text welcome bold color="black">{tempMaxTemperature}°C</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={tempMaxTemperature}
                                    minimumValue={0}
                                    maximumValue={50}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMaxTemperatureSliderChange}
                                    lowerLimit={tempMinTemperature + 1}
                                    step={1}
                                />
                            </Block>
                            {(tempMaxTemperature !== maxTemperature || tempMinTemperature !== minTemperature) ? <Block style={styles.bottomButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.button}
                                    onPress={saveTemperatureRange}
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

/* Temperature.defaultProps = {
    settings: mocks,
}; */


export default Temperature;

const styles = StyleSheet.create({
    temperaturePage: {
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
        bottom: -responsiveHeight(5),
        right: -responsiveWidth(25),
    },
})