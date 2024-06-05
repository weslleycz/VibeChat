import { Box } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { socket } from "../../services/socket";
import { IMessage } from "../../types/IMessage";
import { SendMessage } from "../SendMessage";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { Virtuoso } from "react-virtuoso";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";

type Props = {
  chatId: string;
  selectContact: string;
};

export const MessageOpen = ({ chatId }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState("");

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

  return (
    <>
      <Box bgcolor={"#ffffff"} height={"100vh"} paddingBottom="64px">
        <Box p={2}>
          <Virtuoso
            style={{ height: "85vh" }}
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
                      // retracted
                      removeButton
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
