import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
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
            color && color === 'background' && styles.background,
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
    black: { color: theme.colors.black, },
    white: { color: theme.colors.white, },
    gray: { color: theme.colors.gray, },
    background: { color: theme.colors.background, },
    welcome: theme.fonts.welcome,
    name: theme.fonts.name,
    live: theme.fonts.live,
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    button: theme.fonts.button,
    caption: theme.fonts.caption,
});