import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    View,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
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

const OFF = 0;
const ON = 1;
const AUTO = 2;

function setButtonState(stateId) {
    switch (stateId) {
        case OFF:
            return 'off';
        case ON:
            return 'on';
        case AUTO:
            return 'auto';
    }
}

const Light = ({ navigation, settings }) => {
    const LightIcon = settings['light'].icon;
    const { liveLight, setLiveLight } = useContext(GlobalContext);
    const opacityValue = useRef(new Animated.Value(1)).current;

    const [option, setOption] = useState(setButtonState(liveLight));

    const handleOption = (button) => {
        setOption(button);

        switch (button) {
            case "off":
                setLiveLight(OFF);
                break;
            case "on":
                setLiveLight(ON);
                break;
            case "auto":
                setLiveLight(AUTO);
                break;
        }

        MqttService.send('eregulation/arduino', 'l-' + button);

        Toast.show('Light is ' + button.toUpperCase(), {
            duration: 500,
            position: -responsiveHeight(5),
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: theme.colors.green
        });
    };

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
                            <Block row space="around" style={{ marginVertical: responsiveHeight(2) }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ width: 100, marginRight: 5 }}
                                    onPress={() => handleOption('on')}
                                >
                                    <Block center middle style={option === 'on' ? styles.activeButton : styles.button}>
                                        <Text
                                            button
                                            color={option === 'on' ? 'primary' : 'secondary'}
                                            style={{ marginTop: responsiveHeight(1), fontSize: 20 }}
                                        >
                                            ON
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ width: 100, marginRight: 5 }}
                                    onPress={() => handleOption('off')}
                                >
                                    <Block center middle style={option === 'off' ? styles.activeButton : styles.button}>
                                        <Text
                                            button
                                            color={option === 'off' ? 'primary' : 'secondary'}
                                            style={{ marginTop: responsiveHeight(1), fontSize: 20 }}
                                        >
                                            OFF
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ width: 100 }}
                                    onPress={() => handleOption('auto')}
                                >
                                    <Block center middle style={option === 'auto' ? styles.activeButton : styles.button}>
                                        <Text
                                            button
                                            color={option === 'auto' ? 'primary' : 'secondary'}
                                            style={{ marginTop: responsiveHeight(1), fontSize: 20 }}
                                        >
                                            AUTO
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
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
        backgroundColor: theme.colors.primary,
        width: '100%',
        height: 100,
        padding: theme.sizes.base,
        borderRadius: responsiveHeight(1.5) / 2,
        textAlign: 'center'
    },
    activeButton: {
        backgroundColor: theme.colors.secondary,
        width: '100%',
        height: 100,
        padding: theme.sizes.base,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: responsiveHeight(1.5) / 2,
        textAlign: 'center'
    },
    bottomIconContainer: {
        position: 'absolute',
        bottom: -responsiveHeight(10),
        right: -responsiveWidth(15),
    },
})