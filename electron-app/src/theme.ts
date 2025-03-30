import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'system', // User's system decides
    useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default theme;
