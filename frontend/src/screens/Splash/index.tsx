import { Box } from "@mui/material";
import { IonImg } from "@ionic/react";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Cookies } from "../../services/cookies";

export const Splash = () => {
  const history = useHistory();
  useEffect(() => {
    const timer = setTimeout(async () => {
      const { get } = new Cookies();
      const token = await get();
      console.log(!!token);
      if (!!token) {
        history.push("/chat");
      }else{
        history.push("/auth");
      }
    }, 1000);

    // Cleanup do timeout quando o componente for desmontado
    return () => clearTimeout(timer);
  }, [history]);
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
