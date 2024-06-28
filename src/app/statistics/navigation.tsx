import {
  DatabaseOutlined,
  DesktopOutlined,
  ProductOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Categorie } from "@prisma/client";
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
      children: categories
        ?.filter((value: Categorie) => value.isActive)
        .map((value: Categorie) => ({
          key: value.name,
          label: value.name,
        })),
    },
    {
      key: "sub3",
      label: "Données analysées",
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
