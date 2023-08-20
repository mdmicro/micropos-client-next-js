import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Select} from "antd";


const CahsregisterConfigModal: React.FC<ModalConfigI> = ({visible, config, handlerSet}) => {
    const [formModal] = Form.useForm<PrinterConfig>()
    const [connectionType, setConnectionType] = useState<ConnectionTypes | undefined>(undefined)

    useEffect(() => {
        if(config) {
            setConnectionType(config.connectionType)
            formModal.setFieldsValue(config)
        }
    },[config])

    const serialConfigRender = () => (
        <>
            <Form.Item
                label="COM порт"
                name="name"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Скорость"
                name="speed"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Бит данных"
                name="dataBits"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Чётность"
                name="parity"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Стоп бит"
                name="stopBits"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
        </>
    )

    const ethernetConfigRender = () => (
        <>
            <Form.Item
                label="IP адрес"
                name="ipAddress"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Порт"
                name="port"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
        </>
    )

    const usbConfigRender = () => (
        <>
            <Form.Item
                label="ID производителя"
                name="vendorId"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="ID продукта"
                name="productId"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Интерфейс"
                name="interface"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="EndPoint"
                name="endPoint"
                rules={[{ required: false, message: ''}]}
            >
                <Input />
            </Form.Item>
        </>
    )

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
                name="modalPrinter"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{config}}
                autoComplete="on"
            >
                <Form.Item
                    label="Тип подключения"
                    name="connectionType"
                    rules={[{required: true, message: ''}]}
                >
                    <Select
                        options={[
                            {value: ConnectionTypes.USB, label: 'USB'},
                            {value: ConnectionTypes.SERIAL, label: 'SERIAL(COM)'},
                            {value: ConnectionTypes.ETHERNET, label: 'ETHERNET'},
                        ]}
                        onChange={value => setConnectionType(value)}
                    />
                </Form.Item>
                {connectionType === ConnectionTypes.USB && usbConfigRender()}
                {connectionType === ConnectionTypes.SERIAL && serialConfigRender()}
                {connectionType === ConnectionTypes.ETHERNET && ethernetConfigRender()}
            </Form>
        </Modal>
    );
}

enum ConnectionTypes {
    USB ='usb',
    SERIAL = 'serial',
    ETHERNET = 'ethernet'
}

export interface PrinterConfig {
    connectionType: ConnectionTypes;
    serialConfig?: {
            name: string;
           speed: string;
        dataBits: '6' | '7' | '8';
          parity: 'even' | 'mark' | 'none' | 'odd' | 'space';
        stopBits: '1' | '2';
    }
    usbConfig?: {
         vendorId: string;
        productId: string;
        interface: string;
         endPoint: string;
    }
    ethernetConfig?: {
        ipAddress: string;
             port: string;
    }
}

interface ModalConfigI {
       visible: boolean;
        config: PrinterConfig | undefined;
    handlerSet: (config: PrinterConfig | undefined) => void;
}

export default CahsregisterConfigModal;
