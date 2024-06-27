export const messageService = {
  async fetchAll() {
    const result = fetch("/api/message")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return result;
  },
};
