import React, {ReactElement} from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Link from "next/link";
import Organization from "@/pages/Organization";
import Cashregister from "@/pages/Cashregister";
import Terminal from "@/pages/Terminal";
import Catalog from "@/pages/Catalog";
import Pos from "@/pages/Pos";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
      const {
      token: { colorBgContainer },
    } = theme.useToken();
      const [activeMenu, setActiveMenu] = React.useState<MenuItems>(MenuItems.POS);

      return (
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
            style={{background: 0xffff}}
        >
          <div style={{
              height: '32px',
              margin: '16px',
              background: '0xffff',
              // background: 'rgba(255, 255, 255, 0.2)'
              marginTop: '40px',
          }} />
          <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['4']}
              items={[
                  {icon: UserOutlined, name: MenuItems.POS},
                  {icon: UserOutlined, name: MenuItems.CATALOG},
                  {icon: VideoCameraOutlined, name: MenuItems.ORG},
                  {icon: UploadOutlined, name: MenuItems.CASHREGISTER},
                  {icon: UserOutlined, name: MenuItems.TERMINAL}
              ].map(
                  ({icon, name}) => ({
                    key: name,
                    icon: React.createElement(icon),
                    label: name,
                      onClick: (item) => {
                        setActiveMenu(item.key as MenuItems);
                      },
                  }),
              )}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 0, minHeight: 768, background: colorBgContainer }}>
                {ContentIn(activeMenu)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>mLab</Footer>
        </Layout>
      </Layout>
      );
}

const ContentIn = (activeMenu: MenuItems) => {

        switch(activeMenu) {
            case MenuItems.POS: return <Pos />
            case MenuItems.CATALOG: return <Catalog />
            case MenuItems.ORG: return <Organization />
            case MenuItems.CASHREGISTER: return <Cashregister />
            case MenuItems.TERMINAL: return <Terminal />
        }
}

enum MenuItems {
    'POS' = 'Касса',
    'CATALOG' = 'Каталог',
    'ORG' = 'Организация',
    'CASHREGISTER' = 'ККТ',
    'TERMINAL' = 'Терминал',
}
