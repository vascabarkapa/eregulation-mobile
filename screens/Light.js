import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import {
    ImageBackground,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,

} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import { Block, Text } from '../components';

const Light = ({ navigation, settings }) => {
    const LightIcon = settings['light'].icon;
    const opacityValue = useRef(new Animated.Value(1)).current;

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
    }, [opacityValue]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}
        >
            <Block style={styles.container}>
                <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                    <View style={styles.bottomIconContainer}>
                        <LightIcon size={responsiveHeight(70)} color={theme.colors.primary} opacity={0.4} />
                    </View>
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Block style={styles.lightPage}>
                        <Block center>
                            <Text h2 bold style>Light</Text>
                        </Block>
                        <Block center style={{ paddingVertical: responsiveHeight(6) }}>
                            <Text>Coming soon!</Text>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        </KeyboardAvoidingView>
    )
}

Light.defaultProps = {
    settings: mocks,
};


export default Light;

const styles = StyleSheet.create({
    lightPage: {
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
        bottom: -responsiveHeight(10),
        right: -responsiveWidth(15),
    },
})