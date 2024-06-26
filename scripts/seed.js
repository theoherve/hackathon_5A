// /scripts/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const dataPath = path.join(__dirname, 'messages.json');
  const rawData = fs.readFileSync(dataPath);
  const messagesData = JSON.parse(rawData);

  const users = [
    { lastname: 'Loraine', firstname: 'Agnès', phoneNumber: '0612367543', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', audioPath: '/audio/user_1.wav', createdAt: new Date('2023-02-15T08:35:24Z'), updatedAt: new Date('2023-05-20T15:45:10Z') },
    { lastname: 'Dupont', firstname: 'Jean', phoneNumber: '0612345678', state:'alert', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-02-15T08:35:24Z'), updatedAt: new Date('2023-05-20T15:45:10Z') },
    { lastname: 'Martin', firstname: 'Marie', phoneNumber: '0623456789', state:'ok', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-03-22T12:15:44Z'), updatedAt: new Date('2023-06-18T10:05:30Z') },
    { lastname: 'Bernard', firstname: 'Pierre', phoneNumber: '0634567890', state:'alert', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-01-30T14:55:12Z'), updatedAt: new Date('2023-04-25T09:20:55Z') },
    { lastname: 'Dubois', firstname: 'Lucie', phoneNumber: '0645678901', state:'danger', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-04-18T16:45:37Z'), updatedAt: new Date('2023-07-10T11:50:22Z') },
    { lastname: 'Thomas', firstname: 'Louis', phoneNumber: '0656789012', state:'problem', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-02-10T07:25:11Z'), updatedAt: new Date('2023-05-15T13:35:33Z') },
    { lastname: 'Robert', firstname: 'Juliette', phoneNumber: '0667890123', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-03-05T09:15:29Z'), updatedAt: new Date('2023-06-01T14:45:50Z') },
    { lastname: 'Richard', firstname: 'Nicolas', phoneNumber: '0678901234', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-05-10T11:35:22Z'), updatedAt: new Date('2023-08-12T16:25:40Z') },
    { lastname: 'Petit', firstname: 'Sophie', phoneNumber: '0689012345', state:'alert', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-01-15T13:45:54Z'), updatedAt: new Date('2023-04-20T18:35:55Z') },
    { lastname: 'Durand', firstname: 'Emma', phoneNumber: '0690123456', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-02-28T15:25:47Z'), updatedAt: new Date('2023-05-22T20:05:34Z') },
    { lastname: 'Leroy', firstname: 'Hugo', phoneNumber: '0601234567', state:'problem', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-03-20T10:15:36Z'), updatedAt: new Date('2023-06-05T22:45:10Z') },
    { lastname: 'Moreau', firstname: 'Chloe', phoneNumber: '0602345678', state:'danger', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-04-08T08:35:49Z'), updatedAt: new Date('2023-07-18T12:15:29Z') },
    { lastname: 'Simon', firstname: 'Gabriel', phoneNumber: '0603456789', state:'alert', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-01-25T14:55:10Z'), updatedAt: new Date('2023-04-30T09:20:30Z') },
    { lastname: 'De Ferie Leitière', firstname: 'Armand', phoneNumber: '0601234567', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-03-20T10:15:36Z'), updatedAt: new Date('2023-06-05T22:45:10Z') },
    { lastname: 'Airvé', firstname: 'Théo', phoneNumber: '0602345678', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-04-08T08:35:49Z'), updatedAt: new Date('2023-07-18T12:15:29Z') },
    { lastname: 'Arh dit', firstname: 'Alexandre', phoneNumber: '0603456789', state:'alert', protocole:'Protocole', sms:'non', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', createdAt: new Date('2023-01-25T14:55:10Z'), updatedAt: new Date('2023-04-30T09:20:30Z') },
  ];

  for (const index in users) {
    const createdUser = await prisma.user.create({
      data: users[index],
    });

    const messages = messagesData[index];

    for(const message of messages) {
      await prisma.message.create({
        data: {
          content: message.content,
          fromUser: message.fromUser === 'patient',
          userId: createdUser.id,
        },
      });
    }
  }

  console.log(`Inserted ${users.length} users and their messages`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
