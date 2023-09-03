import React, {FC, useEffect} from 'react';
import WorkPanel from "@/pages/menuPages/Pos/WorkPanel";
import {Layout, Menu, notification, Space, theme} from "antd";
import {BarsOutlined, GlobalOutlined, PrinterOutlined, ShopOutlined} from "@ant-design/icons";
import axios from "axios";
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";
import Catalog from "@/pages/menuPages/Pos/Catalog";
import {ProductData} from "@/pages/menuPages/Product";
const { Header, Content, Footer, Sider } = Layout;


 const Pos: FC = () => {
     const {token: { colorBgContainer }} = theme.useToken();
     const [categoryProducts, setCategoryProducts] = React.useState<Array<CategoryProductData>>([]);
     const [products, setProducts] = React.useState<Array<ProductData>>([]);
     const [activeMenu, setActiveMenu] = React.useState<string>();

     const getCategoryProducts = () => {
         axios.get('api/categoryProduct')
             .then(res => setCategoryProducts(res.data))
             .catch(e=>{
                console.log(e)
                notification.error({message: 'Ошибка ', description: e.message})
             })
     }
     const getProducts = () => {
         axios.get('api/product')
             .then(res => setProducts(res.data))
             .catch(e=>{
                 console.log(e)
                 notification.error({message: 'Ошибка ', description: e.message})
             })
     }

     useEffect(()=>{
        getCategoryProducts();
        getProducts();
     },[])

      return (
          <Space direction={'horizontal'}>
              <Space><Catalog categories={categoryProducts} products={products} /></Space>
              <Space><WorkPanel /></Space>
          </Space>
      );
}


export default Pos;
