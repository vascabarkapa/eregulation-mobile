import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as theme from './styles';

export default {
    'temperature': {
        name: 'Temperature',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.background}
                name="white-balance-sunny"
                {...props}
            />
        ),
    },
    'humidity': {
        name: 'Humidity',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.background}
                name="water"
                {...props}
            />
        ),
    },
    'statistics': {
        name: 'Statistics',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.background}
                name="chart-bar"
                {...props}
            />
        ),
    },
    'settings': {
        name: 'Settings',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.background}
                name="cog"
                {...props}
            />
        ),
    },
};