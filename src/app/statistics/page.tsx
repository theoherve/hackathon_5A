"use client";

import { Statistic } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Select } from "antd";
import { useState } from "react";
import { categorieService } from "../../../services/categorie";
import { messageService } from "../../../services/message";
import { statisticService } from "../../../services/statistic";
import Navigation from "./navigation";
import Compare from "./tabs/compare";
import General from "./tabs/general";
import Params from "./tabs/params";
import ServiceTemplate from "./tabs/serviceTemplate";

const StatisticsPage = () => {
  const [page, setPage] = useState("sub1");
  const [selectedStatistic, setSelectedStatistic] = useState<Statistic>();
  const [open, setOpen] = useState(true);

  const { data: statistics, refetch: refetchStatistics } = useQuery({
    queryKey: ["statistics"],
    queryFn: statisticService.fetchAll,
    refetchOnWindowFocus: false,
  });

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: messageService.fetchAll,
    refetchOnWindowFocus: false,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: categorieService.fetchAll,
    refetchOnWindowFocus: false,
  });

  const mutationCreateStatistic = useMutation({
    mutationFn: statisticService.create,
  });

  const handleChange = (page: string) => {
    setPage(page);
  };

  return (
    <div className="h-[500px]">
      {messages && messages.length > 0 && open && (
        <Alert
          message="Information"
          description="Nouveaux messages disponibles - lancer une nouvelle analyse IA ?"
          type="info"
          action={
            <Button
              onClick={async () => {
                await mutationCreateStatistic.mutateAsync();
                setOpen(false);
                refetchStatistics();
              }}
              loading={mutationCreateStatistic.isPending}
            >
              Lancer l&apos;analyse
            </Button>
          }
          showIcon
        />
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col">
          <h1 className="text-xl">Statistiques</h1>
          <p className="text-sm text-gray-400">
            Retrouver toutes les statistiques traitées par intelligence
            artificielle
          </p>
        </div>

        <Select
          className="w-96"
          options={statistics?.map((value: Statistic) => {
            const date = new Date(value.createdAt);
            return {
              label: date.toLocaleString("fr-FR"),
              value: value.id,
            };
          })}
          onChange={(value: number) => {
            const selected = statistics?.find(
              (val: Statistic) => val.id === value
            );
            if (!selected) return;

            setSelectedStatistic({
              ...selected,
              statistics: JSON.parse(selected?.statistics),
            });
          }}
        />
      </div>
      <div className="flex gap-4 mt-8 h-full">
        <Navigation handleChange={handleChange} categories={categories} />
        {statistics && categories && (
          <div className="flex-1">
            {page === "sub1" && <General statistics={selectedStatistic} />}
            {categories.map((value: any) => (
              <div key={value.name}>
                {page === value.name && (
                  <ServiceTemplate
                    key={value.name}
                    serviceName={value.name}
                    statistics={selectedStatistic}
                  />
                )}
              </div>
            ))}
            {page === "sub3" && <Params categories={categories} />}
            {page === "sub4" && (
              <Compare statistics={statistics} statistic={selectedStatistic} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
