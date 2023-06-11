import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from "antd";


const TerminalModalConfig: React.FC<ModalConfigI> = ({visible, config, handlerSet}) => {
    const [formModal] = Form.useForm<TerminalConfig>()

    useEffect(()=>{
        config && formModal.setFieldsValue(JSON.parse(config) as TerminalConfig)
    },[config])

    return (
        <Modal
            visible={visible}
            onCancel={() => handlerSet(undefined)}
            onOk={() => handlerSet(formModal.getFieldsValue())}
            okText={"Сохранить"}
            cancelText={"Отменить"}
            width={'800px'}
            closable={false}
        >
            <Form
                form={formModal}
                name="modalTerminal"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{config}}
                autoComplete="on"
            >
                <Form.Item
                    label="Интегрируемое ПО терминала"
                    name="softType"
                    rules={[{required: false, message: ''}]}
                >
                    <Select
                        options={[
                            {value: 'sber', label: 'Сбербанк'},
                            {value: 'arcus2', label: 'Arcus2'},
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Путь установки ПО терминала"
                    name="softPath"
                    rules={[{required: false, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Шаблон RRN"
                    name="parseRRNTemplate"
                    rules={[{required: false, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Отдел"
                    name="department"
                    rules={[{required: false, message: ''}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="ID терминала"
                    name="merchantId"
                    rules={[{required: false, message: ''}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}


export interface TerminalConfig {
    softType: 'sber' | 'arcus';
    softPath: string;
    parseRRNTemplate: string;
    department: string;
    merchantId?: string;
}

interface ModalConfigI {
    visible: boolean;
    config: string | undefined;
    handlerSet: (config: TerminalConfig | undefined) => void;
}

export default TerminalModalConfig;
