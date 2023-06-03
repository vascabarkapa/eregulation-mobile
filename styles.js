const colors = {
    accent: '#FA754C',
    black: '#292934',
    white: '#FFFFFF',
    gray: '#A7A7A7',
    gray2: '#ECEDEF',
    button: '#482c43',
    background: '#d9b9c3',
    darkRed: '#801737'
};

const sizes = {
    base: 14,
    font: 14,
    welcome: 25,
    name: 29,
    live: 180,
    h1: 120,
    h2: 70,
    button: 16,
};

const fonts = {
    welcome: {
        fontSize: sizes.welcome,
        color: colors.black,
        letterSpacing: -0.6,
        lineHeight: sizes.welcome + 4,
    },
    name: {
        fontSize: sizes.name,
        fontWeight: '600',
        color: colors.black,
        letterSpacing: -1.1,
        lineHeight: sizes.name + 4,
    },
    caption: {
        fontSize: sizes.welcome,
        color: colors.gray,
        letterSpacing: -0.6,
        lineHeight: sizes.welcome + 4,
    },
    live: {
        fontSize: sizes.live,
        color: colors.black,
        letterSpacing: -10,
        lineHeight: sizes.live,
    },
    h1: {
        fontSize: sizes.h1,
        color: colors.black,
        letterSpacing: -10,
        lineHeight: sizes.h1,
    },
    h2: {
        fontSize: sizes.h2,
        color: colors.black,
        letterSpacing: -3,
        lineHeight: sizes.h2,
    },
    button: {
        fontSize: sizes.button,
        color: colors.black,
        fontWeight: '600',
        letterSpacing: -0.4,
        lineHeight: sizes.button + 4,
    },
};

export {
    colors,
    sizes,
    fonts,
};