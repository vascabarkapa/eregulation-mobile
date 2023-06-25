import React, { useEffect, useRef, useState, useContext } from 'react';
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

const Temperature = ({ navigation, settings }) => {
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

    const [tempMinTemperature, setTempMinTemperature] = useState(18);
    const [tempMaxTemperature, setTempMaxTemperature] = useState(24);

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacityValue, {
                        toValue: 0,
                        duration: 400,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animate();
    }, [opacityValue]);

    const handleMinTemperatureSliderChange = (value) => {
        setTempMinTemperature(Math.floor(value));
    };

    const handleMaxTemperatureSliderChange = (value) => {
        setTempMaxTemperature(Math.floor(value));
    };

    const turnOnOffTemperature = (value) => {
        setIsTurnedOnTemperatureRegulation(value => !value);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}
        >
            <Block style={styles.container}>
                <ImageBackground source={isTurnedOnTemperatureRegulation ? images.backgroundOpacity15 : null} style={styles.backgroundImage}>
                    <View style={styles.bottomIconContainer}>
                        <TemperatureIcon size={responsiveHeight(55)} color={isTurnedOnTemperatureRegulation ? theme.colors.primary : theme.colors.secondary} opacity={0.2} />
                    </View>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.temperaturePage}>
                        <Block center>
                            <Text h2 bold style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>Temperature</Text>
                        </Block>
                        <Block row style={{ paddingVertical: responsiveHeight(6) }}>
                            <Block flex={2} row style={{ alignItems: 'flex-end' }}>
                                <Text live style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>{liveTemperature}</Text>
                                <Animated.View style={{ opacity: opacityValue }}>
                                    <Text h1 size={responsiveHeight(6)} height={responsiveHeight(10)} weight='600' spacing={-2} style={!isTurnedOnTemperatureRegulation && { color: theme.colors.secondary }}>°C</Text>
                                </Animated.View>
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
                                    minimumValue={12}
                                    maximumValue={36}
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
                                    minimumValue={12}
                                    maximumValue={36}
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
                                    onPress={() => navigation.navigate('Dashboard')}
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

Temperature.defaultProps = {
    settings: mocks,
};


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