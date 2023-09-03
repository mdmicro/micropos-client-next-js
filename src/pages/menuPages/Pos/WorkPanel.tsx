import React, {FC} from 'react';
import {Button, Space, theme} from "antd";


 const WorkPanel: FC = () => {
     const {token: { colorBgContainer }} = theme.useToken();

     const ButtonWorkPanelCSS: React.CSSProperties = {
         width: '150px',
         height: '45px',
         marginBottom: '0px'
     }
     const ButtonWorkPanel = () => {
         return (
             <Space direction='vertical' style={{marginRight: '10px'}}>
                 <Space>
                     <Button type={'primary'} style={ButtonWorkPanelCSS}>Наличными</Button>
                 </Space>
                 <Space>
                     <Button style={ButtonWorkPanelCSS}>Безналичный</Button>
                 </Space>
             </Space>
         )
     }

     return (
          <div style={{ padding: 0, background: colorBgContainer }}>
              {/*<div><Recycled /></div>*/}
              <ButtonWorkPanel />
          </div>
      );
}


export default WorkPanel;
