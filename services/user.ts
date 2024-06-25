export const userService = {
  async fetchAll() {
     const result = fetch("/api/users").then(res => res.json()).catch((err) => {
       console.log(err);
     });
     console.log(result);
    return result;
  },
};
