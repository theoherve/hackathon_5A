"use client";
import React, {useRef, useState} from 'react';
import {Modal, Table, Tour, Tooltip, Button} from 'antd';
import type { TourProps } from 'antd';
import { Spin } from "antd";
import {ArrowUpOutlined, QuestionCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/user";
import PatientMessages from "./Components/PatientMessage";
import PatientState from "./Components/PatientState";

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: userService.fetchAll,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openTuto, setOpenTuto] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [isTourAtStep3, setIsTourAtStep3] = useState(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Tutoriel',
      description: 'La colonne "Catégorie" permet de visualiser rapidement l\'état du patient.',
      placement: 'right',
      nextButtonProps: { style: { backgroundColor: 'rgb(249, 115, 22)' } },
      target: () => ref1.current,
    },
    {
      title: 'La catégorie',
      description: 'Le code couleur correspond à une catégorie de problème. Au click, une modale s\'ouvre avec plus de détails.',
      placement: 'right',
      nextButtonProps: { style: { backgroundColor: 'rgb(249, 115, 22)' } },
      target: () => ref2.current,
    },
    {
      title: 'La modal',
      description: 'Dans cette modal, vous pouvez voir le statut du patient et des informations supplémentaires comme des conseils pour aider au mieux le patient.',
      placement: 'bottom',
      target: null,
      nextButtonProps: { style: { backgroundColor: 'rgb(249, 115, 22)' } },
      cover: (
        <ArrowUpOutlined className="absolute -top-8" style={{ backgroundColor: 'rgb(249, 115, 22)', color: 'white', padding: 5, borderRadius: '50%' }} />
      )
    },
  ];

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleStepChange = (current: number) => {
    if (current === 2) {
      showModal();
      setIsTourAtStep3(true);
    } else {
      setIsTourAtStep3(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: any = [
    {
      title: () => (
          <div className="flex items-center gap-2" ref={ref1}>
            <div>Catégorie</div>
            <Tooltip title="Ouvrir le tutoriel">
              <QuestionCircleOutlined onClick={() => setOpenTuto(true)} className="cursor-pointer" />
            </Tooltip>
          </div>
      ),
      dataIndex: 'state',
      key: 'state',
      render: (text: string, record: any, index: number) => (
        <PatientState text={text} record={record} index={index} ref={index === 0 ? ref2 : null} />
      ),
      align: 'center',
    },
    { title: "Protocole", dataIndex: "protocole", key: "protocole" },
    { title: "Téléphone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Suivi SMS", dataIndex: "sms", key: "sms" },
    { title: "Date de référence", dataIndex: "dateRef", key: "dateRef" },
    { title: "Numéro d'opération", dataIndex: "numOp", key: "numOp" },
    { title: "Nom", dataIndex: "lastname", key: "lastname" },
    { title: "Prénom", dataIndex: "firstname", key: "firstname" },
    { title: "IPP", dataIndex: "ipp", key: "ipp" },
    {
      title: "Date de naissance",
      dataIndex: "dateNaissance",
      key: "dateNaissance",
    },
    { title: "Médecin", dataIndex: "medecin", key: "medecin" },
    {
      title: "Messages",
      dataIndex: "messages",
      key: "messages",
      render: (text: string, record: any) => (
        <PatientMessages text={text} record={record} />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-row h-96 justify-center items-center font-bold gap-3">
        <Spin indicator={loadingIcon} tip="Chargement en cours..." size="large" />
        Chargement ...
      </div>
    );
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  if (data) {
    data.forEach((user: any) => {
      switch (user.state) {
        case "danger":
          user.bouleColor = "red";
          break;
        case "alert":
          user.bouleColor = "orange";
          break;
        case "problem":
          user.bouleColor = "yellow";
          break;
        case "ok":
          user.bouleColor = "green";
      }
    });
  }

  return (
    <>
      <div className="h-dvh">
        <div className="px-4">
          <Table columns={columns} dataSource={data}/>
        </div>
      </div>

      <Tour
        open={openTuto}
        onClose={() => {
          setOpenTuto(false);
          setIsTourAtStep3(false);
        }}
        steps={steps}
        onChange={handleStepChange}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
        mask={!isTourAtStep3}
      />

      <Modal
        title={<span style={{ color: 'rgb(249, 115, 22)', fontWeight: 'bold' }}>Patient status</span>}
        open={isModalOpen}
        onOk={handleOk}

        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} style={{ backgroundColor: "rgb(249, 115, 22)" }}>
            Retour
          </Button>,
        ]}
        width={800}
      >
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Catégorie</h1>

          <p className="mt-2 font-bold">État du patient</p>
          <p className="text-justify">Ici se trouve un cours résumé de l&apos;état de santé du patient</p>

          <p className="mt-2 font-bold">Conseil</p>
          <p className="text-justify">Dans cette partie, notre intélligence artificielle génère une courte synthèse avec une aide de comment aider au mieux le patient.</p>
        </div>
      </Modal>
    </>
  );
};

export default App;
