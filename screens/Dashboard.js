import React, { Component } from 'react'
import { ImageBackground, Image, StatusBar, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';

import * as theme from '../styles';
import * as images from '../images';
import { Block, Text } from '../components';
import mocks from '../icons';

const redirectToStatistics = () => {
    Linking.openURL('https://eregulation.netlify.app');
}

class Dashboard extends Component {
    render() {
        const { navigation, settings } = this.props;

        const TemperatureIcon = settings['temperature'].icon;
        const HumidityIcon = settings['humidity'].icon;
        const StatisticsIcon = settings['statistics'].icon;
        const SettingsIcon = settings['settings'].icon;

        return (
            <>
                <Block style={styles.container}>
                    <ImageBackground
                        source={images.backgroundOpacity15}
                        style={styles.backgroundImage}
                    >
                        <StatusBar translucent={true} backgroundColor="transparent" />
                        <Block style={styles.dashboard}>
                            <Block center>
                                <Image source={images.mainLogo} style={styles.logo} />
                            </Block>

                            <Block center column style={{ marginVertical: theme.sizes.base * 2, }}>
                                <Text welcome>Good afternoon</Text>
                                <Text name>Test User</Text>
                            </Block>

                            <Block row style={{ paddingVertical: 10 }}>
                                <Block flex={2} row style={{ alignItems: 'flex-end', }}>
                                    <Text h1>28</Text>
                                    <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text>
                                </Block>
                                <Block flex={1.5} row style={{ alignItems: 'flex-end', }}>
                                    <Text h1>48</Text>
                                    <Text h1 size={34} height={80} weight='600' spacing={0.1}>%</Text>
                                </Block>
                            </Block>

                            <View contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
                                <Block column space="between">
                                    <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => navigation.navigate('Temperature', { name: 'temperature' })}
                                        >
                                            <Block center middle style={styles.button}>
                                                <TemperatureIcon size={38} />
                                                <Text
                                                    button
                                                    color={'background'}
                                                    style={{ marginTop: theme.sizes.base * 0.5 }}
                                                >
                                                    {settings['temperature'].name}
                                                </Text>
                                            </Block>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => navigation.navigate('Humidity', { name: 'humidity' })}
                                        >
                                            <Block center middle style={styles.button}>
                                                <HumidityIcon size={38} />
                                                <Text
                                                    button
                                                    color={'background'}
                                                    style={{ marginTop: theme.sizes.base * 0.5 }}
                                                >
                                                    {settings['humidity'].name}
                                                </Text>
                                            </Block>
                                        </TouchableOpacity>
                                    </Block>

                                    <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={redirectToStatistics}
                                        >
                                            <Block center middle style={styles.button}>
                                                <StatisticsIcon size={38} />
                                                <Text
                                                    button
                                                    color={'background'}
                                                    style={{ marginTop: theme.sizes.base * 0.5 }}
                                                >
                                                    {settings['statistics'].name}
                                                </Text>
                                            </Block>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => navigation.navigate('Settings', { name: 'settings' })}
                                        >
                                            <Block center middle style={styles.button}>
                                                <SettingsIcon size={38} />
                                                <Text
                                                    button
                                                    color={'background'}
                                                    style={{ marginTop: theme.sizes.base * 0.5 }}
                                                >
                                                    {settings['settings'].name}
                                                </Text>
                                            </Block>
                                        </TouchableOpacity>
                                    </Block>
                                </Block>
                            </View>
                        </Block>
                    </ImageBackground>
                </Block >
            </>
        )
    }
}

Dashboard.defaultProps = {
    settings: mocks,
}

export default Dashboard;

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        padding: theme.sizes.base * 2,
        marginBottom: -theme.sizes.base * 6,
        marginTop: theme.sizes.base * 3,
    },
    logo: {
        marginTop: theme.sizes.base,
        marginBottom: theme.sizes.base * 2,
        width: '100%',
        height: 50,
        resizeMode: 'contain',
    },
    buttons: {
        flex: 1,
        marginBottom: -theme.sizes.base * 6,
    },
    button: {
        backgroundColor: theme.colors.button,
        width: 151,
        height: 151,
        borderRadius: 150 / 10,
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Adjust the image resizing mode as needed
    },
})
