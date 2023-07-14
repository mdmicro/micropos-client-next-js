import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from 'axios';
import {CategoryProductData} from "@/pages/menuPages/CategoryProduct";

const Product: React.FC = () => {
    const [form] = Form.useForm<ProductData>()
    const [curProductId, setCurProductId] = useState<number | null>(null)
    const [categoryProducts, setCategoryProducts] = useState<CategoryProductData[]>()
    const [products, setProducts] = useState<ProductData[]>([{
        id: null,
        name: '',
        type_product: TypeProduct.PRODUCT,
        price: '0',
        measurement_unit: MeasurementUnit.PC,
        code_marking: null,
        code_nomenclature: null,
        vat: null,
        category_uuid: null,
        contract_uuid: null,
        image_uuid: null,
        description: '',
    }])

    const onFinish = (values: ProductData) => {
        axios.post('api/product',values).then(async res => {
            console.log('next front product post res')
            // console.log(res.status)
            // console.log(res.statusText)
            // console.log(JSON.stringify(res.data, null, 1))
            notification.success({message: 'Сохранено', duration: 3})
            if (!curProductId) {
                await setCurProductId(res.data.id)
                form?.setFieldValue("products", res.data.id)
            }
            getProducts();
        }).catch(e=> {
            console.log('error:' + e)
            notification.error({message: 'Ошибка ', description: e, duration: 10})
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handlerFormReset = () => {
        form?.resetFields();
        setCurProductId(null)
    }

    const handlerDelete = (values: ProductData) => {
        // console.log('-=handler delete=-')
        // console.log(JSON.stringify(values, null, 1))
        if(!values) {
            return;
        }
        axios.patch('api/product/',values).then(async res => {
            handlerFormReset();
            getProducts();
            notification.success({message: 'Удалено', duration: 3})
        }).catch(e=> {
            console.log('error:' + e)
            notification.error({message: 'Ошибка ', description: e, duration: 10})
        })
    }

    const handlerSelect = async (id: number) => {
        await setCurProductId(id)
        console.log("handlerSelect: " + id)
        const curProduct = products.find(item => item.id === id)
        curProduct && form?.setFieldsValue(curProduct)
    };

    const getProducts = () => {
        axios.get('api/product').then(
            async res => {
                console.log("Get products: " + JSON.stringify(res, null, 1))
                console.log("getProducts: " + curProductId)
                if(res) {
                    await setProducts(res.data)
                } else {
                    console.log("Ошибка загрузки списка продуктов");
                    notification.error({message: 'Ошибка ', description: res})
                }
            }
        ).catch(e=>{
                console.log(e)
                // notification.error({message: 'Ошибка ', description: e.message})
            }
        );
    }
    const getCategoryProducts = () => {
        axios.get('api/categoryProduct').then(
            async res => {
                if (res) {
                    await setCategoryProducts(res.data)
                } else {
                    notification.error({message: 'Ошибка getCategoryProduct', description: res})
                }
            }
        ).catch(e => {
                console.log(e)
                notification.error({message: 'Ошибка getCategoryProduct ', description: e.message})
            }
        );
    }

    useEffect(() => {
        getProducts();
        getCategoryProducts();
    }, []);

    return (
    <Form
        form={form}
        name="product"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        >

        <Form.Item
            label="Товар или услуга"
            name="products"
            style={{marginBottom: '40px'}}
        >
             <Select allowClear={true} onChange={handlerSelect} options={
                products && products.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                })
            } />
        </Form.Item>
        <Form.Item name="id" hidden={true}>
            <Input />
        </Form.Item>
        <Form.Item
            label="Наименование товара или услуги"
            name="name"
            rules={[{ required: true, message: 'Введите наименование организации!' }]}>
            <Input/>
        </Form.Item>
        <Form.Item
            label="Тип предмета расчёта"
            name="type_product"
            rules={[{ required: true, message: '' }]}>
            <Select allowClear={true} options={
                Object.values(TypeProduct).map(item => {
                    return {
                        value: item,
                        label: item,
                    }
                })
            } />
        </Form.Item>
        <Form.Item
            label="Цена(руб)"
            name="price"
            rules={[{ required: true, message: ''}]}>
            <Input/>
        </Form.Item>
        <Form.Item
            label="Единица измерения"
            name="measurement_unit"
            rules={[{ required: false, message: ''}]}>
            <Select allowClear={true} options={
                Object.values(MeasurementUnit).map(item => {
                    return {
                        value: item,
                        label: item,
                    }
                })
            } />
        </Form.Item>
        <Form.Item
            label="Код маркировки(GTIN)"
            name="code_marking"
            rules={[{ required: false, message: ''}]}>
            <Input/>
        </Form.Item>
        <Form.Item
            label="Код номенклатуры"
            name="code_nomenclature"
            rules={[{ required: false, message: ''}]}>
            <Input/>
        </Form.Item>
        <Form.Item
            label="НДС"
            name="vat"
            rules={[{ required: false, message: ''}]}>
            <Select allowClear={true} options={
                Object.values(Vat).map(item => {
                    return {
                        value: item,
                        label: item,
                    }
                })
            } />
        </Form.Item>
        <Form.Item
            label="Категория"
            name="category_uuid"
            rules={[{ required: false, message: ''}]}>
            <Select allowClear={true} options={
                categoryProducts && categoryProducts?.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                })
            } />
        </Form.Item>
        <Form.Item
            label="Договор поставки"
            name="contract_uuid"
            rules={[{ required: false, message: '' }]}>
            <Input/>
        </Form.Item>
        <Form.Item
            label="Изображение"
            name="image_uuid"
            rules={[{ required: false, message: '' }]}>
            <Input/>
        </Form.Item>
        <Form.Item
            label="Дополнительно"
            name="description"
            rules={[{ required: false, message: '' }]}>
            <Input />
        </Form.Item>

        <div style={{ maxWidth: 770, textAlign: "right"}}>
        <Space wrap>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="button" onClick={()=>handlerDelete(form?.getFieldsValue())}>
                    Удалить
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="button" onClick={handlerFormReset}>
                    Добавить
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Space>
    </div>

    </Form>
    );
}

export interface ProductData {
    id: number | null
    name: string
    type_product: TypeProduct
    price: string
    measurement_unit: MeasurementUnit | null
    code_marking: string | null
    code_nomenclature: string | null
    vat: Vat | null
    category_uuid: string | null
    contract_uuid: string | null
    image_uuid: string | null
    description: string | null
}

export enum Vat {
    NONE='Без НДС',
    VAT_0='НДС 0%',
    VAT_10='НДС 10%',
    VAT_20='НДС 20%',
}
export enum TypeProduct {
    PRODUCT= 'Товар',
    PRODUCT_MARKING= 'Маркированный товар',
    SERVICE= 'Услуга',
}
export enum MeasurementUnit {
    /** штуки */
    PC= 'шт',
    /** Кг */
    KG= 'Kg',
    /** г */
    G= 'g',
    /** Л */
    L= 'л',
    /** мл */
    ML= 'мл',
    /** милиметр */
    mm= 'мм',
    /** сантиметр */
    cm= 'см',
    /** метр */
    m= 'м',
    /** километр */
    km= 'км',

}

export default Product;
