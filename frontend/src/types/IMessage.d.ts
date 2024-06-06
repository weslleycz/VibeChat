export type IMessage = {
  content: "string";
  id: string;
  userId: string;
  sentAt: Date;
  chatId: string;
  read: boolean;
  retracted: boolean;
  user: {
    name: string;
  };
};
