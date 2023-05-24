import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { Linking } from 'react-native';
import { Block, Text } from '../components';
import * as FileSystem from 'expo-file-system';
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';

const FILE_NAME = 'systemData.json';
const FILE_PATH = FileSystem.documentDirectory + FILE_NAME;

const Settings = ({ navigation, settings }) => {
    const SettingsIcon = settings['settings'].icon;

    const [isSaving, setIsSaving] = useState(false);
    const [btnSaveLabel, setBtnSaveLabel] = useState('Save Settings');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const loadData = async () => {
        const fileContent = await FileSystem.readAsStringAsync(FILE_PATH);
        const jsonData = JSON.parse(fileContent);
        setFirstName(jsonData.first_name);
        setLastName(jsonData.last_name);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async () => {
        Keyboard.dismiss();
        setIsSaving(true);

        const jsonContent = {
            first_name: firstName,
            last_name: lastName
        };

        const jsonString = JSON.stringify(jsonContent);
        await FileSystem.writeAsStringAsync(FILE_PATH, jsonString);

        setTimeout(() => {
            setIsSaving(false);
            setBtnSaveLabel('Saved Successfuly');
            setTimeout(() => {
                setBtnSaveLabel('Save Settings');
            }, 1000);
        }, 500);
    };

    const handleOpenWiFiSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.sendIntent('android.settings.WIFI_SETTINGS');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}
        >
            <Block style={styles.container}>
                <ImageBackground source={images.backgroundOpacity15} style={styles.backgroundImage}>
                    <Block style={styles.settingsPage}>
                        <Block center>
                            <Text h2 bold>Settings</Text>
                        </Block>
                        <Block style={styles.form}>
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
                                onPress={handleSave}
                                disabled={isSaving}
                            >
                                <Block center middle>
                                    {isSaving ?
                                        <ActivityIndicator color="#d9b9c3" />
                                        :
                                        <Text
                                            welcome
                                            bold
                                            color={'background'}
                                        >
                                            {btnSaveLabel}
                                        </Text>
                                    }
                                </Block>
                            </TouchableOpacity>
                            <Block style={styles.bottomButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.button}
                                    onPress={handleOpenWiFiSettings}
                                >
                                    <Block center middle>
                                        <Text
                                            welcome
                                            bold
                                            color={'background'}
                                        >
                                            <SettingsIcon size={24} />
                                            &nbsp;Open WiFi Settings
                                        </Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        </KeyboardAvoidingView>
    );
};

Settings.defaultProps = {
    settings: mocks,
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    settingsPage: {
        flex: 1,
        padding: theme.sizes.base * 2,
        marginBottom: -theme.sizes.base * 6,
        marginTop: theme.sizes.base * 3,
    },
    form: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
        marginTop: theme.sizes.base * 2
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: theme.colors.button,
        borderRadius: 5,
        fontSize: theme.sizes.welcome,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: theme.colors.background
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
