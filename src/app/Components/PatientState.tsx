"use client"

import { Modal, Tooltip } from "antd";
import { use, useEffect, useState } from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import { mistralService } from "../../../services/mistral";

type PatientStateProps = {
  text: string;
  record: any;
}

type PatientStateModalProps = {
  isModalOpen: boolean;
  messages: any[];
  setIsModalOpen: (value: boolean) => void;
}
  

function PatientState (props: PatientStateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (messages: any[]) => mistralService.fetchUserAlert(messages),
  })

  const { text, record } = props;  

  useEffect(() => {
    if (isModalOpen) {
      mutation.mutate(record.messages);
    }
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(mutation.data)

  return (
    <>
    <Tooltip title={text}>
      <div 
        onMouseEnter={() => {

        }} 
        style={{
          height: '20px',
          width: '20px',
          borderRadius: '50%',
          backgroundColor: record.bouleColor,
        }} 
        onClick={showModal}
      />
    </Tooltip>

    <Modal title="Patient status" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {mutation.isPending && <div>Loading...</div>}
      {mutation.isError && <div>An error has occurred</div>}
      {mutation.isSuccess && 
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{mutation.data.msg.subject}</h1>

          <p className="mt-2 font-bold">État du patient</p>
          <p className="text-justify">{mutation.data.msg.resume}</p>

          <p className="mt-2 font-bold">Conseil</p>
          <p className="text-justify">{mutation.data.msg.advice}</p>
        </div>
      } 
    </Modal>
  </>
  )
}

export default PatientState;