import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import {
    responsiveFontSize
} from "react-native-responsive-dimensions";
import * as theme from '../styles';

export default class Typography extends Component {
    render() {
        const {
            center,
            right,
            color,
            size,
            height,
            weight,
            spacing,
            live,
            h1,
            h2,
            welcome,
            name,
            caption,
            medium,
            bold,
            light,
            italic,
            button,
            style,
            children,
            ...props
        } = this.props;

        const textStyles = [
            styles.text,
            live && styles.live,
            h1 && styles.h1,
            h2 && styles.h2,
            welcome && styles.welcome,
            name && styles.name,
            button && styles.button,
            center && styles.center,
            right && styles.right,
            color && { color },
            color && color === 'accent' && styles.accent,
            color && color === 'black' && styles.black,
            color && color === 'white' && styles.white,
            color && color === 'gray' && styles.gray,
            color && color === 'secondary' && styles.secondary,
            color && color === 'primary' && styles.primary,
            size && { fontSize: size },
            bold && styles.bold,
            light && styles.light,
            caption && styles.caption,
            height && { lineHeight: height },
            weight && { fontWeight: weight },
            spacing && { letterSpacing: spacing },
            style
        ];

        return (
            <Text style={textStyles} {...props}>
                {children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: theme.sizes.font,
        color: theme.colors.black,
    },
    bold: { fontWeight: 'bold' },
    light: { fontWeight: '200' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    black: { color: theme.colors.black },
    white: { color: theme.colors.white },
    gray: { color: theme.colors.gray },
    primary: { color: theme.colors.primary },
    secondary: { color: theme.colors.secondary },
    welcome: {
        fontSize: responsiveFontSize(3),
        color: theme.colors.black,
        letterSpacing: -0.6,
        lineHeight: responsiveFontSize(3) + 4,
    },
    name: {
        fontSize: responsiveFontSize(4),
        fontWeight: '600',
        color: theme.colors.black,
        letterSpacing: -1.1,
        lineHeight: responsiveFontSize(4.5),
    },
    live: {
        fontSize: responsiveFontSize(15),
        color: theme.colors.black,
        letterSpacing: -10,
        lineHeight: responsiveFontSize(15),
    },
    h1: {
        fontSize: responsiveFontSize(13),
        color: theme.colors.black,
        letterSpacing: -10,
        lineHeight: responsiveFontSize(13),
    },
    h2: {
        fontSize: responsiveFontSize(6.5),
        color: theme.colors.black,
        letterSpacing: -3,
        lineHeight: responsiveFontSize(8),
    },
    button: {
        fontSize: theme.sizes.button,
        color: theme.colors.black,
        fontWeight: '600',
        letterSpacing: -0.4,
        lineHeight: theme.sizes.button + 4,
    },
    caption: {
        fontSize: theme.sizes.welcome,
        color: theme.colors.gray,
        letterSpacing: -0.6,
        lineHeight: theme.sizes.welcome + 4,
    },
});