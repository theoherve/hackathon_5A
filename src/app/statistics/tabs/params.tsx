import { Categorie } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Select } from "antd";
import { categorieService } from "../../../../services/categorie";

const Params = ({ categories }: { categories: Categorie[] }) => {
  const options =
    categories?.map((value: Categorie) => {
      return {
        value: value.name,
        label: value.name,
        isActive: value.isActive,
      };
    }) || [];

  const mutation = useMutation({
    mutationFn: (categorie: Categorie) => categorieService.update(categorie),
  });

  const mutationCreate = useMutation({
    mutationFn: (categorie: { name: string; isActive: boolean }) =>
      categorieService.create(categorie),
  });

  const handleChange = (value: string[]) => {
    value.forEach((name) => {
      const categorie = categories.find((value) => value.name === name);
      if (categorie) {
        mutation.mutateAsync({
          ...categorie,
          isActive: true,
        });
      } else {
        mutationCreate.mutateAsync({
          name,
          isActive: true,
        });
      }
    });
  };

  const handleDeselect = (value: string) => {
    const categorie = categories.find((categorie) => categorie.name === value);
    if (categorie) {
      mutation.mutateAsync({
        ...categorie,
        isActive: false,
      });
    }
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
          onDeselect={handleDeselect}
          options={options}
          defaultValue={
            (options.filter((value: any) => value.isActive) || []) as any // Impossible to type this correctly
          }
        />
      </div>
      <div className="w-full h-[2px] bg-gray-200 rounded"></div>
    </div>
  );
};

export default Params;
