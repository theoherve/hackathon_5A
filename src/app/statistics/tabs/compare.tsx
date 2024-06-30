import { compareSatisfaction } from "@/utils/format";
import { Statistic as StatisticType } from "@prisma/client";
import { Select } from "antd";
import { useEffect, useState } from "react";

const Compare = ({
  statistics,
  statistic,
}: {
  statistics?: StatisticType[];
  statistic?: StatisticType;
}) => {
  const [selectedStatistic, setSelectedStatistic] = useState<StatisticType>();
  const [compare, setCompare] = useState<any>();

  useEffect(() => {
    if (!selectedStatistic || !statistic) return;
    const result = compareSatisfaction(
      statistic.statistics,
      selectedStatistic.statistics
    );
    setCompare(result);
  }, [selectedStatistic, statistic]);

  if (!statistic)
    return (
      <div>
        Veuillez choisir une date de statistique pour voir les informations
      </div>
    );

  return (
    <div>
      <div className="mb-2">
        Veuillez selectionner une analyse pour la comparer a l&apos;analyse
        actuel
      </div>
      <Select
        className="w-96"
        options={statistics?.map((value: StatisticType) => {
          const date = new Date(value.createdAt);
          return {
            label: date.toLocaleString("fr-FR"),
            value: value.id,
          };
        })}
        onChange={(value: number) => {
          const selected = statistics?.find(
            (val: StatisticType) => val.id === value
          );
          if (!selected) return;

          setSelectedStatistic({
            ...selected,
            statistics: JSON.parse(selected?.statistics),
          });
        }}
      />
      {compare && (
        <div className="mt-4">
          <h3 className="text-4xl">Résultats de la comparaison :</h3>
          <ul>
            {Object.entries(compare.details).map(([key, value]: any) => (
              <li key={key} className="p-2">
                <span className="text-xl text-gray-500">{key}:</span>{" "}
                <span className="ml-5 text-2xl font-bold">
                  {value.toFixed(2)}%
                </span>
                {value > 0 ? (
                  <span className="ml-3 text-green-600">de progression</span>
                ) : (
                  <span className="text-red-500 ml-3">de regression</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Compare;
