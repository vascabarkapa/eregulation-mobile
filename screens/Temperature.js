import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import {
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from 'react-native';

import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import { Block, Text } from '../components';
import Slider from '@react-native-community/slider';

const Temperature = ({ navigation, settings }) => {
    const SettingsIcon = settings['settings'].icon;

    const [isTurnedOn, setIsTurnedOn] = useState(false);
    const [minTemperature, setMinTemperature] = useState(18);
    const [maxTemperature, setMaxTemperature] = useState(24);

    const opacityValue = useRef(new Animated.Value(1)).current;

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
        setMinTemperature(Math.floor(value));
    };

    const handleMaxTemperatureSliderChange = (value) => {
        setMaxTemperature(Math.floor(value));
    };

    const turnOnOffTemperature = (value) => {
        setIsTurnedOn(value => !value);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}
        >
            <Block style={styles.container}>
                <ImageBackground source={isTurnedOn ? images.backgroundOpacity15 : null} style={styles.backgroundImage}>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.temperaturePage}>
                        <Block center>
                            <Text h2 bold style={!isTurnedOn && { color: theme.colors.background }}>Temperature</Text>
                        </Block>
                        <Block row style={{ paddingVertical: 50 }}>
                            <Block flex={2} row style={{ alignItems: 'flex-end', }}>
                                <Text live style={!isTurnedOn && { color: theme.colors.background }}>28</Text>
                                <Animated.View style={{ opacity: opacityValue }}>
                                    <Text h1 size={50} height={90} weight='600' spacing={0.1} style={!isTurnedOn && { color: theme.colors.background }}>°C</Text>
                                </Animated.View>
                            </Block>
                            <Block flex={1.5} style={{ alignItems: 'center', marginTop: 15 }}>
                                <Text welcome style={!isTurnedOn && { color: theme.colors.background }}>Turned <Text welcome bold style={!isTurnedOn && { color: theme.colors.background }}>{isTurnedOn ? 'ON' : 'OFF'}</Text></Text>
                                <Switch
                                    trackColor={{ false: theme.colors.gray, true: theme.colors.button }}
                                    thumbColor={isTurnedOn ? theme.colors.button : theme.colors.gray2}
                                    value={isTurnedOn}
                                    onChange={turnOnOffTemperature}
                                    style={styles.switch}
                                />
                            </Block>
                        </Block>
                        {isTurnedOn ? <Block flex={1} style={{ paddingTop: theme.sizes.base * 2 }}>
                            <Block center>
                                <Text name bold>Adjust the Temperature range</Text>
                            </Block>
                            <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
                                <Block row space="between">
                                    <Text welcome color="black">MIN</Text>
                                    <Text welcome bold color="black">{minTemperature}°C</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={minTemperature}
                                    minimumValue={12}
                                    maximumValue={36}
                                    thumbTintColor={theme.colors.button}
                                    minimumTrackTintColor={theme.colors.button}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMinTemperatureSliderChange}
                                    upperLimit={maxTemperature - 1}
                                    step={1}
                                />
                            </Block>
                            <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
                                <Block row space="between">
                                    <Text welcome color="black">MAX</Text>
                                    <Text welcome bold color="black">{maxTemperature}°C</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={maxTemperature}
                                    minimumValue={12}
                                    maximumValue={36}
                                    thumbTintColor={theme.colors.button}
                                    minimumTrackTintColor={theme.colors.button}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMaxTemperatureSliderChange}
                                    lowerLimit={minTemperature + 1}
                                    step={1}
                                />
                            </Block>
                            <Block style={styles.bottomButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Dashboard')}
                                >
                                    <Block center middle>
                                        <Text
                                            welcome
                                            bold
                                            color={'background'}
                                        >
                                            Save changes
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
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
        padding: theme.sizes.base * 2,
        marginBottom: -theme.sizes.base * 6,
        marginTop: theme.sizes.base * 3,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.button
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    switch: {
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
    },
    slider: {
        transform: [{ scaleX: 1 }, { scaleY: 1.6 }],
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
    },
    button: {
        marginTop: theme.sizes.base * 0.5,
        backgroundColor: theme.colors.button,
        width: '100%',
        padding: theme.sizes.base,
        borderRadius: theme.sizes.base / 2,
        textAlign: 'center'
    },
})