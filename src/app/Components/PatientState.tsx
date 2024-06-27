"use client"

import React, { useEffect, useState } from "react";
import { Button, Modal, Tag, Tooltip } from "antd";
import {useMutation} from "@tanstack/react-query";
import { mistralService } from "../../../services/mistral";
import { openaiService } from "../../../services/openai";

type PatientStateProps = {
  text: string;
  record: any;
  index: number;
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
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-lg font-bold">{mutation.data.msg.subject}</h1>

            <div>
              <p className="font-bold">État du patient</p>
              <p className="text-justify">{mutation.data.msg.resume}</p>
            </div>

            <div>
              <p className="font-bold">Conseil</p>
              <ul className="list-disc pl-5">
                {mutation.data.msg.advices.map((advice: string, index: number) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>

            {record.audioPath && !audioMutation.data &&
              <>
                <p>Un fichier audio est disponible</p>
                <Button 
                  type="primary" 
                  loading={audioMutation.isPending} 
                  disabled={audioMutation.isPending} 
                  onClick={() => audioMutation.mutate(record.audioPath)}
                  className="mt-2"
                >
                  {!audioMutation.isPending ? "Transcrire l'audio" : "Chargement"}
                </Button>
              </>
            }
            {record.audioPath && audioMutation.isError && <div>An error has occurred</div>}
            {audioMutation.isSuccess && audioMutation.data && (
              <div>
                <p className="mt-2 font-bold">Résumé du fichier audio existant</p>
                <div className="text-justify mt-2">
                  {audioMutation.data.msg.resume}
                  <p className="font-bold" >Mots clés</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {audioMutation.data.msg.keywords.map((keyword: string, index: number) => (
                      <Tag key={index}>{keyword}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>}
      </Modal>
    </>
  );
});

export default PatientState;
