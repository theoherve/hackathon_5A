export const mistralService = {
  async fetchUserAlert(message: any[]): Promise<PatientAlert | undefined> {
    
    const result = fetch("/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }).then(res => res.json()).catch((err) => {
      console.log(err);
    });
    return result;
  },
};