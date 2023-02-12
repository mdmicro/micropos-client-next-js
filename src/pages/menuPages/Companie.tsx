import React, {createRef, useEffect} from 'react';
import {Button, Form, Input} from "antd";
import axios from 'axios';

const onFinish = (values: any) => {
    axios.post('api/companie',values).then(res => console.log(res.data)).catch(e=>console.log(e))
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

export default function Companie() {
    const [form] = Form.useForm<{name: string, inn: string, kpp: string}>()

    useEffect(() => {
        const res = axios.get('api/companie').then(
            res => {
                console.log(res.data)
                form?.setFieldsValue(res.data)
            }
        ).catch(e=>console.log(e));
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
                label="Наименование организации(ИП)"
                name="name"
                rules={[{ required: true, message: 'Введите наименование организации!' }]}
            >
                <Input />
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
                name="direktor"
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
