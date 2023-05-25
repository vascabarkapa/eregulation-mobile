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

const Temperature = ({ navigation, settings }) => {
    const [minTemperature, setMinTemperature] = useState(18);
    const [maxTemperature, setMaxTemperature] = useState(24);

    const handleMinTemperatureSliderChange = (value) => {
        setMinTemperature(Math.floor(value));
    };

    const handleMaxTemperatureSliderChange = (value) => {
        setMaxTemperature(Math.floor(value));
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
                    <Block style={styles.temperaturePage}>
                        <Block center>
                            <Text h2 bold>Temperature</Text>
                        </Block>
                        <Block flex={1} style={{ paddingTop: theme.sizes.base * 2 }}>
                            <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
                                <Block row space="between">
                                    <Text welcome color="black">MIN</Text>
                                    <Text welcome bold color="black">{minTemperature}°C</Text>
                                </Block>
                                <Slider
                                    value={minTemperature}
                                    minimumValue={-16}
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
                                    value={maxTemperature}
                                    minimumValue={-16}
                                    maximumValue={36}
                                    thumbTintColor={theme.colors.button}
                                    minimumTrackTintColor={theme.colors.button}
                                    maximumTrackTintColor={theme.colors.gray2}
                                    onValueChange={handleMaxTemperatureSliderChange}
                                    lowerLimit={minTemperature + 1}
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
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
})