export const userService = {
  async fetchAll() {
    return fetch("/api/users").catch((err) => {
      console.log(err);
    });
  },
};
