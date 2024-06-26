"use client";

import { Select } from "antd";
import { useState } from "react";
import Navigation from "./navigation";
import Data from "./tabs/data";
import General from "./tabs/general";
import Params from "./tabs/params";

const StatisticsPage = () => {
  const [page, setPage] = useState("sub1");

  const handleChange = (page: string) => {
    setPage(page);
  };

  return (
    <div className="h-[500px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl">Statistiques</h1>
          <p className="text-sm text-gray-400">
            Retrouver toutes les statistiques traitées par intelligence
            artificielle
          </p>
        </div>
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
        <Navigation handleChange={handleChange} />
        <div className="flex-1">
          {page === "sub1" && <General />}
          {page === "5" && <div></div>}
          {page === "6" && <div></div>}
          {page === "7" && <div></div>}
          {page === "sub3" && <Data />}
          {page === "sub4" && <Params />}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
