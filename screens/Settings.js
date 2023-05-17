import React, { Component, useEffect, useState } from 'react';
import {
    ImageBackground,
    Image,
    StyleSheet,
    View,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';

import * as theme from '../styles';
import * as images from '../images';
import { Block, Text } from '../components';
import mocks from '../icons';

const Settings = ({ navigation, settings }) => {
    const SettingsIcon = settings['settings'].icon;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSave = () => {
        // Handle the save button functionality here
        console.log('Input 1:', input1);
        console.log('Input 2:', input2);
    };

    const handleGoToWiFi = () => {
        // Handle the "Go To WiFi" button functionality here
        console.log('Navigating to WiFi settings...');
    };

    return (
        <>
            <Block style={styles.container}>
                <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                    <Block style={styles.settingsPage}>
                        <Block center>
                            <Text h2>Settings</Text>
                        </Block>
                        <View style={styles.form}>
                            <Text welcome bold>First Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setFirstName(text)}
                                value={firstName}
                                placeholder="Set First Name"
                            />
                            <Text welcome bold>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setLastName(text)}
                                value={lastName}
                                placeholder="Set Last Name"
                            />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.button}
                            >
                                <Block center middle>
                                    <Text
                                        button
                                        color={'background'}
                                    >
                                        Save Settings
                                    </Text>
                                </Block>
                            </TouchableOpacity>
                            <View style={styles.bottomButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.button}
                                >
                                    <Block center middle>
                                        <Text
                                            button
                                            color={'background'}
                                        >
                                            Open WiFi Settings
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Block>
                </ImageBackground>
            </Block>
        </>
    );
};

Settings.defaultProps = {
    settings: mocks,
};

export default Settings;

const styles = StyleSheet.create({
    settingsPage: {
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
    form: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: theme.colors.button,
        borderRadius: 5,
        fontSize: theme.sizes.welcome,
        marginTop: 5,
        marginBottom: 15
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
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
