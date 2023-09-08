import React, {FC} from 'react';
import {Button, Card, List, Space, theme} from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

 const Recycled: FC = () => {
     const {token: { colorBgContainer }} = theme.useToken();

     const ButtonWorkPanelCSS: React.CSSProperties = {
         width: '150px',
         height: '300px',
         marginBottom: '0px',
         marginRight: '10px',
     }

     const handlerProductClick = () => {

     }
     const products = [
         {name: 'Молоко, 1л, 100р'},
         {name: 'Хлеб, 1шт, 46р'},
     ]

     return (
          <Space align={'baseline'}>
              <List
                  size="small"
                  header={<div style={{textAlign: 'center'}}> <b>Корзина</b></div>}
                  footer={<div></div>}
                  bordered
                  dataSource={products}
                  renderItem={(item) => <List.Item>{item.name}</List.Item>}
                  style={{height: '600px', width: '150px'}}
              />
          </Space>
      );
}

export default Recycled;
