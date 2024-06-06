import { Box, Stack, useMediaQuery } from "@mui/material";
import { Contacts } from "../Contacts";
import { MenuPWA } from "../MenuPWA";
import { MessageOpen } from "../MessageOpen";
import { Perfil } from "../Perfil";

type StatusChat = "contatus" | "profile";

type Prosp = {
  chatStatus: StatusChat;
  setChatStatus: any;
  setChatId: any;
  setSelectContact: any;
  userId: string;
  selectContact: any;
  chatId: any;
};

export const Display = ({
  chatStatus,
  setChatStatus,
  setChatId,
  setSelectContact,
  userId,
  chatId,
  selectContact,
}: Prosp) => {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      {matches ? (
        <Box
          sx={{
            height: "100vh",
            background: "#ffffff",
            paddingRight: 1,
          }}
        >
          <Box>
            <Stack sx={{ margin: 0 }} direction="row" spacing={1}>
              <Box>
                <MenuPWA
                  setChatStatus={setChatStatus}
                  chatStatus={chatStatus}
                />
              </Box>
              {chatStatus === "contatus" ? (
                <Contacts
                  setSelectContact={setSelectContact}
                  setChatId={setChatId}
                  userId={userId}
                />
              ) : <Perfil />}
            </Stack>
          </Box>
        </Box>
      ) : (
        <>
          {chatStatus === "contatus" ? (
            <>
              {chatId === "" ? (
                <Contacts
                  setSelectContact={setSelectContact}
                  setChatId={setChatId}
                  userId={userId}
                />
              ) : (
                <MessageOpen
                setChatId={setChatId}
                 selectContact={selectContact} chatId={chatId} />
              )}
            </>
          ) : <Perfil />}
        </>
      )}
    </>
  );
};
