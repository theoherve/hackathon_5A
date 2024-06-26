"use client"

import { Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {useMutation} from "@tanstack/react-query";
import { mistralService } from "../../../services/mistral";
import { openaiService } from "../../../services/openai";

type PatientStateProps = {
  text: string;
  record: any;
  index: number;
}

type PatientStateModalProps = {
  isModalOpen: boolean;
  messages: any[];
  setIsModalOpen: (value: boolean) => void;
}

const PatientState = React.forwardRef((props: PatientStateProps, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (messages: any[]) => mistralService.fetchUserAlert(messages),
  })

  const audioMutation = useMutation({
    mutationFn: (path: string) => openaiService.fetchAudioTransciption(path)
  })

  const { text, record } = props;  

  useEffect(() => {
    if (isModalOpen) {
      mutation.mutate(record.messages);
      if (record.audioPath) {
        audioMutation.mutate(record.audioPath)
      }
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

  return (
    <>
      <Tag color={record.bouleColor} onClick={showModal} className="min-w-16" style={{textAlign: 'center'}} ref={props.index === 0 ? ref : null}>{text}</Tag>

      <Modal title="Patient status" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {mutation.isPending && <div>Loading...</div>}
        {mutation.isError && <div>An error has occurred</div>}
        {mutation.isSuccess &&
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{mutation.data.msg.subject}</h1>

            <p className="mt-2 font-bold">État du patient</p>
            <p className="text-justify">{mutation.data.msg.resume}</p>

          <p className="mt-2 font-bold">État du patient</p>
          <p className="text-justify">{mutation.data.msg.resume}</p>

          <p className="mt-2 font-bold">Conseil</p>
          <ul className="list-disc pl-5">
            {mutation.data.msg.advices.map((advice: string, index: number) => (
              <li key={index}>{advice}</li>
            ))}
          </ul>

          {record.audioPath && audioMutation.isPending && <div>Loading audio...</div>}
          {record.audioPath && audioMutation.isError && <div>An error has occurred</div>}
          {audioMutation.isSuccess && audioMutation.data && (
            <>
              <p className="mt-2 font-bold">Transciption d'un fichier audio existant</p>
              <div className="text-justify mt-2">
                {audioMutation.data.msg.map((dialogue: any, index: number) => (
                  <div key={index} className="mb-3">
                    {Object.keys(dialogue).map((key, idx) => (
                      <p key={idx}><strong>{key}:</strong> {dialogue[key]}</p>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      } 
    </Modal>
  </>
  )
});

export default PatientState;
