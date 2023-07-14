import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from 'axios';

const CategoryProduct: React.FC = () => {
    const [form] = Form.useForm<CategoryProductData>()
    const [curCategoryProductId, setCurCategoryProductId] = useState<number | null>(null)
    const [products, setCategoryProducts] = useState<CategoryProductData[]>([{
        id: null,
        name: '',
        description: '',
    }])

    const onFinish = (values: CategoryProductData) => {
        axios.post('api/categoryProduct',values).then(async res => {
            console.log('next front product post res')
            // console.log(res.status)
            // console.log(res.statusText)
            // console.log(JSON.stringify(res.data, null, 1))
            notification.success({message: 'Сохранено', duration: 3})
            if (!curCategoryProductId) {
                await setCurCategoryProductId(res.data.id)
                form?.setFieldValue("products", res.data.id)
            }
            getCategoryProducts();
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
        setCurCategoryProductId(null)
    }

    const handlerDelete = (values: CategoryProductData) => {
        // console.log('-=handler delete=-')
        // console.log(JSON.stringify(values, null, 1))
        if(!values) {
            return;
        }
        axios.patch('api/categoryProduct/',values).then(async res => {
            handlerFormReset();
            getCategoryProducts();
            notification.success({message: 'Удалено', duration: 3})
        }).catch(e=> {
            console.log('error:' + e)
            notification.error({message: 'Ошибка ', description: e, duration: 10})
        })
    }

    const handlerSelect = async (id: number) => {
        await setCurCategoryProductId(id)
        console.log("handlerSelect: " + id)
        const curCategoryProduct = products.find(item => item.id === id)
        curCategoryProduct && form?.setFieldsValue(curCategoryProduct)
    };

    const getCategoryProducts = () => {
        axios.get('api/categoryProduct').then(
            async res => {
                console.log("Get products: " + JSON.stringify(res, null, 1))
                console.log("getCategoryProducts: " + curCategoryProductId)
                if(res) {
                    await setCategoryProducts(res.data)
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

    useEffect(() => {
            getCategoryProducts();
    }, []);

    return (
    <Form
            form={form}
            name="categoryProduct"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >

        <Form.Item
            label="Категория товара или услуги"
            name="categories"
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
            label="Наименование категории"
            name="name"
            rules={[{ required: true, message: 'Введите наименование!' }]}>
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

export interface CategoryProductData {
    id: number | null
    name: string
    description: string | null
}

export default CategoryProduct;
