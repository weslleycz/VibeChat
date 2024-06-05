import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";

type Props = {
  chatId: string;
};

export const SendMessage = ({  chatId }: Props) => {
  const [text, setText] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { get } = new Cookies();
    const tokenJWT = (await get()) as string;
    const { data } = decodeToken(tokenJWT) as any;
    if (text != "") {
      try {
        await api.post("/message", {
          userId: data,
          chatId: chatId,
          content: text,
        });
        setText("");
        // await fetchMessage();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: "fixed",
            width: "70%",
            bottom: 0,
            zIndex: 0,
            justifyContent: "center",
          }}
          p={3}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary" edge="end">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </form>
    </>
  );
};
