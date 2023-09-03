import {Card, Layout, Space, theme} from 'antd';
import React, {FC} from 'react';
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";
import {ProductData} from "@/pages/menuPages/Product";


const Catalog: FC<CatalogProps> = ({categories,products}) => {
    const gridStyle: React.CSSProperties = {
     width: '200px',
     textAlign: 'center',
     background: '#a2cbf6',
     color: '#ffffff'
    };

    return (
         <Space align={'baseline'}>
             <Card title="Категории товаров" style={{textAlign: 'center', border: 0, padding: '10px', width: '220px'}}>
                 {categories && categories.map(item => <Card.Grid style={gridStyle}>{item.name}</Card.Grid>)}
             </Card>
             <Card title="Товары" style={{textAlign: 'center', border: 0, width: '810px'}}>
                 {products && products.map(item => <Card.Grid style={gridStyle}>{item.name}</Card.Grid>)}
             </Card>
         </Space>
     )
}

export default Catalog;

interface CatalogProps {
 categories: Array<CategoryProductData>;
 products: Array<ProductData>;
}
