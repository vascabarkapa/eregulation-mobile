import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import * as theme from '../styles';

const LiveDot = () => {
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacityValue, {
                        toValue: 0,
                        duration: 1400,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityValue, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animate();
    }, [opacityValue]);

    return (
        <Animated.View style={{ opacity: opacityValue }}>
            <Svg width={20} height={20}>
                <Circle
                    cx={10}
                    cy={10}
                    r={8}
                    fill={theme.colors.darkRed}
                    opacity={opacityValue}
                />
            </Svg>
        </Animated.View>
    );
};

export default LiveDot;
