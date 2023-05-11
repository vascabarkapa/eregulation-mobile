import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from './styles';

export default {
    'temperature': {
        name: 'Temperature',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.accent}
                name="weather-sunny"
                {...props}
            />
        ),
    },
    'humidity': {
        name: 'Humidity',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.accent}
                name="water"
                {...props}
            />
        ),
    },
    'wifi': {
        name: 'Wi-Fi',
        icon: ({ size, color, ...props }) => (
            <FontAwesome
                size={size || theme.sizes.font}
                color={color || theme.colors.accent}
                name="wifi"
                {...props}
            />
        ),
    },
    'settings': {
        name: 'Settings',
        icon: ({ size, color, ...props }) => (
            <FontAwesome
                size={size || theme.sizes.font}
                color={color || theme.colors.accent}
                name="gear"
                {...props}
            />
        ),
    },
};