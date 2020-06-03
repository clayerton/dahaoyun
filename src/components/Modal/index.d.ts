import React from 'react';

export interface IModalProps {
    visible: boolean;
    width?: number;
    height?: number;
    children: any;
    title: string;
    onCancel:  () => void;
}
export default class Modal extends React.Component<IModalProps, any> {}
