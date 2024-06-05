import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { Virtuoso } from "react-virtuoso";
import { api } from "../../services/api";
import { Cookies } from "../../services/cookies";
import { IContact } from "../../types/IContact";
import { Contact } from "../Contact";
import { ModalAddContact } from "../ModalAddContact";

type Props = {
  setChatId: any;
  setSelectContact: any;
};

export const Contacts = ({ setChatId, setSelectContact }: Props) => {
  const matches = useMediaQuery("(min-width:900px)");
  const [contacts, setContacts] = useState<IContact[]>([]);
  useEffect(() => {
    (async () => {
      const { get } = new Cookies();
      const tokenJWT = (await get()) as string;
      const { data } = decodeToken(tokenJWT) as any;
      try {
        const res = await api.get(`/user/getContacts/${data}`);
        setContacts(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {matches ? (
        <Box paddingRight={1} paddingLeft={1} paddingTop={1}>
          <Box justifyContent={"space-between"} display={"flex"}>
            <Typography variant="h6" gutterBottom>
              Contatos
            </Typography>
            <ModalAddContact setContacts={setContacts} />
          </Box>
          <Box paddingTop={1}>
            <Box
              sx={{ background: "#F3F3F3", borderRadius: 2 }}
              display={"flex"}
            >
              <IconButton
                type="button"
                disabled
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                fullWidth
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar..."
              />
            </Box>
            <Box marginTop={2}>
              <Virtuoso
                style={{ height: "500px" }}
                totalCount={contacts.length}
                itemContent={(index) => (
                  <>
                    <Contact
                      setChatId={setChatId}
                      contact={contacts[index]}
                      setSelectContact={setSelectContact}
                      key={index}
                    />
                  </>
                )}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box height={"100vh"} bgcolor={"#ffffff"} p={2}>
          <Box justifyContent={"space-between"} display={"flex"}>
            <Typography variant="h6" gutterBottom>
              Contatos
            </Typography>
            <ModalAddContact setContacts={setContacts} />
          </Box>
          <Box paddingTop={1}>
            <Box
              sx={{ background: "#F3F3F3", borderRadius: 2 }}
              display={"flex"}
            >
              <IconButton
                type="button"
                disabled
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                fullWidth
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar..."
              />
            </Box>
            <Box marginTop={2}>
              <Virtuoso
                style={{ height: "500px" }}
                totalCount={contacts.length}
                itemContent={(index) => (
                  <>
                    <Contact
                      setChatId={setChatId}
                      contact={contacts[index]}
                      setSelectContact={setSelectContact}
                      key={index}
                    />
                  </>
                )}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
