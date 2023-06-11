import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from 'axios';
import {CompanieData} from "@/pages/menuPages/Companie";
import {SettingOutlined} from "@ant-design/icons";
import TerminalModalConfig, {TerminalConfig} from "@/pages/menuPages/Terminal/TerminalConfigModal";


const Terminal: React.FC = () => {
    const [form] = Form.useForm<TerminalData>()
    const [curTerminalId, setCurTerminalId] = useState<number | null>(null)
    const [terminals, setTerminals] = useState<TerminalData[]>()
    const [companies, setCompanies] = useState<CompanieData[]>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const onFinish = (values: TerminalData) => {
        axios.post('api/terminal', values).then(async res => {
            console.log('next front terminal post res')

            notification.success({message: 'Сохранено', duration: 3})
            if (!curTerminalId) {
                await setCurTerminalId(res.data.id)
                form?.setFieldValue("terminals", res.data.id)
            }
            getTerminals();
        }).catch(e => {
            console.log('error:' + e)
            notification.error({message: 'Ошибка ', description: e, duration: 10})
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handlerFormReset = () => {
        form?.resetFields();
        setCurTerminalId(null)
    }
    const handlerDelete = (values: TerminalData) => {
        if (!values) {
            return;
        }
        axios.patch('api/terminal/', values).then(async res => {
            handlerFormReset();
            getTerminals();
            notification.success({message: 'Удалено', duration: 3})
        }).catch(e => {
            console.log('error:' + e)
            notification.error({message: 'Ошибка ', description: e, duration: 10})
        })
    }

    const handlerSelect = async (id: number) => {
        await setCurTerminalId(id)
        console.log("handlerSelect: " + id)
        const curTerminal = terminals?.find(item => item.id === id)
        curTerminal && form?.setFieldsValue(curTerminal)
    };

    const getTerminals = () => {
        axios.get('api/terminal').then(
            async res => {
                if (res) {
                    await setTerminals(res.data)
                } else {
                    notification.error({message: 'Ошибка ', description: res})
                }
            }
        ).catch(e => {
                console.log(e)
                notification.error({message: 'Ошибка ', description: e.message})
            }
        );
    }
    const getCompanies = () => {
        axios.get('api/companie').then(
            async res => {
                if (res) {
                    await setCompanies(res.data)
                } else {
                    notification.error({message: 'Ошибка getCompanies', description: res})
                }
            }
        ).catch(e => {
                console.log(e)
                notification.error({message: 'Ошибка getCompanies ', description: e.message})
            }
        );
    }

    useEffect(() => {
        getCompanies();
        getTerminals();
    }, [])

    return (
        <>
        <Form
            form={form}
            name="terminal"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 800}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >

            <Form.Item
                label="Терминал"
                name="terminals"
                style={{marginBottom: '40px'}}
            >
                <Select allowClear={true} onChange={handlerSelect} options={
                    terminals && terminals.map(item => {
                        return {
                            value: item.id,
                            label: item.terminal_name,
                        }
                    })
                }/>
            </Form.Item>

            <Form.Item name="id" hidden={true}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Наименование банковского терминала"
                name="terminal_name"
                rules={[{required: true, message: 'Введите наименование терминала!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Серийный номер"
                name="serial_number"
                rules={[{required: false, message: 'Ошибка в поле'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Организация"
                name="companie_id"
                style={{marginBottom: '40px'}}
                rules={[{required: true, message: 'Ошибка в поле'},]}
            >
                <Select allowClear={true} options={
                    companies && companies?.map(item => {
                        return {
                            value: item.id,
                            label: item.name,
                        }
                    })
                }/>
            </Form.Item>

            <Form.Item
                label="Дополнительно"
                name="description"
                rules={[{required: false, message: ''}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Настройки подключения"
                name="config"
                hidden
            >
            </Form.Item>

            <div style={{maxWidth: 770, textAlign: "right"}}>
                <Space wrap>
                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button
                            type="text"
                            htmlType="button"
                            onClick={() => setModalVisible(true)}
                            icon={<SettingOutlined/>}
                        >
                            Настройка
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button htmlType="button" onClick={() => handlerDelete(form?.getFieldsValue())}>
                            Удалить
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button htmlType="button" onClick={handlerFormReset}>
                            Добавить
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Space>
            </div>
        </Form>

        <TerminalModalConfig visible={modalVisible} config={form?.getFieldValue('config')} handlerSet={(value)=> {
            value && form.setFieldValue('config', JSON.stringify(value))
            setModalVisible(false)
        }} />
        </>
    );
}


export interface TerminalData {
    id: number | null
    terminal_name: string
    serial_number: string
    companie_id: number
    description: string
    config: TerminalConfig;
}

export default Terminal;
