import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from 'axios';
import {SettingOutlined} from "@ant-design/icons";
import PrinterConfigModal, {PrinterConfig} from "@/pages/menuPages/Devices/Printer/PrinterConfigModal";


const Printer: React.FC = () => {
      const [form] = Form.useForm<PrinterData>()
      const [curPrinterId, setCurPrinterId] = useState<number | null>(null)
      const [printers, setPrinters] = useState<PrinterData[]>()
      const [modalVisible, setModalVisible] = useState<boolean>(false)

      const onFinish = (values: PrinterData) => {
            axios.post('api/printer',values).then(async res => {
                  console.log('next front printer post res')

                  notification.success({message: 'Сохранено', duration: 3})
                  if (!curPrinterId) {
                        await setCurPrinterId(res.data.id)
                        form?.setFieldValue("printers", res.data.id)
                  }
                  getPrinters();
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
            setCurPrinterId(null)
      }
      const handlerDelete = (values: PrinterData) => {
            if(!values) {
                  return;
            }
            axios.patch('api/printer/',values).then(async res => {
                  handlerFormReset();
                  getPrinters();
                  notification.success({message: 'Удалено', duration: 3})
            }).catch(e=> {
                  console.log('error:' + e)
                  notification.error({message: 'Ошибка ', description: e, duration: 10})
            })
      }

      const handlerSelect = async (id: number) => {
            await setCurPrinterId(id)
            console.log("handlerSelect: " + id)
            const curPrinter = printers?.find(item => item.id === id)
            curPrinter && form?.setFieldsValue(curPrinter)
      };

      const getPrinters = () => {
            axios.get('api/printer').then(
                async res => {
                      if(res) {
                            await setPrinters(res.data)
                      } else {
                            notification.error({message: 'Ошибка ', description: res})
                      }
                }
            ).catch(e=>{
                      console.log(e)
                      notification.error({message: 'Ошибка ', description: e.message})
                }
            );
      }

      useEffect(() => {
            getPrinters();
      }, []);

      return (
          <>
                <Form
                    form={form}
                    name="printer"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >

                      <Form.Item
                          label="Принтер"
                          name="printers"
                          style={{marginBottom: '40px'}}
                      >
                            <Select allowClear={true} onChange={handlerSelect} options={
                                  printers && printers.map(item => {
                                        return {
                                              value: item.id,
                                              label: item.printer_name,
                                        }
                                  })
                            } />
                      </Form.Item>

                      <Form.Item name="id" hidden={true}>
                            <Input />
                      </Form.Item>

                      <Form.Item
                          label="Наименование Принтера"
                          name="printer_name"
                          rules={[{ required: true, message: 'Введите наименование принтера!'}]}
                      >
                            <Input/>
                      </Form.Item>
                      <Form.Item
                          label="Серийный номер"
                          name="serial_number"
                          rules={[{ required: false, message: 'Ошибка в поле'},
                          ]}
                      >
                            <Input />
                      </Form.Item>

                      <Form.Item
                          label="Дополнительно"
                          name="description"
                          rules={[{ required: false, message: ''}]}
                      >
                            <Input />
                      </Form.Item>

                      <Form.Item
                          label="Настройки подключения"
                          name="config"
                          hidden
                       />

                      <div style={{ maxWidth: 770, textAlign: "right"}}>
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

                <PrinterConfigModal
                    visible={modalVisible}
                    config={JSON.parse(form?.getFieldValue('config') ?? "{}")}
                    handlerSet={(value) => {
                      value && form?.setFieldValue('config', JSON.stringify(value))
                      setModalVisible(false)
                    }
                } />
          </>
      );
}

export interface PrinterData {
      id: number | null
      printer_name: string
      serial_number: string
      description: string
      config: PrinterConfig | null;
}

export default Printer;
