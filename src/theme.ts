import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3b82f6', // Tailwind's blue-500
        },
        secondary: {
            main: '#f43f5e', // Tailwind's rose-500
        },
    },
});

export default theme;
