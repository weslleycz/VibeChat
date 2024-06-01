import { Box } from "@mui/material";
import { IonImg } from "@ionic/react";
import styles from './styles.module.scss';

export const Splash = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          background: "#1DD3C5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IonImg className={styles.logo} src="./logo.svg" />
      </Box>
    </>
  );
};
