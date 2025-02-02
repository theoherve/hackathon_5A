// Navigation.tsx
import {
  DesktopOutlined,
  ProductOutlined,
  ScanOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Categorie } from "@prisma/client";
import type { MenuProps } from "antd";
import StyledMenu from "../Components/StyledMenu";

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
      label: "Paramètres",
      icon: <SettingOutlined />,
    },
    {
      key: "sub4",
      label: "Comparer",
      icon: <ScanOutlined />,
    },
  ];

  return (
    <StyledMenu
      onClick={onClick}
      className="w-52"
      mode="vertical"
      items={items}
      defaultSelectedKeys={["sub1"]}
    />
  );
};

export default Navigation;
