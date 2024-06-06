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
  contacts: IContact[];
};

export const Contact = ({
  contact,
  setChatId,
  setSelectContact,
  contacts,
}: Props) => {
  const [lastMessage, setLastMessage] = useState("");
  const [notRead, setNotRead] = useState(0);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(
          `/message/getMessagesNotRead/${contact.chatId}/${contact.id}`
        );
        setLastMessage(res.data.lastMessage);
        setNotRead(res.data.notRead);
        setAvatar(res.data.avatar)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [contacts]);

  const handleMessagesRead = async () => {
    try {
      await api.get(`/message/messagesRead/${contact.chatId}/${contact.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectContact = async (chatId: string, contactId: string) => {
    setChatId(chatId);
    setNotRead(0);
    setSelectContact(contactId);
    await handleMessagesRead();
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
            <Avatar src={avatar} />
          </ListItemAvatar>
          <ListItemText>
            <Box justifyContent={"space-between"} display={"flex"}>
              <Typography variant="subtitle1">{contact.name}</Typography>
              {notRead != 0 && <Chip color="primary" label={notRead} />}
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
