module.exports = {
  theme: {
    fontFamily: {
      body: 'DMMono',
    },
    extend: {
      inset: {
        '2/5': '40%',
      },
      margin: {
        0.25: '0.075rem',
        0.5: '0.125rem',
      },
      colors: {
        main: '#475FF1',
        sub: '#6A8DF9',

        fintoc: {
          blue: '#030366',
          cyan: '#7CD9DE',
          gray: '#474752',
          yellow: '#FFC403',
          green: '#34d399',
        },
        tint: {
          blue: '#7f7fe8',
          yellow: '#ffdb65',
          cyan: '#8cdee2',
        },
        terminal: {
          header: '#38393b',
          body: '#23272e',
        },
        secondary: {
          lighterBlue: '#6481f4',
          blue: '#5373f3',
        },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    extend: {
      backgroundColor: ['active', 'group-focus'],
      borderColor: ['active', 'focus'],
      borderWidth: ['hover', 'focus'],
      fill: ['active', 'group-focus'],
      textColor: ['active', 'group-focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
