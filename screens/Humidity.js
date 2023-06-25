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

const Humidity = ({ navigation, settings }) => {
    const HumidityIcon = settings['humidity'].icon;
    const { liveHumidity } = useContext(GlobalContext);

    const [isTurnedOn, setIsTurnedOn] = useState(false);
    const [minHumidity, setMinHumidity] = useState(40);
    const [maxHumidity, setMaxHumidity] = useState(60);

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

    const handleMinHumiditySliderChange = (value) => {
        setMinHumidity(Math.floor(value));
    };

    const handleMaxHumiditySliderChange = (value) => {
        setMaxHumidity(Math.floor(value));
    };

    const turnOnOffHumidity = (value) => {
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
                    <View style={styles.bottomIconContainer}>
                        <HumidityIcon size={responsiveHeight(70)} color={isTurnedOn ? theme.colors.primary : theme.colors.secondary} opacity={0.2} />
                    </View>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.humidityPage}>
                        <Block center>
                            <Text h2 bold style={!isTurnedOn && { color: theme.colors.secondary }}>Humidity</Text>
                        </Block>
                        <Block row style={{ paddingVertical: responsiveHeight(6) }}>
                            <Block flex={2} row style={{ alignItems: 'flex-end' }}>
                                <Text live style={!isTurnedOn && { color: theme.colors.secondary }}>{liveHumidity}</Text>
                                <Animated.View style={{ opacity: opacityValue }}>
                                    <Text h1 size={responsiveHeight(6)} height={responsiveHeight(10)} weight='600' spacing={0.1} style={!isTurnedOn && { color: theme.colors.secondary }}>%</Text>
                                </Animated.View>
                            </Block>
                            <Block flex={2} style={{ alignItems: 'center', marginTop: responsiveHeight(1) }}>
                                <Text welcome style={!isTurnedOn && { color: theme.colors.secondary }}>Turned <Text welcome bold style={!isTurnedOn && { color: theme.colors.secondary }}>{isTurnedOn ? 'ON' : 'OFF'}</Text></Text>
                                <Switch
                                    trackColor={{ false: theme.colors.gray, true: theme.colors.primary }}
                                    thumbColor={isTurnedOn ? theme.colors.primary : theme.colors.gray2}
                                    value={isTurnedOn}
                                    onChange={turnOnOffHumidity}
                                    style={styles.switch}
                                />
                            </Block>
                        </Block>
                        {isTurnedOn ? <Block flex={1} style={{ paddingTop: responsiveHeight(1) }}>
                            <Block center>
                                <Text welcome bold>Adjust the Humidity range</Text>
                            </Block>
                            <Block column style={{ marginVertical: responsiveHeight(3) }}>
                                <Block row space="between">
                                    <Text welcome color="black">MIN</Text>
                                    <Text welcome bold color="black">{minHumidity}%</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={minHumidity}
                                    minimumValue={0}
                                    maximumValue={100}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMinHumiditySliderChange}
                                    upperLimit={maxHumidity - 1}
                                    step={1}
                                />
                            </Block>
                            <Block column style={{ marginVertical: responsiveHeight(1) }}>
                                <Block row space="between">
                                    <Text welcome color="black">MAX</Text>
                                    <Text welcome bold color="black">{maxHumidity}%</Text>
                                </Block>
                                <Slider
                                    style={styles.slider}
                                    value={maxHumidity}
                                    minimumValue={0}
                                    maximumValue={100}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMaxHumiditySliderChange}
                                    lowerLimit={minHumidity + 1}
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
                                            color={'secondary'}
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