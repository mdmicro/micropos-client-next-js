import {Anchor, Card, Col, Layout, Row, theme} from 'antd';
import React, {FC} from 'react';
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";

const  {Content, Header, Footer} = Layout;

 const Catalog: FC<{list: Array<CategoryProductData>}> = ({list}) => {
     const {token: { colorBgContainer }} = theme.useToken();

     const gridStyle: React.CSSProperties = {
         width: '200px',
         textAlign: 'center',
         background: '#a2cbf6',
         color: '#ffffff'
     };

console.log(list);
     return (
         <div style={{padding: '10px', width: '1000px'}}>
             <Card title="Категории товаров" style={{textAlign: 'center', border: 0}}>
                 {list?.length && list.map(item => <Card.Grid style={gridStyle}>{item.name}</Card.Grid>)}
             </Card>
         </div>
     )
}


export default Catalog;
