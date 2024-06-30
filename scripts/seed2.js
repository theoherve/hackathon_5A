// /scripts/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

async function main() {
  const dataPath = path.join(__dirname, "messages2.json");
  const rawData = fs.readFileSync(dataPath);
  const messagesData = JSON.parse(rawData);

  const users = [
    {
      lastname: "Doe",
      firstname: "Jon",
      phoneNumber: "0603456789",
      state: "alert",
      protocole: "Protocole",
      sms: "non",
      dateRef: "01/01/2021",
      numOp: "123456",
      ipp: "26012001",
      dateNaissance: "26/01/2001",
      medecin: "Dr. Smith",
      createdAt: new Date("2023-01-25T14:55:10Z"),
      updatedAt: new Date("2023-04-30T09:20:30Z"),
    },
  ];

  for (const index in users) {
    const createdUser = await prisma.user.create({
      data: users[index],
    });

    const messages = messagesData[index];

    for (const message of messages) {
      await prisma.message.create({
        data: {
          content: message.content,
          fromUser: message.fromUser === "patient",
          userId: createdUser.id,
        },
      });
    }
  }

  console.log(`Inserted ${users.length} users and their messages`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
