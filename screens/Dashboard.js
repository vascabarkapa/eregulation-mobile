import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import * as theme from '../styles';
import { Block, Text } from '../components';
import mocks from '../icons';

class Dashboard extends Component {
    render() {
        const { navigation, settings } = this.props;
        const LightIcon = settings['light'].icon;
        const ACIcon = settings['ac'].icon;
        const TempIcon = settings['temperature'].icon;
        const FanIcon = settings['fan'].icon;
        const WiFiIcon = settings['wi-fi'].icon;
        const ElectricityIcon = settings['electricity'].icon;

        return (
            <Block style={styles.dashboard}>
                <Block column style={{ marginVertical: theme.sizes.base * 2, }}>
                    <Text welcome>Good morning</Text>
                    <Text name>Test User</Text>
                </Block>

                <Block row style={{ paddingVertical: 10 }}>
                    <Block flex={1.5} row style={{ alignItems: 'flex-end', }}>
                        <Text h1>34</Text>
                        <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text>
                    </Block>
                    <Block flex={1} column>
                        <Text caption>Humidity</Text>
                        <Text caption>Procenti</Text>
                    </Block>
                </Block>

                <View contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
                    <Block column space="between">
                        <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Temperature', { name: 'light' })}
                            >
                                <Block center middle style={styles.button}>
                                    <LightIcon size={38} />
                                    <Text
                                        button
                                        style={{ marginTop: theme.sizes.base * 0.5 }}
                                    >
                                        {settings['light'].name}
                                    </Text>
                                </Block>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Humidity', { name: 'ac' })}
                            >
                                <Block center middle style={styles.button}>
                                    <ACIcon size={38} />
                                    <Text
                                        button
                                        style={{ marginTop: theme.sizes.base * 0.5 }}
                                    >
                                        {settings['ac'].name}
                                    </Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>

                        <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Temperature', { name: 'temperature' })}
                            >
                                <Block center middle style={styles.button}>
                                    <TempIcon size={38} />
                                    <Text
                                        button
                                        style={{ marginTop: theme.sizes.base * 0.5 }}
                                    >
                                        {settings['temperature'].name}
                                    </Text>
                                </Block>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Humidity', { name: 'fan' })}
                            >
                                <Block center middle style={styles.button}>
                                    <FanIcon size={38} />
                                    <Text
                                        button
                                        style={{ marginTop: theme.sizes.base * 0.5 }}
                                    >
                                        {settings['fan'].name}
                                    </Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>

                        <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Temperature', { name: 'wi-fi' })}
                            >
                                <Block center middle style={styles.button}>
                                    <WiFiIcon size={38} />
                                    <Text
                                        button
                                        style={{ marginTop: theme.sizes.base * 0.5 }}
                                    >
                                        {settings['wi-fi'].name}
                                    </Text>
                                </Block>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Humidity', { name: 'electricity' })}
                            >
                                <Block center middle style={styles.button}>
                                    <ElectricityIcon size={38} />
                                    <Text
                                        button
                                        style={{ marginTop: theme.sizes.base * 0.5 }}
                                    >
                                        {settings['electricity'].name}
                                    </Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>
                    </Block>
                </View>
            </Block>
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
        marginTop: theme.sizes.base * 2,
    },
    buttons: {
        flex: 1,
        marginBottom: -theme.sizes.base * 6,
    },
    button: {
        backgroundColor: theme.colors.button,
        width: 151,
        height: 151,
        borderRadius: 151 / 2,
    }
})
