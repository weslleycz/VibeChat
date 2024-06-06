import { ReactNode, useEffect, useState } from "react";
import { Display } from "../Display";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { MenuMobile } from "../MenuMobile";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";

type Props = {
  children: ReactNode;
  setChatId: any;
  setSelectContact: any;
  selectContact: any;
  chatId: any;
};

type StatusChat = "contatus" | "profile";

export const ContainerChat = ({
  children,
  setChatId,
  setSelectContact,
  chatId,
  selectContact,
}: Props) => {
  const [chatStatus, setChatStatus] = useState<StatusChat>("contatus");
  const matches = useMediaQuery("(min-width:900px)");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    (async () => {
      const { get } = new Cookies();
      const tokenJWT = (await get()) as string;
      const { data } = decodeToken(tokenJWT) as any;
      setUserId(data);
    })();
  }, []);
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
                userId={userId}
                chatId={chatId}
                selectContact={selectContact}
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
            userId={userId}
            chatId={chatId}
            selectContact={selectContact}
          />
          {chatId === "" ? (
            <MenuMobile setChatStatus={setChatStatus} chatStatus={chatStatus} />
          ) : null}
        </>
      )}
    </>
  );
};
