import { createContext , useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { Palette } from "@mui/icons-material";
import { Typography } from "@mui/material";


//ctrl + kg (intall extension Tailwind Shades)
// #666666
// #141b2d
// #4cceac
// #db4f4a
// #6870fa

export const tokens = (mode) => (
    {
        ...(mode === 'dark' // if mode is dark then pass these dark theme
            ?{
                grey: {
                    900: "#141414",
                    800: "#292929",
                    700: "#3d3d3d",
                    600: "#525252",
                    500: "#666666",
                    400: "#858585",
                    300: "#a3a3a3",
                    200: "#c2c2c2",
                    100: "#e0e0e0",
                },
                primary: {
                    900: "#040509",
                    800: "#080b12",
                    700: "#0c101b",
                    600: "#101624",
                    500: "#141b2d",
                    400: "#434957",
                    300: "#727681",
                    200: "#a1a4ab",
                    100: "#d0d1d5",
                },
                greenAccent: {
                    900: "#0f2922",
                    800: "#1e5245",
                    700: "#2e7c67",
                    600: "#3da58a",
                    500: "#4cceac",
                    400: "#70d8bd",
                    300: "#94e2cd",
                    200: "#b7ebde",
                    100: "#dbf5ee",
                },
                redAccent: {
                    900: "#2c100f",
                    800: "#58201e",
                    700: "#832f2c",
                    600: "#af3f3b",
                    500: "#db4f4a",
                    400: "#e2726e",
                    300: "#e99592",
                    200: "#f1b9b7",
                    100: "#f8dcdb",
                },
                blueAccent: {
                    900: "#151632",
                    800: "#2a2d64",
                    700: "#3e4396",
                    600: "#535ac8",
                    500: "#6870fa",
                    400: "#868dfb",
                    300: "#a4a9fc",
                    200: "#c3c6fd",
                    100: "#e1e2fe",
                
            }
        }:      // Else in Light Mode
            {

                    grey: {
                        100: "#e0e0e0",
                        200: "#c2c2c2",
                        300: "#a3a3a3",
                        400: "#858585",
                        500: "#666666",
                        600: "#525252",
                        700: "#3d3d3d",
                        800: "#292929",
                        900: "#141414"
                    },
                    primary: {
                        100: "#d0d1d5",
                        200: "#a1a4ab",
                        300: "#727681",
                        400: "#f2f0f0",
                        500: "#141b2d",
                        600: "#101624",
                        700: "#0c101b",
                        800: "#080b12",
                        900: "#040509"
                    },
                    greenAccent: {
                        100: "#dbf5ee",
                        200: "#b7ebde",
                        300: "#94e2cd",
                        400: "#70d8bd",
                        500: "#4cceac",
                        600: "#3da58a",
                        700: "#2e7c67",
                        800: "#1e5245",
                        900: "#0f2922"
                    },
                    redAccent: {
                        100: "#f8dcdb",
                        200: "#f1b9b7",
                        300: "#e99592",
                        400: "#e2726e",
                        500: "#db4f4a",
                        600: "#af3f3b",
                        700: "#832f2c",
                        800: "#58201e",
                        900: "#2c100f"
                    },
                    blueAccent: {
                        100: "#e1e2fe",
                        200: "#c3c6fd",
                        300: "#a4a9fc",
                        400: "#868dfb",
                        500: "#6870fa",
                        600: "#535ac8",
                        700: "#3e4396",
                        800: "#2a2d64",
                        900: "#151632",
                    },
            }),
    });

// mui theme settings ->  distriibution of color
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    
    return {
        Palette: {
            mode : mode, 
            ...(mode === 'dark'  // type
                ? {
                    primary : {
                        main : colors.primary[500], //light main dark contrasttext
                    },
                    secondary : {
                        main : colors.greenAccent[500],
                    },
                    netural : {
                        dark : colors.grey[700],
                        main : colors.grey[500],
                        light : colors.grey[100]
                    },
                    background : {
                        default : colors.primary [500],
                    }
                } : //light mode 
                {
                    primary : {
                        main : colors.primary[100], // change to light color
                    },
                    secondary : {
                        main : colors.greenAccent[500],
                    },
                    netural : {
                        dark : colors.grey[700],
                        main : colors.grey[500],
                        light : colors.grey[100]
                    },
                    background : {
                        default : "#fcfcfc",
                    },
                }),
        },
        Typography : { // Typography : The theme provides a set of type sizes that work well together, and also with the layout grid.
        // You can change the font family with the theme.typography.fontFamily property. 
        fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
        fontSize : 12,
        h1 : {
            fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
            fontSize : 40,
        },
        h2 : {
            fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
            fontSize : 32,
        },
        h3 : {
            fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
            fontSize : 24,
        },
        h4 : {
            fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
            fontSize : 20,
        },
        h5 : {
            fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
            fontSize : 16,
        },h6 : {
            fontFamily : ["Source Sans Pro" , "sans-serif"].join(","),
            fontSize : 14,
        },
    },
  };
};


// Context for color mode   
export const ColorModeContext = createContext({
    toggleColorMode : () => {}, // function responsible for changing theme 
});

export const useMode  = () => {
    const [mode , setMode] = useState("dark"); // usestate hook

    const colorMode = useMemo(  // memorize the theme object based on current mode
        () => ({
            toggleColorMode : ()=>
                setMode((prev) => (prev == "light" ? "dark" : "light"))
        }),[]);
    
    const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);

    return [theme,colorMode];
};

/* 
Here's a step-by-step breakdown of how the code works:
1. Define Color Tokenstokens(mode) is a function that returns an object 
containing color tokens for either light or dark mode.If mode is 'dark',
 it returns a set of colors suitable for dark themes.If mode is 'light', 
 it returns a set of colors suitable for light themes.
 
2. Theme SettingsthemeSettings(mode) uses the tokens function to get color tokens 
based on the mode.It returns an object with settings for the Material-UI theme, 
including:Palette: Defines primary, secondary, neutral, and background colors based on the mode.
Typography: Specifies font family and sizes for different header levels (h1, h2, etc.).

3. Color Mode ContextColorModeContext is created using createContext to provide a context for 
toggling between light and dark modes.toggleColorMode is a function that will be used to switch
between light and dark modes.

4. Custom Hook for Theme and Color ModeuseMode is a custom hook that:Manages the current theme 
mode using the useState hook, initialized to 'dark'.Provides a colorMode object with a 
toggleColorMode function to switch between light and dark modes.Uses useMemo to create and 
memoize the theme object based on the current mode.Returns both the theme and colorMode objects.


Flow of Code ExecutionInitialization:
When useMode is called, it initializes the state with the default mode ('dark').
colorMode is set up to allow toggling between light and dark modes.
Creating the Theme:The theme object is created using createTheme with the 
settings returned by themeSettings(mode), based on the current mode.

Context Usage:ColorModeContext provides toggleColorMode to components that need to switch 
between modes.Components using useMode will receive the theme and colorMode objects and can 
apply the theme to their Material-UI components.Switching Modes:When toggleColorMode is called, 
it updates the state, which triggers a re-render of components that use the theme and 
colorMode from useMode.Dynamic Styling:The theme object will be updated based on the current mode,
allowing the UI to dynamically switch between light and dark themes as the state changes.
This setup allows for a flexible theme management system where components can easily switch between 
light and dark modes, and apply consistent styles throughout the application.

*/