import React, { Component, useEffect, useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
} from 'react-native';

import * as theme from '../styles';
import * as images from '../images';
import { Block, Text } from '../components';

class Humidity extends Component {
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled={false}
                style={styles.container}
            >
                <Block style={styles.container}>
                    <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                        <StatusBar translucent={true} backgroundColor="transparent" />
                        <Block style={styles.dashboard}>
                        </Block>
                    </ImageBackground>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

export default Humidity;

const styles = StyleSheet.create({
    dashboard: {
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