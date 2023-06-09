import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as theme from './styles';

export default {
    'temperature': {
        name: 'Temperature',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.secondary}
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
                color={color || theme.colors.secondary}
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
                color={color || theme.colors.secondary}
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
                color={color || theme.colors.secondary}
                name="cog"
                {...props}
            />
        ),
    },
    'wifi': {
        name: 'WiFi',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.secondary}
                name="wifi-cog"
                {...props}
            />
        ),
    },
};