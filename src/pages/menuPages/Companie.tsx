import React, {createRef, useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select} from "antd";
import axios from 'axios';

const onFinish = (values: any) => {
    axios.patch('api/companie',values).then(res => {
        console.log('next front companie post res')
        // console.log(res.status)
        // console.log(res.statusText)
        // console.log(res.data)
        notification.success({message: 'Сохранено', duration: 3})
    }).catch(e=> {
        console.log('error:' + e)
        notification.error({message: 'Ошибка ', description: e, duration: 10})
    })
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};


export default function Companie() {
    const [form] = Form.useForm<CompanieData>()
    const [curCompanieId, setCurCompanieId] = useState(0)
    const [companies, setCompanies] = useState<CompanieData[]>([{
        id: 0,
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

    const onSelect = (id: number) => {
        console.log(id)
        setCurCompanieId(id)
        const curCompanie = companies.find(item => item.id === id)
        curCompanie && form?.setFieldsValue(curCompanie)
    };

    useEffect(() => {
        const res = axios.get('api/companie').then(
            res => {
                console.log(res.data)
                if(res) {
                    form?.setFieldsValue(res.data[0])
                    setCurCompanieId(res.data[0].id)
                    setCompanies(res.data)
                }

            }
        ).catch(e=>{
                console.log(e)
                notification.error({message: 'Ошибка ', description: e.message})
        }
        );
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
            name="id"
            hidden={true}
        >
          <Input />
        </Form.Item>
        <Form.Item
            label="Организация(ИП)"
            name="companies"
            style={{marginBottom: '40px'}}
        >
            <Select allowClear={true}  onSelect={onSelect} options={
                companies && companies.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                })
            } />
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
                rules={[{ required: false, message: '' }]}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
}

export interface CompanieData {
    id: number
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
