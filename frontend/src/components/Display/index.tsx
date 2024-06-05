import { Box, Stack, useMediaQuery } from "@mui/material";
import { Contacts } from "../Contacts";
import { MenuPWA } from "../MenuPWA";

type StatusChat = "contatus" | "profile";

type Prosp = {
  chatStatus: StatusChat;
  setChatStatus: any;
  setChatId: any;
  setSelectContact: any;
};

export const Display = ({
  chatStatus,
  setChatStatus,
  setChatId,
  setSelectContact,
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
                />
              ) : null}
            </Stack>
          </Box>
        </Box>
      ) : (
        <>
          {chatStatus === "contatus" ? (
            <Contacts
              setSelectContact={setSelectContact}
              setChatId={setChatId}
            />
          ) : null}
        </>
      )}
    </>
  );
};
