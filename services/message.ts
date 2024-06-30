import { Message } from "@prisma/client";

export const messageService = {
  async fetchAll(): Promise<Message[]> {
    const result = fetch("/api/message")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return result;
  },
};
