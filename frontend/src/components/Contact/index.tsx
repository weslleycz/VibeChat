import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { IContact } from "../../types/IContact";

type Props = {
  contact: IContact;
  setChatId: any;
  setSelectContact: any;
};

export const Contact = ({ contact, setChatId, setSelectContact }: Props) => {
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
            <Typography variant="subtitle1">{contact.name}</Typography>
            <Typography variant="body2" color="textSecondary"></Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
