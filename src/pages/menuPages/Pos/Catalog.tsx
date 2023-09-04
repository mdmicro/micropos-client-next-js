import {Card, Layout, Space, theme} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";
import {ProductData} from "@/pages/menuPages/Product";


const Catalog: FC<CatalogProps> = ({categories,products}) => {
	const [activeCategory, setActiveCategory] = useState<string>();
	const [activeProduct, setActiveProduct] = useState<string>();
	const [categoryProducts, setCategoryProducts] = useState<Array<ProductData>>([]);

	const gridStyleCategory: React.CSSProperties = {
		 width: '200px',
		 textAlign: 'center',
		 background: '#087ff5',
		 color: '#ffffff',
		 marginBottom: '20px'
	};
	const gridStyleCommodity: React.CSSProperties = {
		width: '200px',
		textAlign: 'center',
		background: '#f5d405',
		color: '#ffffff',
		marginBottom: '20px'
	};

	const handlerCategoryClick = (event: any) => {
        console.log(event.target.textContent);
        const butCat = categories.find(item => item.name === event.target.textContent)
        setActiveCategory(butCat?.name)

        const productsCat = products.filter(item => item.category_uuid === butCat?.id);
        setCategoryProducts(productsCat);
	}
    const handlerCommodityClick = (event: any) => {
        console.log(event);
        const but = products.find(item => item.name === event.target.textContent)
        setActiveProduct(but?.name)
    }

    useEffect(()=>{
        const productsFilter = products.filter(item => !item.category_uuid);
        products && setCategoryProducts(productsFilter)
    },[products])

	return (
		 <Space align={'baseline'}>
			 <Card title="Категория" style={{textAlign: 'center', border: 0, padding: '10px', width: '220px'}}>
				 {categories && categories.map(item =>
					 <Card.Grid key={item.name} style={gridStyleCategory} onClick={handlerCategoryClick}>{item.name}</Card.Grid>
				 )}
			 </Card>
			 <Card title="Позиции" style={{textAlign: 'center', border: 0, width: '810px'}}>
				 {categoryProducts && categoryProducts.map(item =>
					 <Card.Grid style={gridStyleCommodity} onClick={handlerCommodityClick}>{item.name}</Card.Grid>)}
			 </Card>
		 </Space>
	 )
}

export default Catalog;

interface CatalogProps {
 categories: Array<CategoryProductData>;
 products: Array<ProductData>;
}
