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
import { socket } from "../../services/socket";

type Props = {
  setChatId: any;
  setSelectContact: any;
  userId: string;
};

export const Contacts = ({ setChatId, setSelectContact, userId }: Props) => {
  const matches = useMediaQuery("(min-width:900px)");
  const [contacts, setContacts] = useState<IContact[]>([]);

  const fetchContacts = async () => {
    const { get } = new Cookies();
    const tokenJWT = await get(); // Esperando a Promise diretamente
    const { data } = decodeToken(tokenJWT) as any;
    try {
      const res = await api.get(`/user/getContacts/${data}`);
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const setSocketNotification = async () => {
      const { get } = new Cookies();
      const tokenJWT = await get();
      const { data } = decodeToken(tokenJWT) as any;
      socket.on(data, async () => {
        const { get } = new Cookies();
        const tokenJWT = await get(); 
        const { data } = decodeToken(tokenJWT) as any;
        try {
          const res = await api.get(`/user/getContacts/${data}`);
          setContacts(res.data);
        } catch (error) {
          console.log(error);
        }
      });
      socket.emit(`notification`, {
        userId: data,
      });
    };

    setSocketNotification();

    return () => {
      socket.off("notification", (data: any) => {});
    };
  }, [socket]);

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
                      contacts={contacts}
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
                      contacts={contacts}
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
