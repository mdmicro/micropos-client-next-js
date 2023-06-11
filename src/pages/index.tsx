import React from 'react';
import {GlobalOutlined, UserOutlined, PrinterOutlined, ShopOutlined, AppstoreOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Organization from "@/pages/menuPages/Companie";
import Cashregister from "@/pages/menuPages/Cashregister/Cashregister";
import Terminal from "@/pages/menuPages/Terminal/Terminal";
import Catalog from "@/pages/menuPages/Catalog";
import Pos from "@/pages/menuPages/Pos";
import Companie from "@/pages/menuPages/Companie";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
      const {
      token: { colorBgContainer },
    } = theme.useToken();
      const [activeMenu, setActiveMenu] = React.useState<MenuItems | MenuDeviceItems>(MenuItems.POS);

      return (
          <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
              <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                      console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                      console.log(collapsed, type);
                    }}
                    style={{background: 0xffff , marginTop: 0}}
                >
                  <Menu
                      theme="light"
                      mode="vertical"
                      defaultSelectedKeys={[MenuItems.POS]}
                      items={[
                          ...[
                          {icon: ShopOutlined, name: MenuItems.POS},
                          {icon: AppstoreOutlined, name: MenuItems.CATALOG},
                          {icon: GlobalOutlined, name: MenuItems.ORG},
                      ].map(
                          ({icon, name}) => ({
                            key: name,
                            icon: React.createElement(icon),
                            label: name,
                            onClick: (item: any) => {
                                setActiveMenu(item.key as MenuItems);
                            },
                          })),
                      { key: MenuDeviceItems.DEVICES, label: MenuDeviceItems.DEVICES, icon: React.createElement(PrinterOutlined), children: [
                        { key: MenuDeviceItems.CASHREGISTER, label: MenuDeviceItems.CASHREGISTER, onClick: () => setActiveMenu(MenuDeviceItems.CASHREGISTER)},
                        { key: MenuDeviceItems.TERMINAL, label: MenuDeviceItems.TERMINAL, onClick: () => setActiveMenu(MenuDeviceItems.TERMINAL)}
                      ]},
                      ]}
                  />
                </Sider>
                  <Content style={{ margin: '0px 0px 0px' }}>
                    <div style={{ padding: 0, minHeight: 768, background: colorBgContainer }}>
                        {ContentIn(activeMenu)}
                    </div>
                  </Content>
                </Layout>
              <Footer style={{ textAlign: 'center' }}>mLab</Footer>
      </Layout>
      );
}

const ContentIn = (activeMenu: MenuItems | MenuDeviceItems) => {
        switch(activeMenu) {
            case MenuItems.POS: return <Pos />
            case MenuItems.CATALOG: return <Catalog />
            case MenuItems.ORG: return <Companie />
            case MenuDeviceItems.DEVICES: return <></>
            case MenuDeviceItems.CASHREGISTER: return <Cashregister />
            case MenuDeviceItems.TERMINAL: return <Terminal />
        }
}

enum MenuItems {
    POS = 'Касса',
    CATALOG = 'Каталог товаров',
    ORG = 'Организация',
}

enum MenuDeviceItems {
    DEVICES = 'Устройства',
    CASHREGISTER = 'ККТ',
    TERMINAL = 'Терминал',
}
