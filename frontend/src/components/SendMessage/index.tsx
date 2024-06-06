import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";

type Props = {
  chatId: string;
};

export const SendMessage = ({ chatId }: Props) => {
  const matches = useMediaQuery("(min-width:900px)");
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
      {matches ? (
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
              sx={{
                background: "#ffffff",
              }}
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
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              zIndex: 0,
              justifyContent: "center",
              width: "100%",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Box p={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={text}
                sx={{
                  border: "1px solid #1DD3C5",
                  borderRadius: 25,
                  background: "#ffffff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                  },
                }}
                onChange={(e) => setText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Box>
                      <InputAdornment position="end">
                        <IconButton type="submit" color="primary" edge="end">
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    </Box>
                  ),
                }}
              />
            </Box>
          </Box>
        </form>
      )}
    </>
  );
};
