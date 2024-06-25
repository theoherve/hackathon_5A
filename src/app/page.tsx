"use client";
import React, { useState } from 'react';
import { Modal, Table, Tooltip } from 'antd';
import Header from "@/app/ui/Header";
import {useQuery} from "@tanstack/react-query";
import {userService} from "../../services/user";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({queryKey: ['users'], queryFn: userService.fetchAll});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Pastille',
      dataIndex: 'state',
      key: 'state',
      render: (text: string, record: any) => (
        <>
          <Tooltip title={text}>
            <div style={{
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              backgroundColor: record.bouleColor,
            }} onClick={showModal}/>
          </Tooltip>

          <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </>
      ),
    },
    { title: 'État', dataIndex: 'state', key: 'state' },
    { title: 'Protocole', dataIndex: 'protocole', key: 'protocole' },
    { title: 'Téléphone', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Suivi SMS', dataIndex: 'sms', key: 'sms' },
    { title: 'Date de référence', dataIndex: 'dateRef', key: 'dateRef' },
    { title: 'Numéro d\'opération', dataIndex: 'numOp', key: 'numOp' },
    { title: 'Nom', dataIndex: 'lastname', key: 'lastname' },
    { title: 'Prénom', dataIndex: 'firstname', key: 'firstname' },
    { title: 'IPP', dataIndex: 'ipp', key: 'ipp' },
    { title: 'Date de naissance', dataIndex: 'dateNaissance', key: 'dateNaissance' },
    { title: 'Médecin', dataIndex: 'medecin', key: 'medecin' },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  if (data) {
    data.forEach((user: any) => {
      switch (user.state) {
        case 'danger':
          user.bouleColor = 'red';
          break;
        case 'alert':
          user.bouleColor = 'orange';
          break;
        case 'problem':
          user.bouleColor = 'yellow';
          break;
        case 'ok':
          user.bouleColor = 'green';
      }
    });
  }

  return (
    <div className="h-dvh">
      <Header />
      <div className="px-4">
        <Table columns={columns} dataSource={data}/>
      </div>
    </div>
  );
};

export default App;
