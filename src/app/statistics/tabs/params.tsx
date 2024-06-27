import { Select } from "antd";
import { useState } from "react";

const Params = ({ categories }: { categories: any }) => {
  const [options, setOptions] = useState(
    categories?.map((value: any) => {
      return { value: value.name, label: value.name };
    }) || []
  );

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
