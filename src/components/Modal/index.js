import close from '@/assets/common/close.png';
import { Modal as ModalBox } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

function Modal(props) {
    const { onCancel, width, height, title, children } = props;
    const [visible, setVisible] = useState(false);
    const _onCancel = () => {
        onCancel && onCancel();
    }
    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])
    return (
        <ModalBox
            visible={visible}
            width={width}
            height={height}
            onCancel={_onCancel}
            title={title}
            className={styles.modal}
            closeIcon={
                <img style={{ width: 24 }} src={close} />
            }
            footer={null}
        >
            {children}
        </ModalBox>
    )
}
export default Modal;