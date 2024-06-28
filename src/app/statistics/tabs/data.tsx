import { Message } from "@prisma/client";
import type { TableProps } from "antd";
import { Table } from "antd";

interface DataType extends Message {
  key: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Message concerné",
    dataIndex: "content",
    key: "content",
  },
];

const Data = ({ messages }: { messages: DataType[] }) => {
  return <Table columns={columns} dataSource={messages} />;
};

export default Data;
