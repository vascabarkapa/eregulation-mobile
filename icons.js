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
                name="thermometer-lines"
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
    'light': {
        name: 'Light',
        icon: ({ size, color, ...props }) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.font}
                color={color || theme.colors.secondary}
                name="lightbulb-on"
                {...props}
            />
        ),
    },
};