import { useState } from "react";
import { ContainerChat } from "../../components/ContainerChat";
import { MessageClosed } from "../../components/MessageClosed";
import { MessageOpen } from "../../components/MessageOpen";

export const Chat = () => {
  const [chatId, setChatId] = useState("");
  const [selectContact, setSelectContact] = useState("");
  return (
    <>
      <ContainerChat setSelectContact={setSelectContact} setChatId={setChatId}>
        {chatId === "" ? (
          <MessageClosed />
        ) : (
          <MessageOpen selectContact={selectContact} chatId={chatId} />
        )}
      </ContainerChat>
    </>
  );
};
