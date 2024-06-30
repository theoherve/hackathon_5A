// StyledMenu.ts
import { Menu } from "antd";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  .ant-menu-item,
  .ant-menu-submenu-title {
    background-color: transparent;
    color: black;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    background-color: rgba(249, 115, 22, 0.1) !important;
    color: rgb(249, 115, 22) !important;
  }

  .ant-menu-item-selected {
    background-color: rgba(249, 115, 22, 0.2) !important;
    color: rgb(249, 115, 22) !important;
  }
`;

export default StyledMenu;
