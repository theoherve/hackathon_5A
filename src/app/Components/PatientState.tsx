"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Tag, Spin, Divider } from "antd";
import { useMutation } from "@tanstack/react-query";
import { mistralService } from "../../../services/mistral";
import { openaiService } from "../../../services/openai";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { darken } from "polished"; // Import darken function from polished

type PatientStateProps = {
  text: string;
  record: any;
  index: number;
};

const PatientState = React.forwardRef((props: PatientStateProps, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mutation = useMutation({
    mutationFn: (messages: any[]) => mistralService.fetchUserAlert(messages),
  });

  const audioMutation = useMutation({
    mutationFn: (path: string) => openaiService.fetchAudioTransciption(path),
  });

  const { text, record } = props;

  useEffect(() => {
    if (isModalOpen) {
      mutation.mutate(record.messages);
    }
  }, [isModalOpen]);

  const hoverColor = darken(0.7, record.bouleColor);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const syncIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Tag color={record.bouleColor} onClick={showModal} className="min-w-16 cursor-pointer" style={{textAlign: 'center'}} ref={props.index === 0 ? ref : null}>{text}</Tag>
      <Modal
        title={<span style={{ color: 'rgb(249, 115, 22)', fontWeight: 'bold' }}>Patient status</span>}
        open={isModalOpen}
        onOk={handleOk}
        bodyStyle={{ height: record.audioPath ? 525 : 325, marginTop: -10 }}
        style={{ marginTop: record.audioPath ? -50 : 0 }}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} style={{ backgroundColor: "rgb(249, 115, 22)" }}>
            Retour
          </Button>,
        ]}
        width={800}
      >
        {mutation.isPending && (
          <div className="h-full flex flex-row justify-center items-center font-bold gap-3">
            <Spin indicator={loadingIcon} tip="Chargement en cours..." size="large" />
            Chargement ...
          </div>
        )}

        {mutation.isError && <div>An error has occurred</div>}
        {mutation.isSuccess && mutation.data && (
          <div className="rounded-md py-2">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-center mb-3">
                {mutation.data.subject.charAt(0).toUpperCase() + mutation.data.subject.slice(1)}
              </h1>

              <div className="rounded-sm">
                <p className="font-bold text-base mb-2">État du patient</p>
                <p className="text-justify">{mutation.data.resume}</p>
              </div>
              <Divider style={{ margin: "1rem 0", backgroundColor: "grey" }} />

              <div className="rounded-sm">
                <p className="font-bold text-base mb-2">Conseil</p>
                <ul className="list-disc pl-5">
                  {mutation.data.advices.map((advice: string, index: number) => (
                    <li key={index}>{advice}</li>
                  ))}
                </ul>
              </div>
              {record.audioPath && (
                <Divider style={{ margin: "1rem 0", backgroundColor: "grey" }} />
              )}

              {record.audioPath && !audioMutation.data && (
                <div className="flex flex-col items-center justify-center my-2">
                  <p>Un fichier audio est disponible</p>
                  <Button
                    type="primary"
                    loading={audioMutation.isPending}
                    disabled={audioMutation.isPending}
                    style={{ backgroundColor: "rgb(249, 115, 22)" }}
                    onClick={() => audioMutation.mutate(record.audioPath)}
                    className="mt-2"
                  >
                    {!audioMutation.isPending ? "Transcrire l'audio" : "Chargement"}
                  </Button>
                </div>
              )}
              {record.audioPath && audioMutation.isError && (
                <div>An error has occurred</div>
              )}
              {audioMutation.isSuccess && audioMutation.data && (
                <div className="flex flex-col gap-2 bg-gray-50 p-2">
                  <p className="font-bold text-base mb-2">Résumé du fichier audio existant</p>
                  <div className="text-justify mt-2">
                    {audioMutation.data.resume}
                    <p className="font-bold mt-2">Mots clés</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {audioMutation.data.keywords.map(
                        (keyword: string, index: number) => (
                          <Tag key={index}>{keyword}</Tag>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
});

export default PatientState;
