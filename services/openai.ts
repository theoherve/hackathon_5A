export const openaiService = {
  async fetchAudioTransciption(path: string) {
    const result = fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    }).then(res => res.json()).catch((err) => {
      console.log(err);
    });
    return result;
  },
}