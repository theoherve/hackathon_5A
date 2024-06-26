"use client";

import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { userService } from "../../services/user";
import PatientMessages from "./Components/PatientMessage";
import PatientState from "./Components/PatientState";

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: userService.fetchAll,
  });

  const columns = [
    {
      title: "Pastille",
      dataIndex: "state",
      key: "state",
      render: (text: string, record: any) => (
        <PatientState text={text} record={record} />
      ),
    },
    { title: "État", dataIndex: "state", key: "state" },
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
    return <div>Loading...</div>;
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
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default App;
