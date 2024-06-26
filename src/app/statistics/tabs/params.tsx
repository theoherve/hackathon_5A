import { Select } from "antd";
import React, { useState } from "react";

const Params: React.FC = () => {
  const [options, setOptions] = useState([
    {
      value: "Restauration",
      label: "Restauration",
    },
    {
      value: "Personnel",
      label: "Personnel",
    },
    {
      value: "Accueil",
      label: "Accueil",
    },
  ]);

  const handleChange = (value: string) => {
    setOptions([...options, { value, label: value }]);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="mb-2">
        <label>Services à analyser</label>
        <p className="text-gray-400 italic mb-4">
          Selectionner les services que vous souhaitez analyser par
          l&apos;intelligence artificielle.
        </p>
        <Select
          mode="tags"
          className="w-full"
          placeholder="..."
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className="w-full h-[2px] bg-gray-200 rounded"></div>
    </div>
  );
};

export default Params;
