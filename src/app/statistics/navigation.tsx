import {
  DatabaseOutlined,
  DesktopOutlined,
  ProductOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const Navigation = ({
  handleChange,
  categories,
}: {
  handleChange: (page: string) => void;
  categories: any;
}) => {
  const onClick: MenuProps["onClick"] = (e) => {
    handleChange(e.key);
  };

  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <DesktopOutlined />,
      label: "General",
    },
    {
      key: "sub2",
      icon: <ProductOutlined />,
      label: "Service",
      children: categories?.map((value: any) => ({
        key: value.name,
        label: value.name,
      })),
    },
    {
      key: "sub3",
      label: "Données",
      icon: <DatabaseOutlined />,
    },
    {
      key: "sub4",
      label: "Paramètres",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Menu
      onClick={onClick}
      className="w-52"
      mode="vertical"
      items={items}
      defaultSelectedKeys={["sub1"]}
    />
  );
};

export default Navigation;
