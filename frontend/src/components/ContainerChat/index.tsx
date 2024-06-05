import { ReactNode, useState } from "react";
import { Display } from "../Display";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { MenuMobile } from "../MenuMobile";

type Props = {
  children: ReactNode;
  setChatId: any;
  setSelectContact: any;
};

type StatusChat = "contatus" | "profile";

export const ContainerChat = ({
  children,
  setChatId,
  setSelectContact,
}: Props) => {
  const [chatStatus, setChatStatus] = useState<StatusChat>("contatus");
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      {matches ? (
        <Box sx={{ background: "#F3F3F3" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Display
                setChatId={setChatId}
                setChatStatus={setChatStatus}
                chatStatus={chatStatus}
                setSelectContact={setSelectContact}
              />
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
          <Display
            setChatId={setChatId}
            setChatStatus={setChatStatus}
            chatStatus={chatStatus}
            setSelectContact={setSelectContact}
          />
          <MenuMobile setChatStatus={setChatStatus} chatStatus={chatStatus} />
        </>
      )}
    </>
  );
};
