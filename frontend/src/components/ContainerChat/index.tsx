import { ReactNode, useState } from "react";
import { Contacts } from "../Contacts";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { MenuMobile } from "../MenuMobile";

type Props = {
  children: ReactNode;
};

type StatusChat = "contatus" | "profile" | "message";

export const ContainerChat = ({ children }: Props) => {
  const [chatStatus, setChatStatus] = useState<StatusChat>("contatus");
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      {matches ? (
        <Box sx={{ background: "#F3F3F3" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Contacts setChatStatus={setChatStatus} chatStatus={chatStatus} />
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ height: "100vh", background: "#ffffff" }}>
                {children}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          <Contacts setChatStatus={setChatStatus} chatStatus={chatStatus} />
          <MenuMobile setChatStatus={setChatStatus} chatStatus={chatStatus} />
        </>
      )}
    </>
  );
};
