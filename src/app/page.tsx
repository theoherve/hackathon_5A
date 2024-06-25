"use client";
import React from 'react';
import { Menu, Table, Tooltip } from 'antd';
import Image from "next/image"

const Header = () => (
  <div className="mb-12">
    <Menu mode="horizontal" className="flex justify-between items-center">
      <div>
        <Menu.Item>
          <Image
            src="/CALMEDICA_LOGO.png"
            width={100}
            height={40}
            alt="Calmedica logo"
          />
        </Menu.Item>
      </div>
      <Menu.Item key="patients">Afficher les patients</Menu.Item>
      <Menu.Item key="waiting">Liste d&apos;attente</Menu.Item>
      <Menu.Item key="report">Rapport</Menu.Item>
      <Menu.Item key="dashboard">Tableau de bord</Menu.Item>
      <Menu.Item key="permissions">Autorisations</Menu.Item>
    </Menu>
  </div>
);

const columns = [
  {
    title: 'Boule',
    dataIndex: 'boule',
    key: 'boule',
    render: (text: string, record: string) => (
      <Tooltip title={text}>
      <div style={{
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        backgroundColor: record.bouleColor,
      }}/>
      </Tooltip>
    ),
  },
  { title: 'Étape', dataIndex: 'etape', key: 'etape' },
  { title: 'Protocole', dataIndex: 'protocole', key: 'protocole' },
  { title: 'Tel portable', dataIndex: 'tel', key: 'tel' },
  { title: 'Suivi SMS', dataIndex: 'sms', key: 'sms' },
  { title: 'Date de référence', dataIndex: 'dateRef', key: 'dateRef' },
  { title: 'Etat', dataIndex: 'etat', key: 'etat' },
  { title: 'Numéro d\'opération', dataIndex: 'numOp', key: 'numOp' },
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'IPP', dataIndex: 'ipp', key: 'ipp' },
  { title: 'Date de naissance', dataIndex: 'dateNaissance', key: 'dateNaissance' },
  { title: 'Médecin', dataIndex: 'medecin', key: 'medecin' },
];

const data = [
  {
    boule: 'Saignement important !',
    bouleColor: '#ff0000',
    etape: '1',
    protocole: 'Protocole 1',
    tel: '06 12 34 56 78',
    sms: 'Oui',
    dateRef: '01/01/2021',
    etat: 'En attente',
    numOp: '123456',
    nom: 'Doe',
    prenom: 'John',
    ipp: '123456789',
    dateNaissance: '01/01/1970',
    medecin: 'Dr. Smith',
  },
  {
    boule: 'Tout va bien !',
    bouleColor: '#00ff00',
    etape: '2',
    protocole: 'Protocole 2',
    tel: '06 12 34 56 78',
    sms: 'Oui',
    dateRef: '01/01/2021',
    etat: 'En attente',
    numOp: '123456',
    nom: 'Doe',
    prenom: 'Jane',
    ipp: '123456789',
    dateNaissance: '01/01/1970',
    medecin: 'Dr. Smith',
  },
  {
    boule: 'Attention à ce patient à surveiller',
    bouleColor: '#0000ff',
    etape: '3',
    protocole: 'Protocole 3',
    tel: '06 12 34 56 78',
    sms: 'Oui',
    dateRef: '01/01/2021',
    etat: 'En attente',
    numOp: '123456',
    nom: 'Doe',
    prenom: 'Alice',
    ipp: '123456789',
    dateNaissance: '01/01/1970',
    medecin: 'Dr. Smith',
  },
];

const DataTable = () => (
  <div className="px-4">
    <Table columns={columns} dataSource={data} />
  </div>
);

const App = () => (
  <div className="h-dvh">
    <Header />
    <DataTable />
  </div>
);

export default App;
