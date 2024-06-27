import type { TableProps } from "antd";
import { Table } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Message concerné",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Categorie(s)",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Positif / Negatif",
    dataIndex: "address",
    key: "address",
  },
];

const data: DataType[] = [];

const Data = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default Data;
