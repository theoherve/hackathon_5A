"use client";

import { Modal, Input, Button } from "antd";
import { useState } from "react";

type Message = {
    content: string;
    fromUser: boolean;
    createdAt: string;
  };
  
  type Record = {
    lastname: string;
    firstname: string;
    ipp: string;
    messages: Message[];
    [key: string]: any; // Include this to allow other properties on the record
  };
  
  type PatientMessagesProps = {
    text: string;
    record: Record;
  };


const PatientMessages = (props: PatientMessagesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { text, record } = props;

  const showModal = () => {
    setIsModalOpen(true);
    console.log(record.messages);
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>
      <p className="cursor-pointer text-base text-gray-700 hover:text-orange-500 hover:underline">
        Détails
        </p>
      </div>

      <Modal title={`${record.ipp} | ${record.firstname} ${record.lastname}`} width={650}  visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="overflow-y-auto h-96 mb-2">
          {record.messages.map((message, index) => (
            <div key={index} className={`w-2/3 my-6 flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-4 rounded-lg ${message.fromUser ? 'bg-orange-600 self-start' : 'bg-gray-200 self-end'} max-w-4/5`}
            >
              <p className="mb-1">{message.content}</p>
              <small className="text-gray-500">
                    {message.fromUser ?  new Date(message.createdAt).toLocaleString() : `Reçu : ${new Date(message.createdAt).toLocaleString()}`}
                </small>
            </div>
          </div>
          ))}
        </div>
        <Input
            className="h-16"
          placeholder="Écrire un nouveau message..."
          value=""
        />
      </Modal>
    </>
  );
};

export default PatientMessages;
