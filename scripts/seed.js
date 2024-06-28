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
    { lastname: 'Delatre', firstname: 'Marie', phoneNumber: '0675678924', state:'ok', protocole:'Protocole', sms:'oui', dateRef: "01/01/2021", numOp:'123456', ipp: '26012001', dateNaissance: '26/01/2001', medecin: 'Dr. Smith', audioPath: '/audio/user_2.wav', createdAt: new Date('2023-02-15T08:35:24Z'), updatedAt: new Date('2023-05-20T15:45:10Z') },
    { lastname: 'Martin', firstname: 'Claire', phoneNumber: '0698765432', state: 'problem', protocole: 'Protocole A', sms: 'oui', dateRef: "02/02/2021", numOp: '654321', ipp: '15021985', dateNaissance: '15/02/1985', medecin: 'Dr. Johnson', createdAt: new Date('2023-03-10T09:25:30Z'), updatedAt: new Date('2023-06-18T10:55:45Z') },
    { lastname: 'Bernard', firstname: 'Luc', phoneNumber: '0687654321', state: 'problem', protocole: 'Protocole B', sms: 'non', dateRef: "03/03/2021", numOp: '789123', ipp: '10031990', dateNaissance: '10/03/1990', medecin: 'Dr. Lee', createdAt: new Date('2023-04-05T10:15:35Z'), updatedAt: new Date('2023-07-22T11:05:50Z') },
    { lastname: 'Durand', firstname: 'Sophie', phoneNumber: '0676543210', state: 'ok', protocole: 'Protocole C', sms: 'oui', dateRef: "04/04/2021", numOp: '321654', ipp: '05041975', dateNaissance: '05/04/1975', medecin: 'Dr. Kim', createdAt: new Date('2023-05-15T11:45:40Z'), updatedAt: new Date('2023-08-25T12:15:55Z') },
    { lastname: 'Lefevre', firstname: 'Marc', phoneNumber: '0665432109', state: 'alert', protocole: 'Protocole D', sms: 'non', dateRef: "05/05/2021", numOp: '456789', ipp: '20051960', dateNaissance: '20/05/1960', medecin: 'Dr. Garcia', createdAt: new Date('2023-06-20T12:55:45Z'), updatedAt: new Date('2023-09-30T13:25:00Z') },
    { lastname: 'Moreau', firstname: 'Julie', phoneNumber: '0654321098', state: 'problem', protocole: 'Protocole E', sms: 'oui', dateRef: "06/06/2021", numOp: '987654', ipp: '01061970', dateNaissance: '01/06/1970', medecin: 'Dr. Martin', createdAt: new Date('2023-07-25T13:35:50Z'), updatedAt: new Date('2023-10-02T14:45:05Z') },
    { lastname: 'Dupont', firstname: 'Paul', phoneNumber: '0645123456', state: 'alert', protocole: 'Protocole A', sms: 'non', dateRef: "12/12/2022", numOp: '123456', ipp: '02021980', dateNaissance: '02/02/1980', medecin: 'Dr. Lefevre', createdAt: new Date('2023-05-15T10:20:30Z'), updatedAt: new Date('2023-09-20T11:30:40Z') },
    { lastname: 'Durand', firstname: 'Marie', phoneNumber: '0612345678', state: 'ok', protocole: 'Protocole B', sms: 'oui', dateRef: "15/01/2023", numOp: '654321', ipp: '15031985', dateNaissance: '15/03/1985', medecin: 'Dr. Bernard', createdAt: new Date('2023-06-10T09:15:25Z'), updatedAt: new Date('2023-11-05T10:25:35Z') },
    { lastname: 'Lefevre', firstname: 'Luc', phoneNumber: '0656781234', state: 'ok', protocole: 'Protocole C', sms: 'non', dateRef: "20/03/2021", numOp: '789012', ipp: '30041975', dateNaissance: '30/04/1975', medecin: 'Dr. Dubois', createdAt: new Date('2023-07-20T08:10:15Z'), updatedAt: new Date('2023-12-10T09:20:25Z') },
    { lastname: 'Morel', firstname: 'Sophie', phoneNumber: '0667891234', state: 'danger', protocole: 'Protocole D', sms: 'oui', dateRef: "05/05/2020", numOp: '456789', ipp: '25061990', dateNaissance: '25/06/1990', medecin: 'Dr. Thomas', createdAt: new Date('2023-08-05T07:05:10Z'), updatedAt: new Date('2023-10-15T08:15:20Z') },
    { lastname: 'Bertrand', firstname: 'Jean', phoneNumber: '0678901234', state: 'problem', protocole: 'Protocole F', sms: 'non', dateRef: "10/10/2021", numOp: '321654', ipp: '15071965', dateNaissance: '15/07/1965', medecin: 'Dr. Richard', createdAt: new Date('2023-09-10T06:00:05Z'), updatedAt: new Date('2023-11-20T07:10:15Z') },
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
