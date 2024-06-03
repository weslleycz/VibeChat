import { Box } from "@mui/material";
import { IonImg } from "@ionic/react";
import styles from "./styles.module.scss";

export const MessageClosed = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        bgcolor={"#1DD3C5"}
      >
        <IonImg
          className={styles["art-image"]}
          src="./undraw_personal_opinions_re_qw29.svg"
        />
      </Box>
    </>
  );
};
