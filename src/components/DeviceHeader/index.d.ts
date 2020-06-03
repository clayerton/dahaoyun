import React from 'react';

export interface DeviceHeaderProps {
    onHandleClick?: ()=>void;
    onChangeSelect: ()=>{};
    department: any[];
}
export default class DeviceHeader extends React.PureComponent<DeviceHeaderProps, any> {}