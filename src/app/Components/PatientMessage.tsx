"use client";

import { Modal, Input, Button } from "antd";
import { useState } from "react";
import { SendOutlined } from '@ant-design/icons';

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

  const { record } = props;

  const showModal = () => {
    setIsModalOpen(true);    
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
        <div className="overflow-y-auto h-96 mb-2 pr-1">
          {record.messages.map((message, index) => (
            <div key={index} className={`my-6 flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`flex flex-col ${message.fromUser ? 'self-start' : 'self-end'}`}
            >
              <p className={`flex flex-col max-w-96 p-4 rounded-lg ${message.fromUser ? 'bg-orange-600 self-start' : 'bg-gray-200 self-end'} max-w-4/5`}>{message.content}</p>
              <small className={`text-gray-500 ${message.fromUser ? 'self-end' : 'self-start'} `}>
                    {message.fromUser ?  new Date(message.createdAt).toLocaleString() : `Reçu : ${new Date(message.createdAt).toLocaleString()}`}
              </small>
            </div>
          </div>
          ))}
        </div>
        <div className="flex flex-row gap-3 items-center justify-center">
          <Input
              className="h-12 mr-2"
              style={{ border: '2px solid black' }}
            placeholder="Écrire un nouveau message..."
            value=""
          />
          <Button style={{ background: "rgb(234 88 12)" }} key="submit" type="primary" icon={<SendOutlined />} shape="round" />
        </div>
        
      </Modal>
    </>
  );
};

export default PatientMessages;
