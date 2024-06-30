import { Message, Statistic } from "@prisma/client";
import { categorieService } from "./categorie";
import { messageService } from "./message";
import { statsService } from "./stats";

export const statisticService = {
  async fetchAll(): Promise<Statistic[]> {
    const result = fetch("/api/statistics")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return result;
  },

  async create() {
    const [messages, categories] = await Promise.all([
      messageService.fetchAll(),
      categorieService.fetchAll(),
    ]);

    const stats = await statsService.fetchStats(
      messages.map((msg: Message) => msg.content),
      categories
    );

    const result = await fetch("/api/statistics", {
      method: "POST",
      body: JSON.stringify({
        statistics: stats,
        messages: messages.map((msg: Message) => msg.id),
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    return result;
  },
};
