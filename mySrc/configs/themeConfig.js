const BASE_FONT_SIZE = 20;

const themeConfig = {
  typography: {
    fontFamily: ['cwTeXFangSong', 'serif'].join(','),
  },
  overrides: {
    MuiFormControlLabel: {
      root: {
        marginLeft: '-11rem',
        marginRight: '16rem',
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.13)',
      },
    },
    MuiButton: {
      outlined: {
        borderColor: '#707070',
        borderWidth: '1rem',
        minWidth: '110rem',
        minHeight: '30rem',
        padding: '0 8rem',
        '&:hover:not($disabled)': {
          borderColor: 'white',
        },
        '&$disabled': {
          borderWidth: '1rem',
          borderColor: '#625f5f',
          '& span.MuiButton-label': {
            color: '#625f5f',
          },
        },
      },
      label: {
        fontFamily: ['adobe-arabic', 'sans-serif'].join(','),
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '20rem',
        lineHeight: '30rem',
        transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
          color: 'white',
        },
      },
    },
    MuiButtonBase: {
      root: {
        fontFamily: 'Adobe Fangsong Std',
        transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '600rem',
      },
      paperScrollPaper: {
        maxHeight: 'calc(100% - 64rem)',
      },
      paper: {
        margin: '32rem',
        border: '1rem solid #00791d',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
      },
    },
    MuiPaper: {
      elevation24: {
        boxShadow:
          '0rem 11rem 15rem -7rem rgb(0 0 0 / 20%), 0rem 24rem 38rem 3rem rgb(0 0 0 / 14%), 0rem 9rem 46rem 8rem rgb(0 0 0 / 12%)',
      },
      rounded: {
        borderRadius: '4rem',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: `${BASE_FONT_SIZE}rem`,
      },
      h6: {
        fontSize: `${BASE_FONT_SIZE * 1.25}rem`,
      },
      colorTextSecondary: {
        color: '#b6b6b6',
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '16rem 24rem',
      },
    },
    MuiDialogContent: {
      root: {
        padding: '8rem 24rem',
      },
    },
  },
};

export default themeConfig;
