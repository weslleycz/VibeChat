import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { IContact } from "../../types/IContact";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

type Props = {
  contact: IContact;
  setChatId: any;
  setSelectContact: any;
};

export const Contact = ({ contact, setChatId, setSelectContact }: Props) => {
  const [lastMessage, setLastMessage] = useState("fghghfgh");
  const [notRead, setNotRead] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(
          `/message/getMessagesNotRead/${contact.chatId}/${contact.id}`
        );
        setLastMessage(res.data.lastMessage);
        setNotRead(res.data.notRead);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleSelectContact = (chatId: string, contactId: string) => {
    setChatId(chatId);
    setSelectContact(contactId);
  };
  return (
    <>
      <List
        sx={{
          width: "100%",
          cursor: "pointer",
        }}
        onClick={() => handleSelectContact(contact.chatId, contact.id)}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText>
            <Box justifyContent={"space-between"} display={"flex"}>
              <Typography variant="subtitle1">{contact.name}</Typography>
              {notRead != 0 &&  <Chip color="primary" label={notRead} />}
            </Box>
            <Typography variant="body2" color="textSecondary">
              {lastMessage.length > 16
                ? `${lastMessage.substring(0, 12)}...`
                : lastMessage}
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
