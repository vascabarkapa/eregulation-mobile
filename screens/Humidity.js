import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
} from 'react-native';

import * as theme from '../styles';
import * as images from '../images';
import { Block, Text } from '../components';
import Slider from '@react-native-community/slider';

const Humidity = ({ navigation, settings }) => {
    const [minHumidity, setMinHumidity] = useState(20);
    const [maxHumidity, setMaxHumidity] = useState(40);

    const handleMinHumiditySliderChange = (value) => {
        setMinHumidity(Math.floor(value));
    };

    const handleMaxHumiditySliderChange = (value) => {
        setMaxHumidity(Math.floor(value));
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}
        >
            <Block style={styles.container}>
                <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.humidityPage}>
                        <Block center>
                            <Text h2 bold>Humidity</Text>
                        </Block>
                        <Block flex={1} style={{ paddingTop: theme.sizes.base * 2 }}>
                            <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
                                <Block row space="between">
                                    <Text welcome color="black">MIN</Text>
                                    <Text welcome bold color="black">{minHumidity}%</Text>
                                </Block>
                                <Slider
                                    value={minHumidity}
                                    minimumValue={0}
                                    maximumValue={100}
                                    thumbTintColor={theme.colors.button}
                                    minimumTrackTintColor={theme.colors.button}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMinHumiditySliderChange}
                                    upperLimit={maxHumidity - 1}
                                    step={1}
                                />
                            </Block>
                            <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
                                <Block row space="between">
                                    <Text welcome color="black">MAX</Text>
                                    <Text welcome bold color="black">{maxHumidity}%</Text>
                                </Block>
                                <Slider
                                    value={maxHumidity}
                                    minimumValue={0}
                                    maximumValue={100}
                                    thumbTintColor={theme.colors.button}
                                    minimumTrackTintColor={theme.colors.button}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMaxHumiditySliderChange}
                                    lowerLimit={minHumidity + 1}
                                    step={1}
                                />
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        </KeyboardAvoidingView>
    )
}

export default Humidity;

const styles = StyleSheet.create({
    humidityPage: {
        flex: 1,
        padding: theme.sizes.base * 2,
        marginBottom: -theme.sizes.base * 6,
        marginTop: theme.sizes.base * 3,
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
})