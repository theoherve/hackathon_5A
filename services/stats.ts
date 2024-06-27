export const statsService = {
  async fetchStats(message: any, categories: any[]): Promise<any> {
    const result = await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        categories: categories.map((value) => value.name),
      }),
    });

    return result.json();
  },
};
