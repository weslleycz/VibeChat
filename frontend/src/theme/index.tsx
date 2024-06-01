import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1DD3C5",
      contrastText: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          ":hover":{
            boxShadow: "none",
          }
        },
      },
    },
    MuiAvatar:{
      styleOverrides:{
        root:{
          background: "#1DD3C5"
        }
      }
    },
  },
});