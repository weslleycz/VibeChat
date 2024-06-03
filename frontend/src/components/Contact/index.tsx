import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { IContact } from "../../types/IContact";
import { useEffect, useState } from "react";

type Props = IContact;

export const Contact = ({ name }: Props) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Hey, what's up?
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
