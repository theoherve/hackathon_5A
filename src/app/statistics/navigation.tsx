import {
  DatabaseOutlined,
  DesktopOutlined,
  ProductOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

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
    children: [
      { key: "5", label: "Restaurations" },
      { key: "6", label: "Personnels" },
      { key: "7", label: "Accueil" },
    ],
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

const Navigation = ({
  handleChange,
}: {
  handleChange: (page: string) => void;
}) => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    handleChange(e.key);
  };

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
