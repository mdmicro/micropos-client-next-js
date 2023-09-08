import React, {useState} from 'react';
import {
	GlobalOutlined,
	PrinterOutlined,
	ShopOutlined,
	BarsOutlined,
} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import Cashregister from "@/pages/menuPages/Devices/Cashregister/Cashregister";
import Terminal from "@/pages/menuPages/Devices/Terminal/Terminal";
import Product from "@/pages/menuPages/Product";
import Pos from "@/pages/menuPages/Pos/Pos";
import Companie from "@/pages/menuPages/Companie";
import CategoryProduct from "@/pages/menuPages/CategoryProduct";
import Printer from "@/pages/menuPages/Devices/Printer/Printer";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
	  const {token: { colorBgContainer }} = theme.useToken();
	  const [activeMenu, setActiveMenu] = React.useState<MenuItems | MenuDeviceItems>(MenuItems.POS);
	  const [collapsed, setCollapsed] = useState(true);

	  return (
		  <Layout>
		  <Header style={{ height: '10px', background: colorBgContainer }} />
			  <Layout>
				<Sider theme={'light'} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{background: colorBgContainer}}>
				  <Menu
					  theme="light"
					  mode="inline"
					  defaultSelectedKeys={[MenuItems.POS]}
					  items={[
						  ...[
						  {icon: ShopOutlined, name: MenuItems.POS},
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
					  { key: MenuItems.CATALOG, label: MenuItems.CATALOG, icon: React.createElement(BarsOutlined), children: [
							  { key: MenuItems.PRODUCT, label: MenuItems.PRODUCT, onClick: () => setActiveMenu(MenuItems.PRODUCT)},
							  { key: MenuItems.CATEGORY_PRODUCT, label: MenuItems.CATEGORY_PRODUCT, onClick: () => setActiveMenu(MenuItems.CATEGORY_PRODUCT)}
						  ]},
					  { key: MenuDeviceItems.DEVICES, label: MenuDeviceItems.DEVICES, icon: React.createElement(PrinterOutlined), children: [
						{ key: MenuDeviceItems.CASHREGISTER, label: MenuDeviceItems.CASHREGISTER, onClick: () => setActiveMenu(MenuDeviceItems.CASHREGISTER)},
						{ key: MenuDeviceItems.TERMINAL, label: MenuDeviceItems.TERMINAL, onClick: () => setActiveMenu(MenuDeviceItems.TERMINAL)},
						{ key: MenuDeviceItems.PRINTER, label: MenuDeviceItems.PRINTER, onClick: () => setActiveMenu(MenuDeviceItems.PRINTER)}
					  ]},
					  ]}
				  />
				{/*</div>*/}
				</Sider>
				  <Content style={{ margin: '0px 0px 0px' }}>
					<div style={{ padding: 0, minHeight: 768, background: colorBgContainer }}>
						{ContentIn(activeMenu)}
					</div>
				  </Content>
				</Layout>
			  <Footer style={{ textAlign: 'center', background: colorBgContainer }}>mLab</Footer>
	  </Layout>
	  );
}

const ContentIn = (activeMenu: MenuItems | MenuDeviceItems) => {
		switch(activeMenu) {
			case MenuItems.POS: return <Pos />
			case MenuItems.CATALOG: return <></>
			case MenuItems.PRODUCT: return <Product />
			case MenuItems.CATEGORY_PRODUCT: return <CategoryProduct />
			case MenuItems.ORG: return <Companie />
			case MenuDeviceItems.DEVICES: return <></>
			case MenuDeviceItems.CASHREGISTER: return <Cashregister />
			case MenuDeviceItems.TERMINAL: return <Terminal />
			case MenuDeviceItems.PRINTER: return <Printer />
		}
}

enum MenuItems {
	POS = 'Касса',
	CATALOG = 'Каталог',
	PRODUCT = 'Позиции',
	CATEGORY_PRODUCT = 'Категории',
	ORG = 'Организация',
}

enum MenuDeviceItems {
	DEVICES = 'Устройства',
	CASHREGISTER = 'ККТ',
	TERMINAL = 'Терминал',
	PRINTER = 'Принтер',
}
