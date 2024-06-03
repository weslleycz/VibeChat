import { ReactNode, useState } from "react";
import { Display } from "../Display";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { MenuMobile } from "../MenuMobile";

type Props = {
  children: ReactNode;
};

type StatusChat = "contatus" | "profile";

export const ContainerChat = ({ children }: Props) => {
  const [chatStatus, setChatStatus] = useState<StatusChat>("contatus");
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      {matches ? (
        <Box sx={{ background: "#F3F3F3" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Display setChatStatus={setChatStatus} chatStatus={chatStatus} />
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
          <Display setChatStatus={setChatStatus} chatStatus={chatStatus} />
          <MenuMobile setChatStatus={setChatStatus} chatStatus={chatStatus} />
        </>
      )}
    </>
  );
};
