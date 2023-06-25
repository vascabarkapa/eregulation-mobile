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
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Linking } from 'react-native';
import { Block, Text } from '../components';
import * as FileSystem from 'expo-file-system';
import * as theme from '../styles';
import * as images from '../images';
import mocks from '../icons';
import Toast from 'react-native-root-toast';

const FILE_NAME = 'systemData.json';
const FILE_PATH = FileSystem.documentDirectory + FILE_NAME;

const Settings = ({ navigation, settings }) => {
    const SettingsIcon = settings['settings'].icon;

    const [isSaving, setIsSaving] = useState(false);

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

            let toast = Toast.show('Saved Successfully', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#28432C'
            });
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
                                            color={'secondary'}
                                        >
                                            Save Settings
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
                                            color={'secondary'}
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
        padding: responsiveHeight(3),
        marginBottom: -responsiveHeight(10),
        marginTop: responsiveHeight(5),
    },
    form: {
        flex: 1,
        padding: responsiveHeight(1.2),
        alignItems: 'stretch',
        marginTop: responsiveHeight(3.5)
    },
    input: {
        width: '100%',
        padding: responsiveHeight(1.2),
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 5,
        fontSize: theme.sizes.welcome,
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(2),
        backgroundColor: theme.colors.secondary
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
})
