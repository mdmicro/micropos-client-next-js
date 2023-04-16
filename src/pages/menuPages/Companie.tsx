import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from 'axios';

const Companie: React.FC = () => {
    const [form] = Form.useForm<CompanieData>()
    const [curCompanieId, setCurCompanieId] = useState<number | null>(null)
    const [companies, setCompanies] = useState<CompanieData[]>([{
        id: null,
        name: '',
        fullName: '',
        inn: '',
        kpp: '',
        ogrn: '',
        cashier: '',
        address: '',
        addressUr: '',
        vatType: '',
        description: '',
    }])

    const onFinish = (values: any) => {
        axios.post('api/companie',values).then(async res => {
            console.log('next front companie post res')
            // console.log(res.status)
            // console.log(res.statusText)
            // console.log(JSON.stringify(res.data, null, 1))
            notification.success({message: 'Сохранено', duration: 3})
            if (!curCompanieId) {
                await setCurCompanieId(res.data.id)
                form?.setFieldValue("companies", res.data.id)
            }

            getCompanies();
        }).catch(e=> {
            console.log('error:' + e)
            notification.error({message: 'Ошибка ', description: e, duration: 10})
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handlerAdd = () => {
        form?.resetFields();
        setCurCompanieId(null)
    }

    const handlerDelete = () => {

    }

    const handlerSelect = async (id: number) => {
        await setCurCompanieId(id)
        console.log("handlerSelect: " + id)
        const curCompanie = companies.find(item => item.id === id)
        curCompanie && form?.setFieldsValue(curCompanie)
    };

    const getCompanies = () => {
        axios.get('api/companie').then(
            async res => {
                // console.log("Get companies: " + JSON.stringify(res.data, null, 1))
                console.log("getCompanies: " + curCompanieId)
                if(res) {
                    await setCompanies(res.data)
                }
            }
        ).catch(e=>{
                console.log(e)
                notification.error({message: 'Ошибка ', description: e.message})
            }
        );
    }

    useEffect(() => {
            getCompanies();
    }, []);

    return (
    <Form
            form={form}
            name="companie"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >

        <Form.Item
            label="Организация(ИП)"
            name="companies"
            style={{marginBottom: '40px'}}
        >
             <Select allowClear={true} onChange={handlerSelect} options={
                companies && companies.map(item => {
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
                label="Наименование организации(ИП)"
                name="name"
                rules={[{ required: true, message: 'Введите наименование организации!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="ИНН"
                name="inn"
                rules={[{ required: false, message: 'Ошибка в поле ИНН' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="КПП"
                name="kpp"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="ОГРН"
                name="ogrn"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Директор"
                name="cashier"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Адрес"
                name="address"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Адрес юридический"
                name="addresUr"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Система налогообложения"
                name="vatType"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Дополнительно"
                name="description"
                rules={[{ required: false, message: '' }]}
            >
                <Input />
            </Form.Item>

        <div style={{ maxWidth: 770, textAlign: "right"}}>
        <Space wrap>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="button" onClick={handlerDelete}>
                    Удалить
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="button" onClick={handlerAdd}>
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

export interface CompanieData {
    id: number | null
    name: string
    fullName: string
    inn: string
    kpp: string
    ogrn: string
    cashier: string
    address: string
    addressUr: string
    vatType: string
    description: string
}

export default Companie;
