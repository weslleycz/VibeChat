import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Virtuoso } from "react-virtuoso";
import { Contact } from "../Contact";
import { useEffect, useState } from "react";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";
import { api } from "../../services/api";
import { IContact } from "../../types/IContact";
import { ModalAddContact } from "../ModalAddContact";

export const Contacts = () => {
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
                    <Contact key={index} {...contacts[index]} />
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
          </Box>
        </Box>
      )}
    </>
  );
};
