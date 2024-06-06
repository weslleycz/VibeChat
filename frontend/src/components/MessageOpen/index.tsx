import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { decodeToken } from "react-jwt";
import { Virtuoso } from "react-virtuoso";
import { api } from "../../services/api";
import { Cookies } from "../../services/cookies";
import { socket } from "../../services/socket";
import { IMessage } from "../../types/IMessage";
import { SendMessage } from "../SendMessage";

type Props = {
  chatId: string;
  selectContact: string;
  setChatId: any;
};

export const MessageOpen = ({ chatId, setChatId }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState("");

  const matches = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    (async () => {
      if (chatId != "") {
        const socketInstancia = socket;
        socketInstancia.emit(`chat`, {
          chatId: chatId,
        });

        socketInstancia.on(`chat`, async (data: any) => {});

        return () => {
          socketInstancia.off("chat", (data: any) => {});
        };
      }
    })();
  }, []);

  useEffect(() => {
    if (chatId != "") {
      (async () => {
        const socketInstancia = socket;
        socketInstancia.on(chatId, async (data: any) => {
          await fetchMessage();
        });

        return () => {
          socketInstancia.off(chatId, (data: any) => {});
        };
      })();
    }
  }, [chatId]);

  const fetchMessage = async () => {
    try {
      const res = await api.get(`/message/${chatId}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatId != "") {
      fetchMessage();
    }
  }, [chatId]);

  useEffect(() => {
    (async () => {
      const { get } = new Cookies();
      const tokenJWT = (await get()) as string;
      const { data } = decodeToken(tokenJWT) as any;
      setUserId(data);
    })();
  }, []);

  const messageDelete = async (messageId: string) => {
    try {
      const { get } = new Cookies();
      const tokenJWT = (await get()) as string;
      const { data } = decodeToken(tokenJWT) as any;
      await api.delete(`/message/messageDelete/${data}/${messageId}`);
      await fetchMessage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {matches ? null : (
        <Box
          color={"#ffffff"}
          bgcolor={"#1DD3C5"}
          display={"flex"}
          p={1}
          alignItems="center"
        >
          <IconButton sx={{ color: "#ffffff" }} onClick={() => setChatId("")}>
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Typography sx={{ fontWeight: 900 }} variant="h6" gutterBottom>
              Mensagem
            </Typography>
          </Box>
        </Box>
      )}

      <Box bgcolor={"#ffffff"} height={"100vh"} paddingBottom="64px">
        <Box p={2}>
          <Virtuoso
            style={{ height: matches ? "85vh" : "77vh" }}
            totalCount={messages.length}
            initialTopMostItemIndex={messages.length - 1}
            followOutput={(isAtBottom) => (isAtBottom ? "smooth" : false)}
            itemContent={(index) => (
              <>
                <Fragment key={messages[index].id}>
                  <Box marginBottom={1}>
                    <MessageBox
                      position={
                        messages[index].userId === userId ? "left" : "right"
                      }
                      type={"text"}
                      title={messages[index].user.name}
                      text={messages[index].content}
                      date={new Date(messages[index].sentAt)}
                      onRemoveMessageClick={() =>
                        messageDelete(messages[index].id)
                      }
                      retracted={messages[index].retracted}
                      removeButton={messages[index].userId === userId}
                      status={messages[index].read ? "read" : "sent"}
                      styles={{
                        background:
                          messages[index].userId === userId ? "#b8fcf6" : "",
                      }}
                    />
                  </Box>
                </Fragment>
              </>
            )}
          />
        </Box>

        <SendMessage chatId={chatId} />
      </Box>
    </>
  );
};
