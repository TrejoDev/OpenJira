import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const darktTheme = createTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main: '#19854b'
      },
      error: {
        main: red.A400
      }
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0
        },
        styleOverrides: {
          root: {
            backgroundColor: '#4a148c'
          }
        }
      }
    }
  });