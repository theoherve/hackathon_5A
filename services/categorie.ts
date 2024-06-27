import { Categorie } from "@prisma/client";

export const categorieService = {
  async fetchAll() {
    const result = fetch("/api/categorie")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return result;
  },

  async create(body: { name: string; isActive: boolean }) {
    const result = fetch("/api/categorie", {
      method: "POST",
      body: JSON.stringify({ name: body.name, isActive: body.isActive }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    return result;
  },

  async update(body: Categorie) {
    const result = fetch("/api/categorie", {
      method: "PUT",
      body: JSON.stringify({ name: body.name, isActive: body.isActive }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    return result;
  },
};
