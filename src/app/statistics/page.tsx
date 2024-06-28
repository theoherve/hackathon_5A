"use client";

import {Message} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";
import {Select, Skeleton, Spin} from "antd";
import {useState} from "react";
import {categorieService} from "../../../services/categorie";
import {messageService} from "../../../services/message";
import {statsService} from "../../../services/stats";
import Navigation from "./navigation";
import Data from "./tabs/data";
import General from "./tabs/general";
import Params from "./tabs/params";
import ServiceTemplate from "./tabs/serviceTemplate";

const StatisticsPage = () => {
  const [page, setPage] = useState("sub1");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: categorieService.fetchAll,
  });

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: messageService.fetchAll,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["stats", messages, categories],
    queryFn: async ({ queryKey }) => {
      const [, messages, categories] = queryKey;
      return await statsService.fetchStats(
        messages.map((msg: Message) => msg.content),
        categories
      );
    },
    enabled: !!categories && !!messages,
    refetchOnWindowFocus: false,
  });

  const handleChange = (page: string) => {
    setPage(page);
  };

  return (
    <div className="h-[500px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl">Statistiques</h1>
          <p className="text-sm text-gray-400">
            Retrouver toutes les statistiques traitées par intelligence
            artificielle
          </p>
        </div>
        {isFetching && <Spin />}

        <Select
          className="w-40"
          defaultValue="7d"
          options={[
            { value: "7d", label: "7 jours" },
            { value: "14d", label: "14 jours" },
            { value: "1m", label: "1 mois" },
            { value: "all", label: "Depuis le début" },
          ]}
        />
      </div>
      <div className="flex gap-4 mt-8 h-full">
        <Navigation handleChange={handleChange} categories={categories} />
        {isLoading && (
          <div className="w-full h-full">
            <Skeleton.Button active={true} size={"large"} block={true} />
          </div>
        )}
        {data && categories && (
          <div className="flex-1">
            {page === "sub1" && <General data={data} />}
            {categories.map((value: any) => (
              <div key={value.name}>
                {page === value.name && <ServiceTemplate key={value.name} serviceName={value.name} data={data} />}
              </div>
            ))}
            {page === "sub3" && <Data messages={messages} />}
            {page === "sub4" && <Params categories={categories} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
