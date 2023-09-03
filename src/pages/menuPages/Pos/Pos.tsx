import React, {FC, useEffect} from 'react';
import WorkPanel from "@/pages/menuPages/Pos/WorkPanel";
import {Layout, Menu, notification, Space, theme} from "antd";
import {BarsOutlined, GlobalOutlined, PrinterOutlined, ShopOutlined} from "@ant-design/icons";
import axios from "axios";
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";
import Catalog from "@/pages/menuPages/Pos/Catalog";
const { Header, Content, Footer, Sider } = Layout;


 const Pos: FC = () => {
     const {token: { colorBgContainer }} = theme.useToken();
     const [categoryProducts, setCategoryProducts] = React.useState<Array<CategoryProductData>>([]);
     const [activeMenu, setActiveMenu] = React.useState<string>();

     const getCategoryProducts = () => {
         axios.get('api/categoryProduct')
             .then(res => setCategoryProducts(res.data))
             .catch(e=>{
                console.log(e)
                notification.error({message: 'Ошибка ', description: e.message})
             })
     }

     useEffect(()=>{
        getCategoryProducts();
     },[])

      return (
          <Space direction={'horizontal'}>
              <Space><Catalog list={categoryProducts} /></Space>
              <Space><WorkPanel /></Space>
          </Space>
      );
}


export default Pos;
