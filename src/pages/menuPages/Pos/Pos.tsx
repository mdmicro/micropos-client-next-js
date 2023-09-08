import React, {FC, useEffect} from 'react';
import WorkPanel from "@/pages/menuPages/Pos/WorkPanel";
import {notification, Space, theme} from "antd";
import axios from "axios";
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";
import Catalog from "@/pages/menuPages/Pos/Catalog";
import {ProductData} from "@/pages/menuPages/Product";
import Recycled from "@/pages/menuPages/Pos/Recycled";


const Pos: FC = () => {
 const {token: { colorBgContainer }} = theme.useToken();
 const [categoryProducts, setCategoryProducts] = React.useState<Array<CategoryProductData>>([]);
 const [products, setProducts] = React.useState<Array<ProductData>>([]);

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
      <Space direction={'horizontal'} align={'baseline'}>
          <Space>
              <Catalog categories={categoryProducts} products={products} />
          </Space>
          <Space direction={'vertical'}>
              <Space><Recycled /></Space>
              <Space><WorkPanel /></Space>
          </Space>
      </Space>
  );
}

export default Pos;
