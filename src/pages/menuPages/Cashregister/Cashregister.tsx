import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from 'axios';
import {CompanieData} from "@/pages/menuPages/Companie";
import {SettingOutlined} from "@ant-design/icons";
import CashregisterConfigModal, {CashregisterConfig} from "@/pages/menuPages/Cashregister/CashregisterConfigModal";


const Cashregister: React.FC = () => {
      const [form] = Form.useForm<CashregisterData>()
      const [curCashregisterId, setCurCashregisterId] = useState<number | null>(null)
      const [cashregisters, setCashregisters] = useState<CashregisterData[]>()
      const [companies, setCompanies] = useState<CompanieData[]>()
      const [modalVisible, setModalVisible] = useState<boolean>(false)
      // const [config, setConfig] = useState<CashregisterConfig | undefined>(undefined)

      const onFinish = (values: CashregisterData) => {
            axios.post('api/cashregister',values).then(async res => {
                  console.log('next front cashregister post res')

                  notification.success({message: 'Сохранено', duration: 3})
                  if (!curCashregisterId) {
                        await setCurCashregisterId(res.data.id)
                        form?.setFieldValue("cashregisters", res.data.id)
                  }
                  getCashregisters();
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
            setCurCashregisterId(null)
      }
      const handlerDelete = (values: CashregisterData) => {
            if(!values) {
                  return;
            }
            axios.patch('api/cashregister/',values).then(async res => {
                  handlerFormReset();
                  getCashregisters();
                  notification.success({message: 'Удалено', duration: 3})
            }).catch(e=> {
                  console.log('error:' + e)
                  notification.error({message: 'Ошибка ', description: e, duration: 10})
            })
      }

      const handlerSelect = async (id: number) => {
            await setCurCashregisterId(id)
            console.log("handlerSelect: " + id)
            const curCashregister = cashregisters?.find(item => item.id === id)
            curCashregister && form?.setFieldsValue(curCashregister)
      };

      const getCashregisters = () => {
            axios.get('api/cashregister').then(
                async res => {
                      if(res) {
                            await setCashregisters(res.data)
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
      const getCompanies = () => {
            axios.get('api/companie').then(
                async res => {
                      // console.log("Get companies: " + JSON.stringify(res, null, 1))
                      if(res) {
                            await setCompanies(res.data)
                      } else {
                            notification.error({message: 'Ошибка getCompanies', description: res})
                      }
                }
            ).catch(e=>{
                      console.log(e)
                      notification.error({message: 'Ошибка getCompanies ', description: e.message})
                }
            );
      }

      useEffect(() => {
            getCompanies();
            getCashregisters();
      }, []);

      return (
          <>
                <Form
                    form={form}
                    name="cashregister"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >

                      <Form.Item
                          label="ККТ"
                          name="cashregisters"
                          style={{marginBottom: '40px'}}
                      >
                            <Select allowClear={true} onChange={handlerSelect} options={
                                  cashregisters && cashregisters.map(item => {
                                        return {
                                              value: item.id,
                                              label: item.cashregister_name,
                                        }
                                  })
                            } />
                      </Form.Item>

                      <Form.Item name="id" hidden={true}>
                            <Input />
                      </Form.Item>

                      <Form.Item
                          label="Наименование ККТ"
                          name="cashregister_name"
                          rules={[{ required: true, message: 'Введите наименование ККТ!'}]}
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
                          label="Организация"
                          name="companie_id"
                          style={{marginBottom: '40px'}}
                          rules={[{ required: true, message: 'Ошибка в поле'},]}
                      >
                            <Select allowClear={true} options={
                                  companies && companies?.map(item => {
                                        return {
                                              value: item.id,
                                              label: item.name,
                                        }
                                  })
                            } />
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

                <CashregisterConfigModal
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

export interface CashregisterData {
      id: number | null
      cashregister_name: string
      serial_number: string
      companie_id: number
      description: string
      config: CashregisterConfig | null;
}

export default Cashregister;
